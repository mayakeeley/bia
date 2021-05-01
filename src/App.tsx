import * as React from "react";
import Container from "@material-ui/core/Container";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Routes from "./routes/Routes";
import { azalea } from "theme";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appWrapper: {
            maxWidth: "768px",
            maxHeight: "1024px",
            padding: 0,
        },
        nonMobileWrapper: {
            minWidth: "100vw",
            minHeight: "100vh",
            backgroundColor: azalea,
            padding: 0,
            display: "flex",
            justifyContent: "flex-end",
        },
    })
);
const App: React.FC = () => {
    const classes = useStyles();
    return (
        <Container className={classes.nonMobileWrapper}>
            <Container className={classes.appWrapper}>
                <Routes />
            </Container>
        </Container>
    );
};

export default App;
