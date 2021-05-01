import { Redirect, Route } from "react-router-dom";
import { getBiaUser } from "./localstorage";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const biaUser = getBiaUser();
    return (
        <Route
            {...rest}
            render={(props) =>
                biaUser ? <Component {...props} /> : <Redirect to="/" />
            }
        ></Route>
    );
};
export default PrivateRoute;
