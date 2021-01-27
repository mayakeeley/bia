import "./Welcome.scss";
import React from "react";
import image from "../assets/welcome-screen.png";

function Welcome() {
  return (
    <div className="welcome block-spacing">
      <h1 className="heading--h1">Welcome</h1>
      <img className="welcome__image" src={image} alt="welcome screen" />
      <p className="text--20">Are you ready to start your own race?</p>
      <button className="btn--primary">Let's go</button>
    </div>
  );
}

export default Welcome;
