import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
    Button,
    createStyles,
    Grid,
    Input,
    makeStyles,
    Typography,
} from "@material-ui/core";
import { jordyBlue, white, lavenderBlush, mauvelous } from "../../theme";
import MessageChip from "components/Message/MessageChip";
import SendArrowIcon from "../../assets/icons/send-button.svg";
import BackArrowIcon from "../../assets/icons/back-arrow.svg";
import WhistleIcon from "../../assets/icons/whistle.svg";
import { useParams } from "react-router-dom";
import { MessageModel } from "models/message.model";
import { MatchModel } from "models/match.model";
import { firestore } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { getBiaUser } from "utils/localstorage";

interface RouteParams {
    id: string;
}

const useStyles = makeStyles(() =>
    createStyles({
        wrapper: {
            backgroundColor: jordyBlue,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100vh",
        },
        heading: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1em 0 1em 0",
            backgroundColor: jordyBlue,
            width: "100%",
        },
        body: {
            width: "100%",
            backgroundColor: lavenderBlush,
            marginRight: "0",
            borderRadius: "2em 2em 0 0",
            paddingTop: "2em",
        },
        title: {
            textAlign: "center",
            color: white,
        },
        messages: {
            width: "100%",
            overflow: "auto",
            paddingLeft: "1em",
            paddingRight: "1em",
            minHeight: "calc(100vh - 206px)",
            maxHeight: "calc(100vh - 206px)",
        },
        icons: {
            width: "1.5em",
            height: "1.5em",
        },
        sendArrow: {
            width: "2em",
            height: "1.5em",
            fill: mauvelous,
        },
        sendButton: {
            margin: "0.5em 0",
            height: "auto",
            width: "1.5em",
        },
        messageWrapper: {
            width: "100%",
            justifyContent: "center",
        },
        sendMessage: {
            backgroundColor: white,
            border: "1px solid",
            borderColor: mauvelous,
            borderRadius: "1em",
            margin: "1em 2em 2em 2em",
        },
        messageInput: {
            height: "100%",
            width: "calc(100% - 4.5em)",
            padding: "0.5em 1em",
        },
    })
);

const Chat: React.FC = () => {
    const biaUser = getBiaUser();
    const classes = useStyles();
    const history = useHistory();
    const { id } = useParams<RouteParams>();

    const [isLoading, setIsLoading] = useState(true);
    const [messages, setMessages] = useState<MessageModel[]>([]);
    const [match, setMatch] = useState<MatchModel>();
    const [message, setMessage] = useState<MessageModel>({
        messageId: uuidv4(),
        timestamp: "",
        messageContent: "",
        userId: biaUser?.uid || "",
    });

    const fetchMatchById = (id: string) => {
        firestore
            .collection("Matches")
            .doc(id)
            .onSnapshot(
                {
                    includeMetadataChanges: true,
                },
                (doc) => {
                    doc.data() && setMatch(doc.data() as MatchModel);
                    setIsLoading(false);
                }
            );
    };

    const otherUser = match?.userDetails.find(
        (user) => user.uid !== biaUser?.uid
    );

    useEffect(() => {
        fetchMatchById(id);
    }, [isLoading, id]);

    useEffect(() => {
        if (match?.messages) {
            setMessages(match?.messages);
        }
    }, [match?.messages]);

    const postMessage = (newMessage: MessageModel) => {
        firestore
            .collection("Matches")
            .doc(id)
            .set({ ...match, messages: [...messages, newMessage] });
    };

    const sendMessage = (e): void => {
        e.preventDefault();

        postMessage(message);
        setMessages([...messages, message]);
        setMessage({ ...message, timestamp: "", messageContent: "" });
    };

    return (
        <div>
            <div className={classes.wrapper}>
                <div className={classes.heading}>
                    <Button
                        onClick={() => history.goBack()}
                        className={classes.icons}
                    >
                        <img
                            src={BackArrowIcon}
                            alt="Back arrow icon"
                            className={classes.icons}
                        />
                    </Button>
                    <Typography variant="h3" className={classes.title}>
                        {otherUser?.name}
                    </Typography>
                    <Button className={classes.icons}>
                        <img
                            src={WhistleIcon}
                            alt="whistle icon"
                            className={classes.icons}
                        />
                    </Button>
                </div>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    spacing={0}
                    className={classes.body}
                >
                    <Grid item xs={12} className={classes.messages}>
                        {messages?.map((message, index) => {
                            return (
                                <MessageChip
                                    key={index}
                                    chattingWithUser={otherUser}
                                    message={message}
                                />
                            );
                        })}
                    </Grid>
                    <Grid item xs={12} className={classes.messageWrapper}>
                        <form className={classes.sendMessage}>
                            <Input
                                className={classes.messageInput}
                                id="message"
                                name="Message"
                                placeholder="Type message here..."
                                disableUnderline={true}
                                value={message?.messageContent}
                                onChange={(e) =>
                                    setMessage({
                                        ...message,
                                        timestamp: new Date(
                                            Date.now()
                                        ).toISOString(),
                                        messageContent: e.target.value,
                                        messageId: uuidv4(),
                                    })
                                }
                            />
                            <Button
                                color="default"
                                type="submit"
                                disabled={message.messageContent.length === 0}
                                onClick={sendMessage}
                                className={classes.sendButton}
                            >
                                <img
                                    src={SendArrowIcon}
                                    alt="send button icon"
                                    className={classes.sendArrow}
                                />
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Chat;
