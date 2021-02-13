import React from "react";
import { User } from "../../models/user.model";

const Match: React.FC<{ user: User }> = ({ user }) => {
  return <article>{user.about}</article>;
};

export default Match;
