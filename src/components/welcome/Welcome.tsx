import React, { useState, FC } from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Button,
} from "@material-ui/core";
import image from "../../assets/welcome-screen.png";
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

const Welcome: FC<{ signIn: () => void }> = ({ signIn }) => {
  const classes = useStyles();
  const [shouldRender, setShouldRender] = useState(false);

  const renderHi = () => {
    return shouldRender && <p>Hi Mitch, you bitch</p>;
  };
  return (
    <div className={classes.welcome} data-testid="welcome-page">
      <Typography variant="h1" data-testid="welcome-title">
        Welcome
      </Typography>
      <Button
        onClick={() => setShouldRender(!shouldRender)}
        variant="contained"
        data-testid="login-button"
      >
        Hi Mitch
      </Button>
      {renderHi()}
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
