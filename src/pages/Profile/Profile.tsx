import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import Navbar from "components/NavBar/NavBar";
import ProfileIcon from "assets/icons/profile.svg";
import {
    grey,
    jordyBlue,
    lavenderBlush,
    mauvelous,
    springRain,
    white,
} from "theme";
import { firestore } from "../../firebase";
import { ActivityModel } from "models/activity.model";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import { deleteBiaUser, getBiaUser } from "utils/localstorage";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        background: {
            backgroundColor: mauvelous,
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
        },
        icon: {
            width: "1.75em",
            backgroundColor: white,
            padding: theme.spacing(0.7),
            borderRadius: "50%",
            marginLeft: theme.spacing(1),
        },
        settings: {
            width: "1.25rem",
        },
        settingsButton: {
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            marginLeft: "auto",
        },
        logoutButton: {
            cursor: "pointer",
            borderRadius: "2em",
            border: "none",
            backgroundColor: jordyBlue,
            padding: "0.2em 1em",
            marginBottom: "0.3em",
            marginRight: "-1em",
        },
        logoutText: {
            color: white,
        },
        grey: {
            color: grey,
        },
        header: {
            padding: "1.5em 1.5em 1em 1.5em",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        },
        headerWrapper: {
            display: "flex",
            alignItems: "center",
        },
        light: {
            color: white,
        },
        location: {
            color: white,
            marginTop: "0.25rem",
        },
        tab: {
            height: "100%",
            flex: "1 1 auto",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            marginTop: "5em",
            paddingBottom: "4.5em",
        },
        about: {
            backgroundColor: lavenderBlush,
            padding: "6em 1.5em 0 1.5em",
            borderTopLeftRadius: "1.5em",
            borderTopRightRadius: "1.5em",
            flex: "1 1 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
        },
        aboutHeading: {
            marginBottom: "0.5em",
        },
        blob: {
            backgroundColor: jordyBlue,
            width: "50%",
            alignSelf: "center",
            borderRadius: "2em",
            padding: "3em 1.5em 1.5em 1.5em",
            position: "absolute",
            zIndex: 1,
            height: "3em",
            top: "-3em",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        photo: {
            width: "5.5em",
            borderRadius: "50%",
            objectFit: "cover",
            height: "5.5em",
            position: "absolute",
            top: "-2.75em",
        },
        activities: {
            display: "flex",
            justifyContent: "space-between",
            padding: "1em 0",
        },
        activity: {
            flex: "1 1 33.333%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "&:nth-of-type(2)": {
                padding: "0 0.5em",
            },
        },
        activityLevel: {
            backgroundColor: springRain,
            color: white,
            borderRadius: "1em",
            marginTop: "0.5em",
            padding: "0.25em 0.75em",
            textAlign: "center",
        },
        activityName: {
            backgroundColor: mauvelous,
            height: "5em",
            width: "5em",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            color: white,
        },
        goal: {
            display: "flex",
            alignItems: "center",
            paddingTop: "0.5em",
        },
        goalNumber: {
            backgroundColor: jordyBlue,
            width: "1.75em",
            height: "1.75em",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "1em",
            color: white,
        },
        goals: {
            padding: "0.25em 0 0.5em 0",
        },
    })
);

const Profile: React.FC<{
    setUser: (user: firebase.User | undefined) => void;
}> = ({ setUser }) => {
    const [activities, setActivities] = useState<ActivityModel[]>();
    const classes = useStyles();
    const history = useHistory();
    const biaUser = getBiaUser();

    const getActivities = () => {
        firestore
            .collection("Activities")
            .get()
            .then((querySnapshot) => {
                const activities = querySnapshot.docs.map((doc) => {
                    return {
                        activityId: doc.data().activityId,
                        activityName: doc.data().activityName,
                        levels: doc.data().levels,
                    };
                });
                setActivities(activities);
            })
            .catch((error) => console.log(error));
    };

    const signOut = async () => {
        await firebase
            .auth()
            .signOut()
            .then(() => {
                deleteBiaUser();
                history.push("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (!activities) {
            getActivities();
        }
    });

    const mappedActivities =
        biaUser &&
        biaUser.activities.map((activity, index) => {
            const activityObject = activities?.find(
                (data) => data.activityId === activity.activityId
            );
            return (
                <div className={classes.activity} key={index}>
                    <Typography
                        className={classes.activityName}
                        variant="h5"
                        data-testid="activity-level"
                    >
                        {activityObject?.activityName}
                    </Typography>
                    <Typography
                        className={classes.activityLevel}
                        variant="body1"
                        data-testid="activity-level"
                    >
                        Level {activity.level}
                    </Typography>
                </div>
            );
        });

    const goals =
        biaUser &&
        biaUser.goals.map((goal, index) => {
            return (
                <div key={index} className={classes.goal}>
                    <Typography
                        variant="body1"
                        data-testid="goal"
                        className={classes.goalNumber}
                    >
                        {index + 1}
                    </Typography>
                    <Typography variant="body1" data-testid="goal">
                        {goal}
                    </Typography>
                </div>
            );
        });

    return (
        biaUser && (
            <div className={classes.background}>
                <div className={classes.header}>
                    <div className={classes.headerWrapper}>
                        <Typography
                            className={classes.light}
                            variant="h1"
                            data-testid="profile-title"
                        >
                            Profile
                        </Typography>
                        <img
                            className={classes.icon}
                            src={ProfileIcon}
                            alt="profile"
                        />
                    </div>
                    <button className={classes.logoutButton} onClick={signOut}>
                        <Typography
                            className={classes.logoutText}
                            variant="subtitle2"
                        >
                            Log Out
                        </Typography>
                    </button>
                </div>
                <div className={classes.tab}>
                    <div className={classes.blob}>
                        <img
                            className={classes.photo}
                            src={biaUser.photoUrl}
                            alt="user profile"
                        />
                        <Typography
                            className={classes.light}
                            variant="h3"
                            data-testid="profile-title"
                        >
                            {biaUser.name}
                        </Typography>
                        <Typography
                            className={classes.location}
                            variant="subtitle2"
                            data-testid="profile-subtitle"
                        >
                            {biaUser.location}
                        </Typography>
                    </div>
                    <div className={classes.about}>
                        <Typography
                            className={classes.aboutHeading}
                            variant="h4"
                            data-testid="profile-title"
                        >
                            About
                        </Typography>
                        <Typography
                            className={classes.grey}
                            variant="body1"
                            data-testid="profile-about"
                        >
                            {biaUser.about}
                        </Typography>
                        <div className={classes.activities}>
                            {mappedActivities}
                        </div>
                        <Typography
                            className={classes.aboutHeading}
                            variant="h4"
                            data-testid="profile-title"
                        >
                            Goals
                            <div className={classes.goals}>{goals}</div>
                        </Typography>
                    </div>
                </div>
                <Navbar />
            </div>
        )
    );
};

export default Profile;
