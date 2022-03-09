import React, { useEffect, useRef } from 'react';
import { Box } from '@material-ui/core';
import { SenderBubble, OtherUserBubble } from '.';
import moment from 'moment';

const Messages = (props) => {
  const { messages, otherUser, userId } = props;

  // const latestMessage = useRef(null);
  // const handleScroll = () => {
  //   latestMessage.current?.scrollIntoView({ behavior: "smooth" })
  // }

  // useEffect(() => {
  //   handleScroll();
  // },[messages])

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format('h:mm');
        console.log(message.text)

        return (message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        ));
      })}
    </Box>
  );
};

export default Messages;
