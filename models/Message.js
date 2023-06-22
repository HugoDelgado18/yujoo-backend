const { sequelize, DataTypes } = require('../api/db');
const { User } = require('./User');

const Message = sequelize.define('Message', {
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        }
    }
})

module.exports = Message;