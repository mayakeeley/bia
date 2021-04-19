import React, { createRef, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  createStyles,
  Grid,
  Input,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { jordyBlue, white, lavenderBlush, mauvelous } from "../../theme";
import { UserModel } from "../../models/user.model";
import mockData from "../../assets/mockData/MockData";
import Message from "components/Message/Message";
import SendArrowIcon from "../../assets/icons/send-button.svg";
import BackArrowIcon from "../../assets/icons/back-arrow.svg";
import WhistleIcon from "../../assets/icons/whistle.svg";
import { useParams } from "react-router-dom";
import { MessageModel } from "models/message.model";
import NavBar from "components/NavBar/NavBar";
interface RouteParams {
  id: string;
}

const Chat: React.FC<{ user: UserModel }> = ({ user }) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      wrapper: {
        backgroundColor: jordyBlue,
        marginBottom: "4.5em",
        height: "calc(100vh - 4.5em)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      },
      heading: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "1em",
      },
      body: {
        width: "100%",
        backgroundColor: lavenderBlush,
        marginTop: "2em",
        marginRight: "0",
        borderRadius: "2em 2em 0 0",
      },
      title: {
        textAlign: "center",
        color: white,
      },
      messages: {
        width: "100%",
        height: "calc(100vh - 13.5em - 49px)",
        minHeight: "calc(100vh - 13.5em - 49px)",
        overflow: "auto",
        paddingLeft: "1em",
        paddingRight: "1em",
        paddingTop: "2em",
      },
      whistleIconButton: {
        width: "1.5em",
        height: "1.5em",
      },
      whistleIcon: {
        width: "1.5em",
        height: "1.5em",
      },
      phoneIconButton: {
        width: "1.5em",
        height: "1.5em",
      },
      phoneIcon: {
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
        "&:hover": {
          backgroundColor: "transparent",
        },
      },
      backArrowIconButton: {},
      buttonWrapper: {
        display: "flex",
      },
      backArrowIcon: {
        width: "1.5em",
        height: "1.5em",
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
        margin: "2em 1em",
      },
      messageInput: {
        height: "100%",
        width: "calc(100% - 4.5em)",
        padding: "0.5em 1em",
      },
    })
  );
  const classes = useStyles();
  const history = useHistory();
  const params = useParams<RouteParams>();
  const chattingWithUser = mockData.users.find((u) => u.uid === params.id);
  const matches = mockData.matches.filter((match) =>
    match.userIds.includes(user.uid)
  );
  const match = matches.find((match) => match.userIds.includes(params.id));

  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [message, setMessage] = useState<MessageModel>({
    // make random uuid
    messageId: "10ksjfelkjj6",
    timestamp: "",
    messageContent: "",
    userId: user.uid,
  });

  useEffect(() => {
    if (match?.messages) {
      setMessages(match?.messages);
    }
  }, [match?.messages]);

  const sendMessage = (e): void => {
    e.preventDefault();
    setMessages([...messages, message]);
    setMessage({ ...message, timestamp: "", messageContent: "" });
  };

  return (
    <div>
      <div className={classes.wrapper}>
        <div className={classes.heading}>
          <Button
            onClick={() => history.goBack()}
            className={classes.backArrowIconButton}
          >
            <img
              src={BackArrowIcon}
              alt="Back arrow icon"
              className={classes.backArrowIcon}
            />
          </Button>
          <Typography variant="h3" className={classes.title}>
            {chattingWithUser?.name}
          </Typography>
          <Button className={classes.whistleIconButton}>
            <img
              src={WhistleIcon}
              alt="whistle icon"
              className={classes.whistleIcon}
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
                <Message
                  key={index}
                  user={user}
                  chattingWithUser={chattingWithUser}
                  message={message}
                />
              );
            })}
          </Grid>
          <Grid item xs={12} className={classes.messageWrapper}>
            <div className={classes.sendMessage}>
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
                    timestamp: new Date(Date.now()).toISOString(),
                    messageContent: e.target.value,
                  })
                }
              />
              <Button
                color="default"
                onClick={sendMessage}
                className={classes.sendButton}
              >
                <img
                  src={SendArrowIcon}
                  alt="send button icon"
                  className={classes.sendArrow}
                />
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
      <NavBar></NavBar>
    </div>
  );
};

export default Chat;
