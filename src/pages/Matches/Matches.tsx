import React, { useEffect, useState } from "react";
import Match from "../../components/Match/Match";
import { UserModel, UserObject } from "../../models/user.model";
import NavBar from "../../components/NavBar/NavBar";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    Grid,
    makeStyles,
    Theme,
    Typography,
    createStyles,
} from "@material-ui/core";
import { rajah, jordyBlue, white } from "theme";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import { firestore } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { DialogContentText } from "@material-ui/core";
import { getBiaUser } from "utils/localstorage";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: jordyBlue,
            boxSizing: "border-box",
            height: "100vh",
            paddingBottom: "4.5em",
        },
        title: { color: white, padding: theme.spacing(3, 3, 0, 3) },
        button: { backgroundColor: rajah, color: white, margin: "0 0 1em 0" },
    })
);

const Matches: React.FC = () => {
    const classes = useStyles();
    const biaUser = getBiaUser();
    const [users, setUsers] = useState<UserModel[]>();
    const [isMatchDialogOpen, setIsMatchDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [updatedUser, setUpdatedUser] = useState(biaUser);
    const [currentMatchId, setCurrentMatchId] = useState<string>();

    const reFetchMyUser = (user: UserModel) => {
        firestore
            .collection("Users")
            .doc(user.uid)
            .onSnapshot({ includeMetadataChanges: true }, (doc) => {
                doc.data() && setUpdatedUser(doc.data() as UserModel);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        biaUser && reFetchMyUser(biaUser);
    }, [isLoading]);

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

    useEffect(() => {
        users &&
            updatedUser &&
            setLocalAvailableUsers(
                users.filter((theirUser: UserModel) =>
                    validatePotentialMatch(updatedUser, theirUser)
                )
            );
    }, [users, updatedUser]);

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
        updatedUser && users
            ? users.filter((theirUser: UserModel) =>
                  validatePotentialMatch(updatedUser, theirUser)
              )
            : [];

    const [localAvailableUsers, setLocalAvailableUsers] = useState(
        availableUsers
    );
    const history = useHistory();
    const [localJudgedUsers, setLocalJudgedUsers] = useState<UserObject[]>([]);

    const updateJudgedUsers = (
        myUserId: string,
        theirUserId: string,
        isLiked: boolean
    ) => {
        if (updatedUser) {
            firestore
                .collection("Users")
                .doc(myUserId)
                .set(
                    {
                        ...updatedUser,
                        users: {
                            ...updatedUser.users,
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
                (updatedUser) => updatedUser.uid !== theirUser.uid
            )
        );
        updatedUser && updateJudgedUsers(updatedUser.uid, theirUser.uid, false);
    };

    const likeUser = (theirUser: UserModel, myUser: UserModel) => {
        setLocalAvailableUsers(
            localAvailableUsers.filter((user) => user.uid !== theirUser.uid)
        );
        myUser && updateJudgedUsers(myUser.uid, theirUser.uid, true);
        if (checkForMatch(theirUser, myUser)) {
            createMatch(theirUser, myUser);
        }
    };

    const checkForMatch = (theirUser: UserModel, myUser: UserModel) =>
        theirUser.users && theirUser.users[myUser.uid] === true;

    const createMatch = (theirUser: UserModel, myUser: UserModel) => {
        const matchId = uuidv4();
        setCurrentMatchId(matchId);
        firestore
            .collection("Matches")
            .doc(matchId)
            .set({
                matchId,
                messages: [],
                timestamp: new Date().toLocaleDateString(),
                userIds: [theirUser.uid, myUser.uid],
                userDetails: [theirUser, myUser],
            })
            .then(() => setIsMatchDialogOpen(true))
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    };

    return updatedUser && localAvailableUsers.length > 0 ? (
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
                    onClick={() =>
                        likeUser(localAvailableUsers[0], updatedUser)
                    }
                >
                    <CheckRoundedIcon />
                </Fab>
            </Grid>
            <Dialog
                open={isMatchDialogOpen}
                keepMounted
                onClose={() => setIsMatchDialogOpen(false)}
            >
                <DialogTitle id="alert-dialog-slide-title">
                    You matched!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>Send them a message?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setIsMatchDialogOpen(false)}
                        color="primary"
                    >
                        No, keep swiping!
                    </Button>
                    <Button
                        onClick={() => {
                            history.push(`/chat/${currentMatchId}`);
                            setIsMatchDialogOpen(false);
                        }}
                        color="primary"
                    >
                        Let's go!
                    </Button>
                </DialogActions>
            </Dialog>
            <NavBar />
        </div>
    ) : (
        <div className={classes.root}>
            <Typography variant="h1" className={classes.title}>
                Swipe
            </Typography>
            <Typography variant="body1" className={classes.title}>
                There aren't any more users to match with at the moment. Please
                come back later!
            </Typography>

            <NavBar />
        </div>
    );
};

export default Matches;
