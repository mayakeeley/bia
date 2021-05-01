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
import { useBiaUserContext } from "AppContext";

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
}> = ({ setUser }) => {
  const classes = useStyles();
  const history = useHistory();
  const { setBiaUser } = useBiaUserContext();

  const getUser = (user: firebase.User) => {
    firestore
      .collection("Users")
      .where("googleuid", "==", user.uid)
      .get()
      .then((querySnapshot) => {
        const matchingUsers = [] as any[];
        querySnapshot.forEach((doc) => {
          console.log(doc.id);
          matchingUsers.push({ ...doc.data(), docId: doc.id });
        });
        setBiaUser(matchingUsers[0]);
        matchingUsers.length > 0
          ? history.push("/matches")
          : history.push("/createProfile");
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
        result.user && getUser(result.user);
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
