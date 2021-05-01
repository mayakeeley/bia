import React from "react";
import { createStyles, makeStyles, Paper, Typography } from "@material-ui/core";
import { lavenderBlush, grey } from "../../theme";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() =>
  createStyles({
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
      "&>p ": {
        textDecoration: "none",
      },
    },
    text: {
      width: "100%",
      textDecoration: "none",
    },
  })
);

interface MessageProps {
  name: string;
  photoUrl: string;
  shortDate: string;
  messageText: string;
  key: number;
  matchId: string;
}

const Message: React.FC<MessageProps> = ({
  name,
  photoUrl,
  shortDate,
  messageText,
  key,
  matchId,
}) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Paper
      onClick={() => history.push(`/chat/${matchId}`)}
      className={classes.message}
      component="a"
      key={key}
    >
      <img className={classes.photo} src={photoUrl} alt="" />
      <div className={classes.text}>
        <div className={classes.heading}>
          <Typography variant="h5" data-testid="welcome-title">
            {name}
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
          {messageText}
        </Typography>
      </div>
    </Paper>
  );
};

export default Message;
