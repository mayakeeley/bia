import React from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Button,
} from "@material-ui/core";
import Login from "../components/Login";

import image from "../assets/welcome-screen.png";
import { noop } from "../appUtils";
import { lavenderBlush } from "theme";

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

const Welcome: React.FC<{ signIn: () => void; user: any }> = ({
  signIn,
  user,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.welcome}>
      <Typography variant="h1">Welcome</Typography>
      <img className={classes.image} src={image} alt="welcome screen" />
      <Typography variant="body1" className={classes.welcomeBody}>
        Are you ready to start your own race?
      </Typography>
      <Button onClick={noop} variant="contained">
        Let's go
      </Button>
      <Login signIn={signIn} user={user} />
    </div>
  );
};

export default Welcome;
