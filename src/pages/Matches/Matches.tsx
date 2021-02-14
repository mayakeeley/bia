import React from "react";
import Match from "../../component/Match/Match";
import { User } from "../../types";
import mockData from "../../assets/MockData/MockData";

const Matches: React.FC<{ user: User }> = ({ user }) => {
  // const [firstAvailableUser, setFirstAvailableUsers] = useState<User>();
  const users = mockData.users;

  const availableUsers = users.filter(
    (x: User) => !user.seenUsers.includes(x.uid) && x.uid !== user.uid
  );

  console.log(availableUsers);
  return <Match user={availableUsers[0]} />;
};

export default Matches;
