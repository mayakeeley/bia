import React, { useState } from "react";
import Match from "../../components/Match/Match";
import { UserModel } from "../../models/user.model";
import mockData from "../../assets/mockData/MockData";
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
import { useBiaUserContext } from "AppContext";

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
  const users = mockData.users;
  const { biaUser } = useBiaUserContext();

  const validatePotentialMatch = (myUser: UserModel, theirUser: UserModel) => {
    const myJudgedUsers = Object.keys(myUser.users || {});

    const isNotYetJudged = myJudgedUsers.includes(theirUser.uid);
    const isNotMyUser = myUser.uid !== theirUser.uid;

    return isNotYetJudged && isNotMyUser;
  };

  const availableUsers = users.filter(
    (theirUser: UserModel) =>
      biaUser && validatePotentialMatch(biaUser, theirUser)
  );
  // const availableUsers = users.filter(
  //   (x: UserModel) =>
  //     biaUser && !biaUser.users?.hasOwnProperty(x.uid) && x.uid !== biaUser.uid
  // );

  const [localAvailableUsers, setLocalAvailableUsers] = useState(
    availableUsers
  );
  console.log(biaUser);

  //   const updateJudgedUsers = (myUserId: string, theirUserId: string)=> {

  // firestore.collection("Users").doc(doc.id).update({foo: "bar"});
  //   }

  // const getIsValidUser = (biaUser: firebase.User) => {
  //   var isValid = false;
  //   firestore
  //     .collection("Users")
  //     .get()
  //     .then((querySnapshot) => {
  //       const users = querySnapshot.docs.map((doc) => doc.data().googleuid);

  //       isValid = biaUser && users && users.includes(biaUser.uid);

  //       isValid ? history.push("/matches") : history.push("/createProfile");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const dislikeUser = (theirUser: UserModel) => {
    setLocalAvailableUsers(
      localAvailableUsers.filter((biaUser) => biaUser.uid !== theirUser.uid)
    );
  };

  const likeUser = (theirUser: UserModel) => {
    setLocalAvailableUsers(
      localAvailableUsers.filter((biaUser) => biaUser.uid !== theirUser.uid)
    );
  };

  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Swipe
      </Typography>
      <Match user={localAvailableUsers[0]} />
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
  );
};

export default Matches;
