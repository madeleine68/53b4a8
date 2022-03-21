const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const Group = require('./group');

// associations

User.belongsToMany(Conversation, { through: Group});
Conversation.belongsToMany(User, { through: Group});
Message.belongsTo(Conversation);
Conversation.hasMany(Message);
Conversation.hasMany(Message, { as: "readMessages" });
Conversation.hasMany(Message, { as: "unreadMessages" });


module.exports = {
  User,
  Conversation,
  Message,
  Group
};
