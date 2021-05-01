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
import { grey, white, mauvelous, black, azalea } from "theme";
import { UserModel } from "models/user.model";
import { ActivityModel } from "models/activity.model";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chip: { fontSize: "1em" },
        level: {
            backgroundColor: white,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: black,
            margin: theme.spacing(1),
            padding: theme.spacing(1, 2),
        },
        selectedLevel: {
            backgroundColor: azalea,
        },
        cardTitle: { textAlign: "center", color: white },
        levelDetails: { textAlign: "right" },
        levelTitle: { fontWeight: 800, whiteSpace: "nowrap" },
        selectedCard: { padding: theme.spacing(2), color: white },
        activity: { display: "flex", flexDirection: "column" },
        infoText: {
            color: grey,
        },
        fab: {
            margin: theme.spacing(2),
            height: "5.5em",
            width: "5.5em",
            backgroundColor: mauvelous,
        },
        fabText: {
            fontSize: "1em",
            color: white,
        },
        titleAndInfo: { padding: theme.spacing(2, 0) },
        container: { paddingBottom: "1em" },
    })
);

const levelDesc = ["Beginner", "Intermediate", "Advanced"];

const Level: React.FC<{
    values: UserModel;
    setValues: (values: UserModel) => void;
    activities: ActivityModel[];
}> = ({ values, setValues, activities }) => {
    const classes = useStyles();
    const [selectedActivity, setSelectedActivity] = useState(
        values.activities[0]
    );

    const getActivityLevels = (activityId: string) => {
        return (
            activities.find((option) => option.activityId === activityId)
                ?.levels || []
        );
    };

    const updateLevel = (level: number) => {
        const selectedActivityIndex = values.activities.findIndex(
            (option) => option.activityId === selectedActivity.activityId
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
            <Grid
                className={classes.container}
                container
                justify="space-evenly"
            >
                {values.activities.map((activity) => (
                    <Grid
                        item
                        className={classes.activity}
                        key={activity.activityName}
                    >
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
                            onClick={() => setSelectedActivity(activity)}
                            color="secondary"
                            variant={
                                activity.activityName ===
                                selectedActivity.activityName
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
                {getActivityLevels(selectedActivity.activityId).map(
                    (level, index) => (
                        <Card
                            onClick={() => updateLevel(index + 1)}
                            className={`${classes.level} ${
                                index + 1 === selectedActivity.level &&
                                classes.selectedLevel
                            }`}
                            key={index + 1}
                        >
                            <Typography
                                variant="subtitle1"
                                className={classes.levelTitle}
                            >{`Level ${index + 1}`}</Typography>
                            <div>
                                <Typography
                                    paragraph
                                    className={classes.levelDetails}
                                >
                                    {levelDesc[index]}
                                </Typography>
                            </div>
                        </Card>
                    )
                )}
            </Card>
        </>
    );
};

export default Level;
