import "./Login.scss";
import React from "react";

const Login: React.FC<{ signIn: () => void; user: any }> = ({
  signIn,
  user,
}) => {
  return (
    <div>
      {signIn && (
        <button onClick={signIn} className="btn--primary">
          Let's go
        </button>
      )}
    </div>
  );
};

export default Login;
