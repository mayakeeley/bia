import React, { useEffect, useRef } from "react";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { mauvelous, azalea, black } from "../../theme";
import { getBiaUser } from "utils/localstorage";

const Message: React.FC<{
    message: any;
    chattingWithUser: any;
}> = ({ message, chattingWithUser }) => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            message: {
                display: "flex",
                padding: "1em",
                width: "90%",
            },
            image: {
                borderRadius: "50%",
                width: "3em",
                height: "3em",
                marginRight: "1em",
                marginTop: "2.5em",
            },
            sentMessage: {
                "& $messageContent": {
                    backgroundColor: mauvelous,
                    borderRadius: "1em 1em 0 1em",
                },
                "& $image": {
                    marginLeft: "1em",
                    marginRight: "0",
                },
                flexDirection: "row-reverse",
                float: "right",
                width: "92%",
            },
            receivedMessage: {
                "& $messageContent": {
                    backgroundColor: azalea,
                    borderRadius: "1em 1em 1em 0",
                },
                width: "92%",
                float: "left",
            },
            messageContent: {
                display: "inline",
                color: black,
                boxShadow: "0.1em 0.25em 0.25em rgba(0, 0, 0, 0.08)",
                padding: "2em 1em 0 1em",
                width: "85%",
            },
        })
    );
    const classes = useStyles();
    const sendingUser = message.userId;
    const biaUser = getBiaUser();
    const date = new Date(message.timestamp).toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
    });
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [message]);

    const joinAllClasses = (...classes) => {
        return classes.join(" ");
    };
    return (
        <div
            className={joinAllClasses(
                classes.message,
                sendingUser === biaUser?.uid
                    ? classes.sentMessage
                    : classes.receivedMessage
            )}
        >
            <img
                className={classes.image}
                src={
                    sendingUser === biaUser?.uid
                        ? biaUser?.photoUrl
                        : chattingWithUser.photoUrl
                }
                alt="user profile pic"
            />
            <div className={classes.messageContent}>
                <Typography variant="subtitle2">
                    {" "}
                    {message.messageContent}{" "}
                </Typography>
                <Typography variant="body1" style={{ float: "right" }}>
                    {date}
                </Typography>
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
};

export default Message;
