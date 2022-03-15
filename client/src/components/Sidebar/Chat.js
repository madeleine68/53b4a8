import React, { useEffect, useContext } from "react";
import { Box, Badge } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
// import Badge from './Badge';
import axios from "axios";
import { SocketContext } from "../../context/socket";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
  notification: {
    height: 20,
    width: 20,
    backgroundColor: "#3F92FF",
    marginRight: 10,
    color: "white",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: -0.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
}));

const Chat = ({
  conversation,
  setActiveChat,
  activeConversation,
  setConversations,
}) => {
  const classes = useStyles();
  const socket = useContext(SocketContext);

  const { otherUser, unreadMessagesNumber } = conversation;

  const handleClick = async (conversation) => {
    await setActiveChat(conversation.otherUser.username);
  };

  const conversationMessageSeen = unreadMessagesNumber === 0;

  useEffect(() => {
    const markMessageAsRead = async () => {
      if (
        activeConversation === otherUser.username &&
        unreadMessagesNumber > 0
      ) {
        try {
          setConversations((prev) => {
            const totalConversations = [...prev];
            totalConversations.forEach((convo, id) => {
              if (convo.id === conversation.id) {
                const convoCopy = { ...convo };
                const messagesCopy = convoCopy.messages.map((message) => {
                  return { ...message, isRead: true };
                });
                convoCopy.messages = messagesCopy;
                convoCopy.unreadMessagesNumber = 0;
                totalConversations[id] = convoCopy;
              }
            });
            return totalConversations;
          });
          await axios.put("/api/messages", {
            read: true,
            otherUserId: otherUser.id,
            conversationId: conversation.id,
          });
        } catch (error) {
          console.error(error);
        }
      }
    };
    markMessageAsRead();
  }, [
    activeConversation,
    conversation,
    otherUser,
    unreadMessagesNumber,
    setConversations,
    socket,
  ]);

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent
        conversation={conversation}
        isRead={conversationMessageSeen}
      />
      <Badge
        classes={{ badge: classes.notification }}
        badgeContent={unreadMessagesNumber}
      />
    </Box>
  );
};

export default Chat;