import React, { useState } from "react";
import Welcome from "../pages/Welcome/Welcome";
import Matches from "../pages/Matches/Matches";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import firebase from "../firebase";
import mockData from "../assets/mockData/MockData";

const App: React.FC = () => {
  const [user, setUser] = useState<firebase.User | undefined>();
  const mockUser = mockData.users.find((user) => user.uid === 8360);

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          component={() => <Welcome setUser={setUser} user={user} />}
        />
        <Route
          exact
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
