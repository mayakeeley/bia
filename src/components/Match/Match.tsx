import {
    Avatar,
    makeStyles,
    createStyles,
    Theme,
    Grid,
    Typography,
    Chip,
} from "@material-ui/core";
import { getAgeFromDOB } from "appUtils";
import React from "react";
import {
    lavenderBlush,
    white,
    mauvelous,
    headingFonts,
    springRain,
} from "theme";
import { UserModel } from "../../models/user.model";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        matchRoot: {
            margin: theme.spacing(0, 6),
            padding: theme.spacing(1, 2),
            position: "relative",
            bottom: theme.spacing(3),
            height: "50vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "20px",
            backgroundColor: lavenderBlush,
        },
        avatar: {
            width: theme.spacing(10),
            height: theme.spacing(10),
            top: theme.spacing(3),
            zIndex: 1,
            margin: "auto",
        },
        basicInfo: {
            marginTop: theme.spacing(6),
        },
        about: {
            maxHeight: "25vh",
            overflow: "auto",
            alignSelf: "flex-start",
            fontSize: "14px",
            marginTop: theme.spacing(2),
            color: theme.palette.grey[700],
        },
        activity: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "5em",
        },
        fab: {
            margin: theme.spacing(2, 1),
            width: "100%",
            paddingTop: "100%",
            position: "relative",
            backgroundColor: mauvelous,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
        },
        fabText: {
            color: white,
            fontWeight: 600,
            position: "absolute",
            top: "38%",
        },
        chip: {
            fontSize: "14px",
            fontFamily: headingFonts,
            width: "100%",
            backgroundColor: springRain,
            color: white,
        },
    })
);

const Match: React.FC<{ user: UserModel }> = ({ user }) => {
    const classes = useStyles();

    return (
        <>
            <Avatar
                src={user.photoUrl}
                alt={user.name}
                className={classes.avatar}
            />
            <div className={classes.matchRoot}>
                <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    className={classes.basicInfo}
                >
                    <Grid item>
                        <Typography variant="h4">{user.name}</Typography>
                        <Typography variant="subtitle2">
                            {user.location}
                        </Typography>
                    </Grid>
                    <Typography variant="subtitle1">
                        {getAgeFromDOB(user.dob)}
                    </Typography>
                </Grid>
                <Typography variant="body1" className={classes.about}>
                    {user.about}
                </Typography>

                <Grid container justify="space-between" spacing={1}>
                    {user.activities &&
                        user.activities.map((activity, index) => (
                            <Grid
                                item
                                className={classes.activity}
                                key={index}
                                xs={4}
                            >
                                <div className={classes.fab}>
                                    <Typography
                                        variant="body1"
                                        className={classes.fabText}
                                    >
                                        {activity.activityName}
                                    </Typography>
                                </div>
                                <Chip
                                    className={classes.chip}
                                    variant="default"
                                    label={`Level ${activity.level}`}
                                />
                            </Grid>
                        ))}
                </Grid>
            </div>
        </>
    );
};

export default Match;
