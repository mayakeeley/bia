import React, { useState } from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Button,
} from "@material-ui/core";
import image from "../../assets/welcome-screen.png";
import { lavenderBlush } from "theme";
import firebase, { provider } from "../../firebase";
import {
  HashRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
} from "react-router-dom";

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

const Welcome: React.FC = () => {
  const [user, setUser] = useState<firebase.User | undefined>();
  const classes = useStyles();

  const history = useHistory();

  const signIn = async () => {
    await firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        result.user && setUser(result.user);
        history.push("/matches");
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
