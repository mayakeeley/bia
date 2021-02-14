import React, { useState } from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import firebase, { firestore } from "../../firebase";
import { ActivityOutput, ActivityInput } from "types";
import { lavenderBlush } from "theme";
import { AccountCircle as AccountCircleIcon } from "@material-ui/icons";
import BasicInfo from "./BasicInfo";
import Activities from "./Activities";
import Level from "./Level";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: lavenderBlush,
      height: "100vh",
      padding: theme.spacing(2, 3),
    },
    button: { borderRadius: "20px", margin: "auto" },
    buttonWrapper: { display: "flex", justifyContent: "center" },
  })
);

const CreateProfile: React.FC<{ user: firebase.User }> = ({ user }) => {
  const classes = useStyles();
  const uid = uuidv4();
  const [values, setValues] = useState({
    uid: uid,
    name: "",
    dob: "2000-01-01",
    location: "",
    activities: [] as ActivityInput[],
    about: "",
    goals: [] as string[],
    photoUrl: user.photoURL || "",
    googleuid: user.uid || "",
  });
  const [activities, setActivities] = useState<ActivityOutput[]>();
  const visitPage1 = () => {
    setProgress(1);
    getActivities();
  };
  console.log(values);

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

  const [progress, setProgress] = useState(0);

  const renderForm = (progress: number) => {
    switch (progress) {
      case 0:
      default:
        return <BasicInfo values={values} setValues={setValues} />;
      case 1:
        return activities ? (
          <Activities
            values={values}
            setValues={setValues}
            activities={activities}
          />
        ) : (
          <BasicInfo values={values} setValues={setValues} />
        );
      case 2:
        return activities ? (
          <Level
            values={values}
            setValues={setValues}
            activities={activities}
          />
        ) : (
          <BasicInfo values={values} setValues={setValues} />
        );
    }
  };

  return (
    <Grid
      container
      justify="space-evenly"
      direction="column"
      className={classes.root}
    >
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <Typography variant="h2">Create Profile</Typography>
        </Grid>
        <Grid item>
          <AccountCircleIcon />
        </Grid>
      </Grid>

      {renderForm(progress)}

      <div>
        <Grid xs={12} className={classes.buttonWrapper}>
          <Button
            className={classes.button}
            variant="contained"
            onClick={() =>
              progress === 0 ? visitPage1() : setProgress(progress + 1)
            }
          >
            Next
          </Button>
        </Grid>
        <Grid
          xs={12}
          className={classes.buttonWrapper}
          onClick={() =>
            progress === 2 ? visitPage1() : setProgress(progress - 1)
          }
        >
          <Button>Back</Button>
        </Grid>
      </div>
    </Grid>
  );
};

export default CreateProfile;
