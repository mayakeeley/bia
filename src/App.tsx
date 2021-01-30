import React from "react";
import Welcome from "./welcome";
import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: "pink",
    },
  })
);

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Welcome />
    </div>
  );
};

export default App;
