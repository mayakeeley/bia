import React, { useState } from "react";
import Welcome from "../pages/Welcome/Welcome";
import Matches from "../pages/Matches/Matches";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import firebase from "../firebase";
import CreateProfile from "pages/CreateProfile/CreateProfile";
import Messages from "../pages/Messages/Messages";
import Profile from "../pages/Profile/Profile";
import { useBiaUserContext } from "AppContext";
import Chat from "pages/Chat/Chat";

const App: React.FC = () => {
  const [user, setUser] = useState<firebase.User | undefined>();
  const { biaUser } = useBiaUserContext();

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <Welcome setUser={setUser} />} />
        <Route
          exact
          path="/chat/:id"
          component={() => (biaUser ? <Chat /> : <Welcome setUser={setUser} />)}
        />
        <Route
          exact
          path="/matches"
          component={() =>
            biaUser ? <Matches /> : <Welcome setUser={setUser} />
          }
        />
        <Route
          exact
          path="/createProfile"
          component={() =>
            user ? <CreateProfile user={user} /> : <Welcome setUser={setUser} />
          }
        />
        <Route
          exact
          path="/messages"
          component={() =>
            biaUser ? <Messages /> : <Welcome setUser={setUser} />
          }
        />
        <Route
          exact
          path="/profile"
          component={() =>
            biaUser ? <Profile /> : <Welcome setUser={setUser} />
          }
        />
      </Switch>
    </Router>
  );
};

export default App;
