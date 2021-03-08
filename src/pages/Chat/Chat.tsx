import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  createStyles,
  Grid,
  Link,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { jordyBlue, white, lavenderBlush } from "../../theme";
import { UserModel } from "../../models/user.model";
import mockData from "../../assets/mockData/MockData";
import Message from "components/Message/Message";
import PhoneIcon from "../../assets/icons/phone-call.svg";
import VideoCameraIcon from "../../assets/icons/video-camera.svg";
import SendArrowIcon from "../../assets/icons/forward-arrow.svg";
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
        maxHeight: "100%",
        maxWidth: "100%",
      },
      body: {
        maxWidth: "100%",
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
        paddingLeft: "0",
        paddingRight: "0",
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
      whistleIcon: {
        width: "1.5em",
        height: "1.5em",
      },
      phoneIcon: {
        width: "1.5em",
        height: "1.5em",
      },
      sendArrow: {
        width: "2em",
        height: "2em",
      },
      backArrowIcon: {
        width: "1.5em",
        height: "1.5em",
        marginTop: "1em",
        marginBottom: "-1.8em",
        marginLeft: "0.75em",
      },
      sendMessage: {
        //maxWidth: "95%",
      },
      messageInput: {
        //maxWidth: "80%",
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
      <Button onClick={() => history.goBack()}>
        <img
          src={BackArrowIcon}
          alt="Back arrow icon"
          className={classes.backArrowIcon}
        />
      </Button>
      <Typography variant="h3" className={classes.title}>
        {chattingWithUser?.name}
      </Typography>
      <img
        src={WhistleIcon}
        alt="whistle icon"
        className={classes.whistleIcon}
      />
      <img src={PhoneIcon} alt="call icon" className={classes.phoneIcon} />
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
        <Grid item xs={12} className={classes.sendMessage}>
          <TextField
            className={classes.messageInput}
            id="message"
            name="Message"
            inputProps={{
              "data-testid": `create-profile-goal-1`,
            }}
            variant={"outlined"}
            size="small"
            value={message?.messageContent}
            onChange={(e) =>
              setMessage({
                ...message,
                timestamp: Date.now().toString(),
                messageContent: e.target.value,
              })
            }
          />
          <Button onClick={sendMessage}>
            <img
              src={SendArrowIcon}
              alt="send button icon"
              className={classes.sendArrow}
            />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
