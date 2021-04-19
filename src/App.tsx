import { UserModel } from "models/user.model";
import * as React from "react";
import { useState } from "react";
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

const App: React.FC = () => {
  const [biaUser, setBiaUser] = useState(sampleUser);

  return (
    <BiaUserContext.Provider value={{ biaUser, setBiaUser }}>
      <Routes />
    </BiaUserContext.Provider>
  );
};

export default App;
