const { Model } = require('sequelize');
const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Price = sequelize.define('price', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    fuelType: {
        type: Sequelize.ENUM,
        values: ['PB95', 'PB98', 'ON', 'LPG']
    },
    date: Sequelize.DATEONLY,
    value: Sequelize.FLOAT
});

module.exports = Price;