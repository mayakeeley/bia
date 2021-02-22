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
import { grey, white, mauvelous, black, azalea } from "theme";

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
    infoText: {
      color: grey,
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
    titleAndInfo: { padding: theme.spacing(2, 0) },
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
      activities.find((option) => option.activityName === activity)?.levels ||
      [];
    const sortedLevels = levels.sort((a, b) => (a.level > b.level ? 1 : -1));
    return sortedLevels;
  };

  const updateLevel = (level: number) => {
    const selectedActivityIndex = values.activities.findIndex(
      (option) => option.activityName === selectedActivity.activityName
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
          <Grid item className={classes.activity} key={activity.activityName}>
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
        {getActivityLevels(selectedActivity.activityName).map((level) => (
          <Card
            onClick={() => updateLevel(level.level)}
            className={`${classes.level} ${
              level.level === selectedActivity.level && classes.selectedLevel
            }`}
            key={level.level}
          >
            <Typography
              variant="subtitle1"
              className={classes.levelTitle}
            >{`Level ${level.level}`}</Typography>
            <div>
              <Typography paragraph className={classes.levelDetails}>
                {level.frequency}
              </Typography>
              <Typography paragraph className={classes.levelDetails}>
                {level.ability}
              </Typography>
            </div>
          </Card>
        ))}
      </Card>
    </>
  );
};

export default Level;
