import React, { FormEvent, useEffect, useState } from "react";
import {Button, createStyles, Grid, makeStyles, TextField, Theme, Typography} from "@material-ui/core";
import {jordyBlue, lavenderBlush, grey, white} from "../../theme";
import {UserModel} from "../../models/user.model";
import mockData from "../../assets/mockData/MockData";
import Message from "components/Message/Message"
import { useParams } from 'react-router-dom';
import { MessageModel } from "models/message.model";
interface RouteParams {
    id: string
}

const Chat: React.FC<{ user: UserModel }> = ({user}) => {
    const useStyles = makeStyles((theme: Theme) =>
		createStyles({
          title: {
              textAlign: 'center',
          },
          content: {
              maxWidth: '100%',
          },
        })
    );
    const classes = useStyles();
    const params = useParams<RouteParams>();
    const chattingWithUser = mockData.users.find(u => u.uid === params.id);
    const matches = mockData.matches.filter(match => match.userIds.includes(user.uid));
    const match = matches.find(match => match.userIds.includes(params.id))

    const [messages, setMessages] = useState<MessageModel[]>([]);
    const [message, setMessage] = useState<MessageModel>({
        messageId: "10ksjfelkjj6",
        timestamp: "",
        messageContent: "",
        userId: user.uid
    });

    useEffect(() => {
        if(match?.messages){
            setMessages(match?.messages);
        }
    }, [match?.messages])

    const sendMessage = (e):void => {
        e.preventDefault();
        setMessages([...messages, message]);
        setMessage({...message, timestamp: "", messageContent: ""});
    }
    
    return <> 
        <Typography variant="h3" className={classes.title}>{chattingWithUser?.name}</Typography>
        <Grid container direction="column" alignItems="center" spacing={1}>
            <Grid item lg={1}>
                <Button>Video call me</Button>
            </Grid>
            <Grid item lg={1}>
                {messages?.map((message, index) => {
                    return <div className={classes.content}>
                        <Message key={index} user={user} chattingWithUser={chattingWithUser} message={message}/>
                    </div>
                })}
            </Grid>
        <Grid item lg={1}>
          <TextField
            id="message"
            name="Message"
            inputProps={{
              "data-testid": `create-profile-goal-1`,
            }}
            variant={"outlined"}
            size="small"
            value={message?.messageContent}
            onChange={(e) => setMessage({
                ...message, timestamp: "2021-08-02T22:59", messageContent: e.target.value
            })}
          />
          <Button onClick={sendMessage}>send</Button>
        </Grid>
        </Grid>
    </>
};

export default Chat;