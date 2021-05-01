import { UserModel } from "models/user.model";
import { createContext, useContext } from "react";

export type UserContextType = {
    biaUser: UserModel | undefined;
    setBiaUser: (user?: UserModel) => void;
};

export const BiaUserContext = createContext<UserContextType>({
    biaUser: undefined,
    setBiaUser: (biaUser) => console.warn("no user provider"),
});

export const useBiaUserContext = () => useContext(BiaUserContext);
