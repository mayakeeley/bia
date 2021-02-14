import React from "react";
import Match from "../../components/Match/Match";
import { UserModel } from "../../models/user.model";
import mockData from "../../assets/mockData/MockData";
import NavBar from "../../components/NavBar/NavBar";

const Matches: React.FC<{ user: UserModel }> = ({ user }) => {
  // const [firstAvailableUser, setFirstAvailableUsers] = useState<User>();
  const users = mockData.users;

  const availableUsers = users.filter(
    (x: UserModel) => !user.users.hasOwnProperty(x.uid) && x.uid !== user.uid
  );

  return (
      <div>
      <Match user={availableUsers[0]} />
      <NavBar/>
      </div>
      );
};

export default Matches;
