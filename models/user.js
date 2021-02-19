const { Model } = require('sequelize');
const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nickname: Sequelize.STRING,
    password: Sequelize.STRING,
    points: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = User;