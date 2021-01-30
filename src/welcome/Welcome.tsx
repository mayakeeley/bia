import React from "react";
import {
  makeStyles,
  createStyles,
  Typography,
  Button,
} from "@material-ui/core";
import image from "../assets/welcome-screen.png";
import { noop } from "../appUtils";

const useStyles = makeStyles(() =>
  createStyles({
    welcome: {
      backgroundColor: "pink",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: "80%",
    },
  })
);

const Welcome = () => {
  const classes = useStyles();
  return (
    <div className={classes.welcome}>
      <Typography variant="h1">Welcome</Typography>
      <img className={classes.image} src={image} alt="welcome screen" />
      <Typography paragraph>Are you ready to start your own race?</Typography>
      <Button onClick={noop} variant="contained">
        Let's go
      </Button>
    </div>
  );
};

export default Welcome;
