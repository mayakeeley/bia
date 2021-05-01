import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { UserModel } from "models/user.model";
import * as React from "react";
import { useState } from "react";
import { azalea } from "theme";
import { BiaUserContext } from "./AppContext";
import Routes from "./routes/Routes";

const sampleUser: UserModel = {
  uid: "string",
  googleuid: "string",
  photoUrl: "string",
  name: "string",
  dob: "string",
  location: "string",
  about: "string",
  activities: [{ activityId: "string", level: 1, activityName: "string" }],
  goals: [""],
  users: {},
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appWrapper: {
      maxWidth: "768px",
      maxHeight: "1024px",
      padding: 0,
    },
    nonMobileWrapper: {
      minWidth: "100vw",
      minHeight: "100vh",
      backgroundColor: azalea,
      padding: 0,
      display: "flex",
      justifyContent: "flex-end",
    },
  })
);
const App: React.FC = () => {
  const [biaUser, setBiaUser] = useState(sampleUser);
  const classes = useStyles();
  return (
    <BiaUserContext.Provider value={{ biaUser, setBiaUser }}>
      <Container className={classes.nonMobileWrapper}>
        <Container className={classes.appWrapper}>
          <Routes />
        </Container>
      </Container>
    </BiaUserContext.Provider>
  );
};

export default App;
