import React from "react";
import { Button } from "@material-ui/core";

const Login: React.FC<{ signIn: () => void; user: any }> = ({
  signIn,
  user,
}) => {
  // I'm not convinced this needs to be brought out into it's own component.
  return (
    <Button onClick={signIn} variant="contained" data-testid="login-button">
      Let's go
    </Button>
  );
};

export default Login;
