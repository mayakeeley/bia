import "./App.scss";
import React, { useState } from "react";
import Welcome from "./welcome";
import firebase, { provider } from "./firebase";

const App = () => {
  const [user, setUser] = useState<firebase.User | undefined>();

  const signIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        result.user && setUser(result.user);
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(undefined);
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <Welcome user={user} signIn={signIn} />
    </div>
  );
};

export default App;
