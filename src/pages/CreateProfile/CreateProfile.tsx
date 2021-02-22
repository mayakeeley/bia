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
import { ActivityOutput, ActivityInput, RelayUser } from "types";
import { lavenderBlush } from "theme";
import { AccountCircle as AccountCircleIcon } from "@material-ui/icons";
import BasicInfo from "./BasicInfo";
import Activities from "./Activities";
import Level from "./Level";
import Goals from "./Goals";
import Bio from "./Bio";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();

  const [progress, setProgress] = useState(0);
  const [activities, setActivities] = useState<ActivityOutput[]>();
  const [values, setValues] = useState<RelayUser>({
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

  const visitPage1 = () => {
    setProgress(1);
    getActivities();
  };

  const createUser = (user: RelayUser) => {
    firestore
      .collection("Users")
      .doc()
      .set(user)
      .then(() => {
        history.push("/matches");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

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

  const getIsButtonEnabled = (progress: number, values: RelayUser) => {
    switch (progress) {
      case 0:
      default:
        return values.name.length > 0 && values.location.length > 0;
      case 1:
        return values.activities.length > 0 && values.activities.length <= 3;
      case 2:
        return true;
      case 3:
        return values.goals.every((goal) => goal.length > 0);
      case 4:
        return values.about.length > 0;
    }
  };

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
      case 3:
        return <Goals values={values} setValues={setValues} />;
      case 4:
        return <Bio values={values} setValues={setValues} />;
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
        {progress === 4 ? (
          <Grid item xs={12} className={classes.buttonWrapper}>
            <Button
              className={classes.button}
              variant="contained"
              disabled={!getIsButtonEnabled(progress, values)}
              onClick={() => createUser(values)}
            >
              Submit
            </Button>
          </Grid>
        ) : (
          <Grid item xs={12} className={classes.buttonWrapper}>
            <Button
              className={classes.button}
              variant="contained"
              disabled={!getIsButtonEnabled(progress, values)}
              onClick={() =>
                progress === 0 ? visitPage1() : setProgress(progress + 1)
              }
            >
              Next
            </Button>
          </Grid>
        )}
        {progress !== 0 && (
          <Grid
            item
            xs={12}
            className={classes.buttonWrapper}
            onClick={() =>
              progress === 2 ? visitPage1() : setProgress(progress - 1)
            }
          >
            <Button>Back</Button>
          </Grid>
        )}
      </div>
    </Grid>
  );
};

export default CreateProfile;
