const Sequelize = require('sequelize');

const sequelize = new Sequelize('dopelna-db', 'root', 'admin', 
{dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;