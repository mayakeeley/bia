import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useBiaUserContext } from "AppContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { biaUser } = useBiaUserContext();
    return (
        <Route
            {...rest}
            render={(props) =>
                biaUser?.uid !== "string" ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            }
        ></Route>
    );
};
export default PrivateRoute;
