import { UserModel } from "models/user.model";
import * as React from "react";
import { useState } from "react";
import { BiaUserContext } from "./AppContext";
import Routes from "./routes/Routes";

const App: React.FC = () => {
    const [biaUser, setBiaUser] = useState<UserModel>();

    return (
        <BiaUserContext.Provider value={{ biaUser, setBiaUser }}>
            <Routes />
        </BiaUserContext.Provider>
    );
};

export default App;
