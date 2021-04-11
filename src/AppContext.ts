import { UserModel } from "models/user.model";
import { createContext, useContext } from "react";

export type UserContextType = {
  biaUser: UserModel | null;
  setBiaUser: (user: UserModel) => void;
};

export const BiaUserContext = createContext<UserContextType>({
  biaUser: null,
  setBiaUser: (biaUser) => console.warn("no user provider"),
});

export const useBiaUserContext = () => useContext(BiaUserContext);
