import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { createStyles, makeStyles, Typography } from "@material-ui/core";
import { jordyBlue, lavenderBlush, grey, white } from "../../theme";
import { firestore } from "../../firebase";
import { MatchModel } from "models/match.model";
import Message from "./Message";
import { getBiaUser } from "utils/localstorage";

const useStyles = makeStyles(() =>
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
  const classes = useStyles();
  const biaUser = getBiaUser();
  const [matches, setMatches] = useState<MatchModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsersMatches = () => {
    firestore
      .collection("Matches")
      .where("userIds", "array-contains", biaUser?.uid)
      .onSnapshot(
        {
          includeMetadataChanges: true,
        },
        (querySnapshot) => {
          const docMatches = querySnapshot.docs.map((doc) =>
            doc.data()
          ) as MatchModel[];
          setMatches(docMatches);
          setIsLoading(false);
        }
      );
  };

  useEffect(() => {
    fetchUsersMatches();
  }, [isLoading]);

  const messages = matches.map((match, index) => {
    const user = match.userDetails.find(
      (matchedUser) => matchedUser.uid !== biaUser?.uid
    );

    const displayedMessage =
      match.messages.length > 0
        ? match.messages[match.messages.length - 1]
        : { timestamp: match.timestamp, messageContent: "New match!" };

    const shortDate = displayedMessage
      ? new Date(displayedMessage?.timestamp).toLocaleDateString(undefined, {
          weekday: "short",
        })
      : "Unknown";

    return (
      user && (
        <Message
          name={user.name}
          photoUrl={user.photoUrl}
          shortDate={shortDate}
          messageText={displayedMessage?.messageContent || ""}
          key={index}
          matchId={match.matchId}
        />
      )
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
