import React, { useEffect, useState } from "react";
import Match from "../../components/Match/Match";
import { UserModel, UserObject } from "../../models/user.model";
import NavBar from "../../components/NavBar/NavBar";
import {
    createStyles,
    Fab,
    Grid,
    makeStyles,
    Theme,
    Typography,
} from "@material-ui/core";
import { rajah, jordyBlue, white } from "theme";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import { firestore } from "../../firebase";
import { getBiaUser } from "utils/localstorage";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: jordyBlue,
            boxSizing: "border-box",
            height: "100vh",
            paddingBottom: "4.5em",
        },
        title: { color: white, padding: theme.spacing(3, 0, 0, 3) },
        button: { backgroundColor: rajah, color: white, margin: "0 0 1em 0" },
    })
);

const Matches: React.FC = () => {
    const classes = useStyles();
    const biaUser = getBiaUser();
    const [users, setUsers] = useState<UserModel[]>();

    const fetchUsers = () => {
        firestore
            .collection("Users")
            .get()
            .then((querySnapshot) => {
                const docUsers = querySnapshot.docs.map((doc) => doc.data());
                setUsers(docUsers as UserModel[]);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // useEffect(() => {
    //     users &&
    //         biaUser &&
    //         setLocalAvailableUsers(
    //             users.filter((theirUser: UserModel) =>
    //                 validatePotentialMatch(biaUser, theirUser)
    //             )
    //         );
    // }, [users, biaUser]);

    const validatePotentialMatch = (
        myUser: UserModel,
        theirUser: UserModel
    ) => {
        const isNotMyUser = myUser.uid !== theirUser.uid;

        if (myUser.users) {
            const myJudgedUsers = Object.keys(myUser.users || {});
            const isNotYetJudged = !myJudgedUsers.includes(theirUser.uid);
            return isNotYetJudged && isNotMyUser;
        }

        return isNotMyUser;
    };

    const availableUsers =
        biaUser && users
            ? users.filter((theirUser: UserModel) =>
                  validatePotentialMatch(biaUser, theirUser)
              )
            : [];

    const [localAvailableUsers, setLocalAvailableUsers] = useState(
        availableUsers
    );

    const [localJudgedUsers, setLocalJudgedUsers] = useState<UserObject[]>([]);

    const updateJudgedUsers = (
        myUserId: string,
        theirUserId: string,
        isLiked: boolean
    ) => {
        if (biaUser) {
            firestore
                .collection("Users")
                .doc(myUserId)
                .set(
                    {
                        ...biaUser,
                        users: {
                            ...biaUser.users,
                            ...localJudgedUsers,
                            [theirUserId]: isLiked,
                        },
                    },
                    { merge: true }
                )
                .then(() =>
                    setLocalJudgedUsers({
                        ...localJudgedUsers,
                        [theirUserId]: isLiked,
                    })
                )
                .catch((error) => console.log(error));
        }
    };

    const dislikeUser = (theirUser: UserModel) => {
        setLocalAvailableUsers(
            localAvailableUsers.filter(
                (biaUser) => biaUser.uid !== theirUser.uid
            )
        );
        biaUser && updateJudgedUsers(biaUser.uid, theirUser.uid, false);
    };

    const likeUser = (theirUser: UserModel) => {
        setLocalAvailableUsers(
            localAvailableUsers.filter(
                (biaUser) => biaUser.uid !== theirUser.uid
            )
        );
        biaUser && updateJudgedUsers(biaUser.uid, theirUser.uid, true);
    };

    return biaUser && localAvailableUsers.length > 0 ? (
        <div className={classes.root}>
            <Typography variant="h1" className={classes.title}>
                Swipe
            </Typography>
            {localAvailableUsers.length > 0 && (
                <Match user={localAvailableUsers[0]} />
            )}
            <Grid container justify="space-around">
                <Fab
                    className={classes.button}
                    onClick={() => dislikeUser(localAvailableUsers[0])}
                >
                    <ClearRoundedIcon />
                </Fab>
                <Fab
                    className={classes.button}
                    onClick={() => likeUser(localAvailableUsers[0])}
                >
                    <CheckRoundedIcon />
                </Fab>
            </Grid>
            <NavBar />
        </div>
    ) : (
        <div className={classes.root}>
            <Typography variant="body1" className={classes.title}>
                No matches available I'm afraid. Please come back later!
            </Typography>

            <NavBar />
        </div>
    );
};

export default Matches;
