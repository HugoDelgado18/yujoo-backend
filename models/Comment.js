const { sequelize, DataTypes } = require('../api/db');

const Comment = sequelize.define('Comment', {
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Comment;