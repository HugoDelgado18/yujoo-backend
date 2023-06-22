const { sequelize } = require('../api/db');
const { User } = require('./User');
// const Friend = require('./Friend');
// const Message = require('./Message');
const Event = require('./Event');
const Comment = require('./Comment');

// User.belongsTo(Message);
// Message.hasMany(User);
// Event.belongsTo(User, { foreignKey: "user_id" });
// User.hasMany(Event);
Comment.belongsTo(Event);
Event.hasMany(Comment);
User.belongsToMany(Event, { through: "User_Events" });
Event.belongsToMany(User, { through: "User_Events" });

module.exports = { 
    User,
    Event,
    Comment,
    sequelize,
 };