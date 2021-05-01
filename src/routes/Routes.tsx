import React, { useState } from "react";
import Welcome from "../pages/Welcome/Welcome";
import Matches from "../pages/Matches/Matches";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import firebase from "../firebase";
import CreateProfile from "pages/CreateProfile/CreateProfile";
import Messages from "../pages/Messages/Messages";
import Profile from "../pages/Profile/Profile";
import Chat from "pages/Chat/Chat";
import PrivateRoute from "../utils/PrivateRoute";

const App: React.FC = () => {
    const [user, setUser] = useState<firebase.User | undefined>();

    return (
        <Router>
            <Switch>
                <Route
                    exact
                    path="/"
                    component={() => <Welcome setUser={setUser} />}
                />
                <PrivateRoute
                    exact
                    path="/chat/:id"
                    component={() => <Chat />}
                />
                <PrivateRoute
                    exact
                    path="/matches"
                    component={() => <Matches />}
                />
                <Route
                    exact
                    path="/createProfile"
                    component={() =>
                        user ? (
                            <CreateProfile user={user} />
                        ) : (
                            <Welcome setUser={setUser} />
                        )
                    }
                />
                <PrivateRoute
                    exact
                    path="/messages"
                    component={() => <Messages />}
                />
                <PrivateRoute
                    exact
                    path="/profile"
                    component={() => <Profile setUser={setUser} />}
                />
            </Switch>
        </Router>
    );
};

export default App;
