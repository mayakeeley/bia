import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { jordyBlue, lavenderBlush, grey, white } from "../../theme";
import mockData from "../../assets/mockData/MockData";
import { useHistory } from "react-router-dom";
import { getBiaUser } from "utils/localstorage";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        messages: {
            backgroundColor: jordyBlue,
            minHeight: "100vh",
        },
        message: {
            backgroundColor: lavenderBlush,
            boxShadow: "0.1em 0.25em 0.25em rgba(0, 0, 0, 0.08)",
            display: "flex",
            borderRadius: "1em",
            padding: "1em",
            marginTop: "1em",
        },
        photo: {
            borderRadius: "50%",
            width: "4em",
            height: "4em",
            marginRight: "1em",
        },
        content: {
            color: grey,
        },
        heading: {
            display: "flex",
            justifyContent: "space-between",
        },
        text: {
            width: "100%",
        },
        blockSpacing: {
            padding: "1em",
        },
        title: {
            color: white,
            paddingBottom: "1em",
        },
    })
);

const Messages: React.FC = () => {
    const history = useHistory();
    const classes = useStyles();
    const biaUser = getBiaUser();
    const matches = mockData.matches.filter((match) =>
        match.userIds.includes(biaUser?.uid || "")
    );
    const users = mockData.users.filter(
        (mockUser) => mockUser.uid !== biaUser?.uid
    );
    const messages = matches.map((match, index) => {
        const userId = match.userIds.find(
            (matchedUser) => matchedUser !== biaUser?.uid
        );
        const matchedUser = users.find((user) => user.uid === userId);
        const mostRecentMessage = match.messages.length
            ? match.messages[match.messages.length - 1]
            : undefined;
        const date = mostRecentMessage
            ? mostRecentMessage.timestamp
            : match.timestamp;
        const shortDate = new Date(date).toLocaleDateString(undefined, {
            weekday: "short",
        });
        return (
            <div
                className={classes.message}
                key={index}
                onClick={() => history.push(`/chat/${matchedUser?.uid}`)}
            >
                <img
                    className={classes.photo}
                    src={matchedUser?.photoUrl}
                    alt=""
                />
                <div className={classes.text}>
                    <div className={classes.heading}>
                        <Typography variant="h5" data-testid="welcome-title">
                            {matchedUser?.name}
                        </Typography>
                        <Typography variant="body1" data-testid="welcome-title">
                            {shortDate}
                        </Typography>
                    </div>
                    <Typography
                        className={classes.content}
                        variant="body1"
                        data-testid="welcome-title"
                    >
                        {mostRecentMessage
                            ? mostRecentMessage.messageContent
                            : "New match!"}
                    </Typography>
                </div>
            </div>
        );
    });
    const displayedMessages = messages.length ? (
        messages
    ) : (
        <Typography
            className={classes.title}
            variant="body1"
            data-testid="welcome-title"
        >
            You have no matches yet, better get swiping!
        </Typography>
    );
    return (
        <div className={classes.messages}>
            <div className={classes.blockSpacing}>
                <Typography
                    className={classes.title}
                    variant="h3"
                    data-testid="welcome-title"
                >
                    Messages
                </Typography>
                {displayedMessages}
            </div>
            <NavBar />
        </div>
    );
};

export default Messages;
