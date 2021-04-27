import React, { useEffect, useState } from "react";
import Match from "../../components/Match/Match";
import { UserModel, UserObject } from "../../models/user.model";
import NavBar from "../../components/NavBar/NavBar";
import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Grid,
  makeStyles,
  Slide,
  Theme,
  Typography,
} from "@material-ui/core";
import { rajah, jordyBlue, white } from "theme";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import { useBiaUserContext } from "AppContext";
import { firestore } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { DialogContentText } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";

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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Matches: React.FC = () => {
  const classes = useStyles();
  const { biaUser } = useBiaUserContext();
  const [users, setUsers] = useState<UserModel[]>();
  const [isMatchDialogOpen, setIsMatchDialogOpen] = useState(false);

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
      biaUser &&
      setLocalAvailableUsers(
        users.filter((theirUser: UserModel) =>
          validatePotentialMatch(biaUser, theirUser)
        )
      );
  }, [users, biaUser]);

  const validatePotentialMatch = (myUser: UserModel, theirUser: UserModel) => {
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
          setLocalJudgedUsers({ ...localJudgedUsers, [theirUserId]: isLiked })
        )
        .catch((error) => console.log(error));
    }
  };

  const dislikeUser = (theirUser: UserModel) => {
    setLocalAvailableUsers(
      localAvailableUsers.filter((biaUser) => biaUser.uid !== theirUser.uid)
    );
    biaUser && updateJudgedUsers(biaUser.uid, theirUser.uid, false);
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
    firestore
      .collection("Matches")
      .doc(matchId)
      .set({
        matchId,
        messages: [],
        timestamp: new Date(),
        userIds: [theirUser.uid, myUser.uid],
        userDetails: [theirUser, myUser],
      })
      .then(() => setIsMatchDialogOpen(true))
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
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
          onClick={() => likeUser(localAvailableUsers[0], biaUser)}
        >
          <CheckRoundedIcon />
        </Fab>
      </Grid>
      <Dialog
        open={isMatchDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setIsMatchDialogOpen(false)}
      >
        <DialogTitle id="alert-dialog-slide-title">You matched!</DialogTitle>
        <DialogContent>
          <DialogContentText>Send them a message?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsMatchDialogOpen(false)} color="primary">
            No, keep swiping!
          </Button>
          <Button onClick={() => setIsMatchDialogOpen(false)} color="primary">
            Let's go!
          </Button>
        </DialogActions>
      </Dialog>
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
