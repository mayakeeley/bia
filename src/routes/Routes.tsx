import React, { useState } from "react";
import Welcome from "../pages/Welcome/Welcome";
import Matches from "../pages/Matches/Matches";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import firebase from "../firebase";
import MockData from "../assets/Mock Data/MockData";

const App: React.FC = () => {
  const [user, setUser] = useState<firebase.User | undefined>();
  const mockUser = MockData.users.find((user) => user.uid === 8360);

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          component={() => <Welcome setUser={setUser} user={user} />}
        />
        <Route
          path="/matches"
          component={() =>
            mockUser ? (
              <Matches user={mockUser} />
            ) : (
              <Welcome setUser={setUser} user={user} />
            )
          }
        />
      </Switch>
    </Router>
  );
};

export default App;
