import React, { useState } from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Fab,
  Chip,
  Grid,
  Card,
} from "@material-ui/core";
import { RelayUser, ActivityOutput } from "types";
import {
  lavenderBlush,
  grey,
  jordyBlue,
  white,
  mauvelous,
  black,
  azalea,
} from "theme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: { fontSize: "16px" },
    level: {
      backgroundColor: white,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: black,
      margin: theme.spacing(1),
      padding: theme.spacing(1),
    },
    selectedLevel: {
      backgroundColor: azalea,
    },
    cardTitle: { textAlign: "center", color: white },
    levelDetails: { textAlign: "right" },
    levelTitle: { fontWeight: 800 },
    selectedCard: { padding: theme.spacing(2), color: white },
    activity: { display: "flex", flexDirection: "column" },
    activitiesLine1: {},
    activitiesLine2: {
      marginLeft: theme.spacing(8),
      position: "relative",
      top: theme.spacing(-4),
    },

    infoText: {
      color: grey,
    },
    inputs: {
      marginTop: theme.spacing(4),
    },
    input: { borderRadius: "20px", width: "100%" },
    icon: { color: jordyBlue },
    fabInfo: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      "&>svg": {
        fontSize: "24px",
      },
    },
    fab: {
      margin: theme.spacing(2),
      height: "88px",
      width: "88px",
      backgroundColor: mauvelous,
    },
    fabText: {
      fontSize: "16px",
      color: white,
    },
    fabSelected: {
      backgroundColor: mauvelous,
    },
    titleAndInfo: { padding: theme.spacing(2, 0) },

    autocomplete: {
      "&>div>div": {
        top: "calc(50% - 20px)",
      },
    },
  })
);

const Level: React.FC<{
  values: RelayUser;
  setValues: (values: RelayUser) => void;
  activities: ActivityOutput[];
}> = ({ values, setValues, activities }) => {
  const classes = useStyles();
  const [selectedActivity, setSelectedActivity] = useState(
    values.activities[0]
  );
  const getActivityLevels = (activity: string) => {
    const levels =
      activities.find((x) => x.activityName === activity)?.levels || [];
    const sortedLevels = levels.sort((a, b) => (a.level > b.level ? 1 : -1));
    return sortedLevels;
  };
  getActivityLevels(selectedActivity.activityName);

  const updateLevel = (level) => {
    const selectedActivityIndex = values.activities.findIndex(
      (x) => x.activityName === selectedActivity.activityName
    );
    values.activities[selectedActivityIndex].level = level;
    setSelectedActivity({ ...selectedActivity, level });
    setValues(values);
  };
  return (
    <>
      <div className={classes.titleAndInfo}>
        <Typography variant="h4" gutterBottom>
          Level
        </Typography>
        <Typography variant="subtitle2" className={classes.infoText}>
          Select your level for
          <br /> each activity
        </Typography>
      </div>
      <Grid container justify="space-evenly">
        {values.activities.map((activity) => (
          <Grid item className={classes.activity}>
            <Fab
              className={classes.fab}
              onClick={() => setSelectedActivity(activity)}
            >
              <Typography paragraph className={classes.fabText}>
                {activity.activityName}
              </Typography>
            </Fab>
            <Chip
              className={classes.chip}
              color="secondary"
              variant={
                activity.activityName === selectedActivity.activityName
                  ? "default"
                  : "outlined"
              }
              label={`Level ${activity.level}`}
            />
          </Grid>
        ))}
      </Grid>
      <Card className={classes.selectedCard}>
        <Typography variant="h4" className={classes.cardTitle}>
          {selectedActivity.activityName}
        </Typography>
        {getActivityLevels(selectedActivity.activityName).map((x) => (
          <Card
            onClick={() => updateLevel(x.level)}
            className={`${classes.level} ${
              x.level === selectedActivity.level && classes.selectedLevel
            }`}
          >
            <Typography
              variant="subtitle1"
              className={classes.levelTitle}
            >{`Level ${x.level}`}</Typography>
            <div>
              <Typography paragraph className={classes.levelDetails}>
                {x.frequency}
              </Typography>
              <Typography paragraph className={classes.levelDetails}>
                {x.ability}
              </Typography>
            </div>
          </Card>
        ))}
      </Card>
    </>
  );
};

export default Level;
