import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  createStyles,
  Grid,
  Icon,
  Input,
  Link,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { jordyBlue, white, lavenderBlush, black, mauvelous } from "../../theme";
import { UserModel } from "../../models/user.model";
import mockData from "../../assets/mockData/MockData";
import Message from "components/Message/Message";
import PhoneIcon from "../../assets/icons/phone-call.svg";
import VideoCameraIcon from "../../assets/icons/video-camera.svg";
import SendArrowIcon from "../../assets/icons/send-button.svg";
import BackArrowIcon from "../../assets/icons/back-arrow.svg";
import WhistleIcon from "../../assets/icons/whistle.svg";
import { useParams } from "react-router-dom";
import { MessageModel } from "models/message.model";
interface RouteParams {
  id: string;
}

const Chat: React.FC<{ user: UserModel }> = ({ user }) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      wrapper: {
        backgroundColor: jordyBlue,
      },
      heading: {
        display: "contents",
        width: "fit-content",
      },
      body: {
        width: "100%",
        backgroundColor: lavenderBlush,
        marginTop: "4em",
        marginRight: "0",
        borderRadius: "4em 4em 0 0",
      },
      title: {
        textAlign: "center",
        color: white,
      },
      messages: {
        width: "100%",
        paddingLeft: "1em",
        paddingRight: "1em",
      },
      videoButton: {
        borderRadius: "50%",
        width: "6em",
        height: "6em",
        textAlign: "center",
        marginTop: "-3em",
        marginBottom: "4em",
      },
      videoImageIcon: {
        borderRadius: "50%",
        width: "6em",
        height: "6em",
        backgroundColor: "orange",
        backgroundPosition: "50% 50%",
      },
      whistleIconButton: {
        width: "1.5em",
        height: "1.5em",
        float: "right",
        marginTop: "-1.8em",
      },
      whistleIcon: {
        width: "1.5em",
        height: "1.5em",
      },
      phoneIconButton: {
        width: "1.5em",
        height: "1.5em",
        float: "right",
        marginTop: "-1.8em",
        marginRight: "2.5em",
      },
      phoneIcon: {
        width: "1.5em",
        height: "1.5em",
      },
      sendArrow: {
        width: "2em",
        height: "2em",
        fill: mauvelous,
      },
      sendButton: {
        margin: "0.5em",
        height: "auto",
        float: "right",
      },
      backArrowIconButton: {
        marginBottom: "-0.5em",
      },
      backArrowIcon: {
        width: "1.5em",
        height: "1.5em",
        marginTop: "1em",
        marginBottom: "-1.8em",
        marginLeft: "0.75em",
      },
      messageWrapper: {
        width: "100%",
        justifyContent: "center",
      },
      sendMessage: {
        width: "95%",
        backgroundColor: white,
        border: "1px solid",
        borderColor: mauvelous,
        borderRadius: "1em",
        margin: "4em auto 2em",
      },
      messageInput: {
        width: "80%",
        height: "100%",
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
        <Button className={classes.phoneIconButton}>
          <img src={PhoneIcon} alt="call icon" className={classes.phoneIcon} />
        </Button>
      </div>
      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={0}
        className={classes.body}
      >
        <Grid item xs={12}>
          <Button className={classes.videoButton}>
            <img
              src={VideoCameraIcon}
              className={classes.videoImageIcon}
              alt="video camera icon"
            />
          </Button>
        </Grid>
        <Grid item xs={12} className={classes.messages}>
          {messages?.map((message, index) => {
            return (
              <div>
                <Message
                  key={index}
                  user={user}
                  chattingWithUser={chattingWithUser}
                  message={message}
                />
              </div>
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
  );
};

export default Chat;
