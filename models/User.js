const { sequelize, DataTypes } = require('../api/db');

const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    job: {
        type: DataTypes.STRING,
        allowNull: false
    },
    about: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hobbies: {
        type: DataTypes.STRING,
        allowNull: false
    },
    distancePreference: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    profilePicture: {
        type: DataTypes.STRING,
        defaultValue: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTfei884VzPFy3FShvUo3QOWhdufOlUy55zJr-yLz5_qs_wW3fy"
    }

})

module.exports = { User };