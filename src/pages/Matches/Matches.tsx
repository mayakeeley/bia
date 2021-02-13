import React from "react";
import Match from "../../components/Match/Match";
import { UserModel } from "../../models/user.model";
import mockData from "../../assets/mockData/MockData";

const Matches: React.FC<{ user: UserModel }> = ({ user }) => {
  // const [firstAvailableUser, setFirstAvailableUsers] = useState<User>();
  const users = mockData.users;

  const availableUsers = users.filter(
    (x: UserModel) => !user.users.hasOwnProperty(x.uid) && x.uid !== user.uid
  );
  
  return <Match user={availableUsers[0]} />;
};

export default Matches;
