import React from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Button,
} from "@material-ui/core";
import image from "../../assets/images/welcome-screen.png";
import { lavenderBlush } from "theme";
import firebase, { firestore, provider } from "../../firebase";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    welcome: {
      backgroundColor: lavenderBlush,
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    welcomeBody: {
      margin: theme.spacing(2),
    },
    image: {
      width: "80%",
    },
  })
);

const Welcome: React.FC<{
  setUser: (user: firebase.User | undefined) => void;
  user: firebase.User | undefined;
}> = ({ setUser, user }) => {
  const classes = useStyles();
  const history = useHistory();

  const getIsValidUser = (user: firebase.User) => {
    var isValid = false;
    firestore
      .collection("Users")
      .get()
      .then((querySnapshot) => {
        const users = querySnapshot.docs.map((doc) => doc.data().googleuid);

        isValid = user && users && users.includes(user.uid);

        isValid ? history.push("/matches") : history.push("/createProfile");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signIn = async () => {
    await firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        result.user && setUser(result.user);

        result.user && getIsValidUser(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signOut = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(undefined);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={classes.welcome} data-testid="welcome-page">
      <Typography variant="h1" data-testid="welcome-title">
        Welcome
      </Typography>
      <img
        className={classes.image}
        src={image}
        alt="welcome screen"
        data-testid="welcome-img"
      />
      <Typography
        variant="body1"
        className={classes.welcomeBody}
        data-testid="welcome-body"
      >
        Are you ready to start your own race?
      </Typography>
      <Button onClick={signIn} variant="contained" data-testid="login-button">
        Let's go
      </Button>
    </div>
  );
};

export default Welcome;
