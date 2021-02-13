import CreateProfile from "pages/CreateProfile/CreateProfile";
import React, { useState } from "react";
import Welcome from "./components/welcome";
import firebase, { provider } from "./firebase";
import { Router, Link } from "@reach/router";

const App: React.FC = () => {
  const [user, setUser] = useState<firebase.User | undefined>();

  const signIn = async () => {
    await firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        result.user && setUser(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signOut = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(undefined);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const renderCreateProfilePage = false;

  return renderCreateProfilePage ? (
    <CreateProfile />
  ) : (
    <Welcome signIn={signIn} />
  );
};

export default App;
