import React from "react";
import Match from "../../components/Match/Match";
import { UserModel } from "../../models/user.model";
import mockData from "../../assets/mockData/MockData";
import NavBar from "../../components/NavBar/NavBar";
import {
  createStyles,
  Fab,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { rajah, jordyBlue, white } from "theme";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: jordyBlue,
      boxSizing: "border-box",
      height: "100vh",
      paddingBottom: "4.5em",
    },
    title: { color: white, padding: theme.spacing(3, 0, 0, 3) },
    button: { backgroundColor: rajah, color: white, margin: "0 0 1em 0" },
  })
);

const Matches: React.FC<{ user: UserModel }> = ({ user }) => {
  const classes = useStyles();
  // const [firstAvailableUser, setFirstAvailableUsers] = useState<User>();
  const users = mockData.users;

  const availableUsers = users.filter(
    (x: UserModel) => !user.users.hasOwnProperty(x.uid) && x.uid !== user.uid
  );

  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Swipe
      </Typography>
      <Match user={availableUsers[0]} />
      <Grid container justify="space-around">
        <Fab className={classes.button}>
          <ClearRoundedIcon />
        </Fab>
        <Fab className={classes.button}>
          <CheckRoundedIcon />
        </Fab>
      </Grid>
      <NavBar />
    </div>
  );
};

export default Matches;
