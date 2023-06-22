const { sequelize, DataTypes } = require('../api/db');

const Friend = sequelize.define("friend", {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: sequelize.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      allowNull: false,
    },
    friendId: {
      type: sequelize.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      allowNull: false,
    },
  });

module.exports = Friend;