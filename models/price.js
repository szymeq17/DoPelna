const { Model, SequelizeScopeError } = require('sequelize');
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
    value: Sequelize.FLOAT,
    stationName: Sequelize.STRING,
    stationPostalCode: Sequelize.STRING,
    stationCity: Sequelize.STRING,
    stationStreet: Sequelize.STRING,
    stationUser: Sequelize.STRING
});

module.exports = Price;