const { Model } = require('sequelize');
const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Station = sequelize.define('station', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    postalCode: Sequelize.STRING,
    city: Sequelize.STRING,
    street: Sequelize.STRING
});

module.exports = Station;