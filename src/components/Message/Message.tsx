import mockData from "assets/mockData/MockData";
import React from "react";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import {
  jordyBlue,
  lavenderBlush,
  mauvelous,
  grey,
  white,
  black,
} from "../../theme";
import { UserModel } from "../../models/user.model";

const Message: React.FC<{
  user: UserModel;
  message: any;
  chattingWithUser: any;
}> = ({ user, message, chattingWithUser }) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      message: {
        display: "flex",
        padding: "1em",
        width: '95%',
        justifyContent: 'center',
      },
    image: {
        borderRadius: "50%",
        width: "4em",
        height: "4em",
        marginRight: "1em",
        marginTop: "1em",
      },
      sentMessage: {
        '& $messageContent': {
            backgroundColor: mauvelous,
            borderRadius: "1em 1em 0 1em",
        },
        '& $image': {
            marginLeft: '1em',
        },
        flexDirection: 'row-reverse',
      },
      receivedMessage: {
          '& $messageContent': {
               backgroundColor: lavenderBlush,
               borderRadius: "1em 1em 1em 0",
          }
      },
      messageContent: {
        color: black,
        boxShadow: "0.1em 0.25em 0.25em rgba(0, 0, 0, 0.08)",
        display: "flex",
        padding: "1em",
        width: "85%",
      },
    })
  );
  const classes = useStyles();
  const sendingUser = message.userId;
  const joinAllClasses = (...classes) => {
    return classes.join(" ");
  };
  return (
    <div className={joinAllClasses(classes.message,       
        sendingUser === user.uid
            ? classes.sentMessage
            : classes.receivedMessage
        )}>
      <img
        className={classes.image}
        src={
          sendingUser === user.uid ? user.photoUrl : chattingWithUser.photoUrl
        }
        alt="user profile pic"
      />
      <div
        className={
          classes.messageContent}
      >
        <p> {message.messageContent} </p>
      </div>
    </div>
  );
};

export default Message;
