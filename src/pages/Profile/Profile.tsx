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
import { lavenderBlush, jordyBlue, azalea, mauvelous, springRain } from "theme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    profile: {
      backgroundColor: mauvelous,
      height: "20rem",
      padding: "2rem",
      position: "relative",
    },

    profilePill: {
      backgroundColor: jordyBlue,
      position: "absolute",
      top: "6rem",
      left: "4rem",
      right: "4rem",
      borderRadius: "2rem",
      width: "15rem",
      color: "white",
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
      position: "absolute",
      top: "10rem",
      left: "0",
      width: "100%",
      height: "28rem",
      borderRadius: "2.5rem",
      zIndex: "-moz-initial",
    },

    profileBody: {
      margin: theme.spacing(2),
    },
  })
);
const Profile: React.FC<{ user: UserModel }> = ({ user }) => {
  const users = mockdata.users;
  const classes = useStyles();

  return (
    <div className={classes.profile}>
      <Grid
        container
        direction="row"
        justify="space-between"
        align-items="flex-start"
      >
        <Typography variant="h3" color="initial">
          Profile
        </Typography>
        <AccountCircleIcon color="primary" />
        <SettingsIcon />
      </Grid>
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
      <main className={classes.profileInfo}>
        <Typography variant="h4"> About</Typography>
        <Typography variant="body1" className={classes.profileBody}>
          {users[0].about}
        </Typography>
        <Typography variant="h4"> Activities</Typography>

        <Typography variant="h4"> Goals</Typography>
        <Typography variant="body1" className={classes.profileBody}>
          {users[0].goals}
        </Typography>
      </main>
      <NavBar />
    </div>
  );
};
export default Profile;
