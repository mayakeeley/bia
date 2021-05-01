import React from "react";
import {
    makeStyles,
    createStyles,
    Theme,
    Typography,
    Fab,
    Chip,
    Grid,
} from "@material-ui/core";
import { grey, white, mauvelous } from "theme";
import DirectionsRunRoundedIcon from "@material-ui/icons/DirectionsRunRounded";
import { UserModel } from "models/user.model";
import { ActivityModel } from "models/activity.model";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chip: { fontSize: "1em", margin: theme.spacing(1) },

        infoText: {
            color: grey,
        },
        fabInfo: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "&>svg": {
                fontSize: "2em",
            },
        },
        fab: {
            minWidth: "4.5em",
            minHeight: "4.5em",
            width: "20vw",
            height: "20vw",
            maxWidth: "7.5em",
            maxHeight: "7.5em",
        },
        fabText: {
            fontSize: "1em",
            color: white,
        },
        fabSelected: {
            backgroundColor: mauvelous,
        },
        titleAndInfo: { padding: theme.spacing(2, 0) },
    })
);

const Activities: React.FC<{
    values: UserModel;
    setValues: (values: UserModel) => void;
    activities: ActivityModel[];
}> = ({ values, setValues, activities }) => {
    const classes = useStyles();

    const isActivitySelected = (activityId) =>
        values.activities.findIndex(
            (activity) => activity.activityId === activityId
        ) !== -1;

    const toggleActivity = (activityId: string) => {
        const activity = activities.find(
            (activity) => activity.activityId === activityId
        );
        if (activity) {
            isActivitySelected(activityId)
                ? setValues({
                      ...values,
                      activities: values.activities.filter(
                          (valueActivity) =>
                              valueActivity.activityId !== activityId
                      ),
                  })
                : setValues({
                      ...values,
                      activities: [
                          ...values.activities,
                          {
                              activityId: activity.activityId,
                              activityName: activity.activityName,
                              level: 1,
                          },
                      ],
                  });
        }
    };

    return (
        <>
            <div className={classes.titleAndInfo}>
                <Typography variant="h4" gutterBottom>
                    Activities
                </Typography>
                <Typography variant="subtitle2" className={classes.infoText}>
                    Choose your top three
                </Typography>
                <Typography variant="subtitle2" className={classes.infoText}>
                    ways to exercise
                </Typography>
            </div>
            <div>
                <Grid container spacing={2} justify="center">
                    {activities.map((activity) => (
                        <Grid item key={activity.activityId}>
                            <Fab
                                color="primary"
                                className={`${classes.fab} ${
                                    isActivitySelected(activity.activityId) &&
                                    classes.fabSelected
                                }`}
                                key={activity.activityId}
                                onClick={() =>
                                    toggleActivity(activity.activityId)
                                }
                            >
                                <div className={classes.fabInfo}>
                                    <Typography
                                        paragraph
                                        className={classes.fabText}
                                    >
                                        {activity.activityName}
                                    </Typography>
                                </div>
                            </Fab>
                        </Grid>
                    ))}
                </Grid>
                {values.activities.map((activity) => (
                    <Chip
                        color="secondary"
                        className={classes.chip}
                        label={activity.activityName}
                        key={activity.activityName}
                        onDelete={() => toggleActivity(activity.activityId)}
                    />
                ))}
            </div>
        </>
    );
};

export default Activities;
