import React, { useEffect, useState } from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  TextField,
  Grid,
} from "@material-ui/core";
import { RelayUser } from "types";
import { grey } from "theme";
import HelpIcon from "@material-ui/icons/Help";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleAndInfo: { padding: theme.spacing(2, 0) },
    helpIcon: { fontSize: "2em" },
    infoText: {
      color: grey,
    },
    inputs: {
      marginTop: theme.spacing(4),
    },
    input: { borderRadius: "1.25em", width: "100%" },
  })
);

const Goals: React.FC<{
  values: RelayUser;
  setValues: (values: RelayUser) => void;
}> = ({ values, setValues }) => {
  const classes = useStyles();

  const [goals, setGoals] = useState({
    goal1: values.goals[0] || "",
    goal2: values.goals[1] || "",
    goal3: values.goals[2] || "",
  });

  useEffect(() => {
    const newGoals = Object.values(goals);
    setValues({ ...values, goals: newGoals });
  }, [goals]);

  return (
    <>
      <div className={classes.titleAndInfo}>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <Typography variant="h4">Goals</Typography>
          </Grid>
          <Grid item>
            <HelpIcon className={classes.helpIcon} />
          </Grid>
        </Grid>
        <Typography variant="subtitle2" className={classes.infoText}>
          Write down your top
          <br /> three goals
        </Typography>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <Typography variant="subtitle2" className={classes.infoText}>
              Tap
            </Typography>
          </Grid>
          <Grid item>
            <HelpIcon className={classes.helpIcon} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" className={classes.infoText}>
              for suggestions
            </Typography>
          </Grid>
        </Grid>
      </div>
      <Grid container className={classes.inputs}>
        <Grid item xs={12}>
          <TextField
            id="goal1"
            name="Goal 1"
            inputProps={{
              "data-testid": `create-profile-goal-1`,
            }}
            variant={"outlined"}
            size="small"
            onChange={(e) => setGoals({ ...goals, goal1: e.target.value })}
            value={goals.goal1}
            className={classes.input}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="goal2"
            name="Goal 2"
            inputProps={{
              "data-testid": `create-profile-goal-2`,
            }}
            variant={"outlined"}
            size="small"
            onChange={(e) => setGoals({ ...goals, goal2: e.target.value })}
            value={goals.goal2}
            className={classes.input}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="goal3"
            name="Goal 3"
            inputProps={{
              "data-testid": `create-profile-goal-3`,
            }}
            variant={"outlined"}
            size="small"
            onChange={(e) => setGoals({ ...goals, goal3: e.target.value })}
            value={goals.goal3}
            className={classes.input}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Goals;
