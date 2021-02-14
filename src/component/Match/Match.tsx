import React from "react";
import { User } from "../../types";

const Match: React.FC<{ user: User }> = ({ user }) => {
  return <article>{user.about}</article>;
};

export default Match;
