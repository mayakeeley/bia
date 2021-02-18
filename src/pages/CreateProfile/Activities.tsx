import React from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Fab,
  Chip,
} from "@material-ui/core";
import { RelayUser, ActivityOutput } from "types";
import { grey, white, mauvelous } from "theme";
import DirectionsRunRoundedIcon from "@material-ui/icons/DirectionsRunRounded";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: { fontSize: "16px", margin: theme.spacing(1) },
    activitiesLine2: {
      marginLeft: theme.spacing(8),
      position: "relative",
      top: theme.spacing(-4),
    },
    infoText: {
      color: grey,
    },
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
    },
    fabText: {
      fontSize: "16px",
      color: white,
    },
    fabSelected: {
      backgroundColor: mauvelous,
    },
    titleAndInfo: { padding: theme.spacing(2, 0) },
  })
);

const Activities: React.FC<{
  values: RelayUser;
  setValues: (values: RelayUser) => void;
  activities: ActivityOutput[];
}> = ({ values, setValues, activities }) => {
  const classes = useStyles();

  const isLengthEven = activities.length % 2 === 0;
  const cutPoint = isLengthEven
    ? activities.length / 2
    : (activities.length + 1) / 2;

  const activitiesList1 = activities.slice(0, cutPoint);
  const activitiesList2 = activities.slice(cutPoint);

  const isActivitySelected = (activityName) =>
    values.activities.filter((x) => x.activityName === activityName).length > 0;

  const toggleActivity = (activityName: string) => {
    isActivitySelected(activityName)
      ? setValues({
          ...values,
          activities: values.activities.filter(
            (activity) => activity.activityName !== activityName
          ),
        })
      : setValues({
          ...values,
          activities: [...values.activities, { activityName, level: 1 }],
        });
  };

  return (
    <>
      <div className={classes.titleAndInfo}>
        <Typography variant="h4" gutterBottom>
          Activities
        </Typography>
        <Typography variant="subtitle2" className={classes.infoText}>
          Choose your top three
          <br /> ways to exercise
        </Typography>
      </div>
      <div>
        <div>
          {activitiesList1.map((activity) => (
            <Fab
              color="primary"
              className={`${classes.fab} ${
                isActivitySelected(activity.activityName) && classes.fabSelected
              }`}
              onClick={() => toggleActivity(activity.activityName)}
            >
              <div className={classes.fabInfo}>
                <DirectionsRunRoundedIcon />
                <Typography paragraph className={classes.fabText}>
                  {activity.activityName}
                </Typography>
              </div>
            </Fab>
          ))}
        </div>
        <div className={classes.activitiesLine2}>
          {activitiesList2.map((activity) => (
            <Fab
              color="primary"
              className={`${classes.fab} ${
                isActivitySelected(activity.activityName) && classes.fabSelected
              }`}
              onClick={() => toggleActivity(activity.activityName)}
            >
              <div className={classes.fabInfo}>
                <DirectionsRunRoundedIcon />
                <Typography paragraph className={classes.fabText}>
                  {activity.activityName}
                </Typography>
              </div>
            </Fab>
          ))}
        </div>
        {values.activities.map((x) => (
          <Chip
            color="secondary"
            className={classes.chip}
            label={x.activityName}
            onDelete={() => toggleActivity(x.activityName)}
          />
        ))}
      </div>
    </>
  );
};

export default Activities;
