import "./Welcome.scss";
import React from "react";
import Login from "../components/Login";

import image from "../assets/welcome-screen.png";

const Welcome: React.FC<{ signIn: () => void; user: any }> = ({
  signIn,
  user,
}) => {
  return (
    <div className="welcome block-spacing">
      <h1 className="heading--h1">Welcome</h1>
      <img className="welcome__image" src={image} alt="welcome screen" />
      <p className="text--20">Are you ready to start your own race?</p>
      <Login signIn={signIn} user={user} />
    </div>
  );
};

export default Welcome;
