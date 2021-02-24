import React from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Avatar,
  Grid,
} from "@material-ui/core";
import NavBar from "../../components/NavBar/NavBar";
import mockdata from "../../assets/mockData/MockData";
import { UserModel } from "../../models/user.model";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import {
  lavenderBlush,
  jordyBlue,
  azalea,
  mauvelous,
  springRain,
  white,
} from "theme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    profileWrapper: {
      backgroundColor: mauvelous,
      height: "100%",
    },
    white: {
      color: white,
    },
    profileTitle: {
      display: "flex",
      alignItems: "center",
    },
    profile: {},
    icon: {
      marginLeft: "0.5rem",
      color: white,
    },
    profileHeader: {
      display: "flex",
      justifyContent: "space-between",
      padding: "2rem",
    },

    profilePill: {
      backgroundColor: jordyBlue,
      position: "absolute",
      top: "0rem",
      left: "0rem",

      borderRadius: "2rem",
      width: "15rem",
      color: "white",
      zIndex: theme.zIndex.tooltip,
    },
    profilePillText: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    },

    profileIcon: {
      margin: "auto",
    },
    profileInfo: {
      backgroundColor: lavenderBlush,
      position: "relative",
      top: "10rem",
      left: "0",
      width: "100%",
      height: "28rem",
      borderRadius: "2.5rem",
    },

    profileBody: {
      margin: theme.spacing(2),
    },
  })
);
const Profile: React.FC<{ user: UserModel }> = ({ user }) => {
  const users = mockdata.users;
  const classes = useStyles();

  // const activitiesList = [
  //   {
  //     activityId: users[0].activities[0].activityId,
  //     level: users[0].activities[0].level,
  //   },
  //   {
  //     activityId: users[1].activities[1].activityId,
  //     level: users[1].activities[1].level,
  //   },
  //   {
  //     activityId: users[2].activities[2].activityId,
  //     level: users[2].activities[2].level,
  //   },
  // ];
  const activities = user.activities.map((activity, level, index) => {
    return (
      <div>
        <h4 key={index}>{activity}</h4>;<p>{level}</p>
      </div>
    );
  });
  return (
    <div className={classes.profileWrapper}>
      <div className={classes.profile}>
        <div className={classes.profileHeader}>
          <div className={classes.profileTitle}>
            <Typography className={classes.white} variant="h3">
              Profile
            </Typography>
            <AccountCircleIcon className={classes.icon} />
          </div>

          <SettingsIcon />
        </div>
        <main className={classes.profileInfo}>
          <section className={classes.profilePill}>
            <Avatar
              className={classes.profileIcon}
              src={users[0].photoUrl}
            ></Avatar>
            <div className={classes.profilePillText}>
              <Typography variant="h3"> {users[0].name} </Typography>
              <Typography variant="h3">{users[0].location}</Typography>
              <Typography variant="h4">{users[0].dob}</Typography>
            </div>
          </section>
          <Typography variant="h4"> About</Typography>
          <Typography variant="body1" className={classes.profileBody}>
            {users[0].about}
          </Typography>

          <Typography variant="h4"> Goals</Typography>
          <Typography variant="body1" className={classes.profileBody}>
            {users[0].goals}
          </Typography>
        </main>
      </div>
      <NavBar />
    </div>
  );
};
export default Profile;
