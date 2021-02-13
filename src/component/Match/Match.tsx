import React from "react";
import { UserModel } from "../../models/user.model";

const Match: React.FC<{ user: UserModel }> = ({ user }) => {
  return <article>{user.about}</article>;
};

export default Match;
