import React, { useState } from "react";
import Welcome from "./pages/Welcome/Welcome";
import Matches from "./pages/Matches/Matches";
import firebase, { provider } from "./firebase";
import {
  HashRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
} from "react-router-dom";

const App: React.FC = () => {
  const [user, setUser] = useState<firebase.User | undefined>();

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/matches" component={Matches} />
      </Switch>
    </Router>
  );
};

export default App;
