import { Redirect, Route } from "react-router-dom";
import { getBiaUser } from "./localstorage";

const PublicRoute = ({ component: Component, ...rest }) => {
    const biaUser = getBiaUser();
    return (
        <Route
            {...rest}
            render={(props) =>
                biaUser ? <Redirect to="/matches" /> : <Component {...props} />
            }
        ></Route>
    );
};
export default PublicRoute;
