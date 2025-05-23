const { randomUUID } = require('node:crypto'); 
console.log(randomUUID());

const { Sequelize } = require('sequelize');
const db = require('../db');

module.exports = db.define('client', {
    id: {
        type: Sequelize.STRING,
        defaultValue: randomUUID(),
        primaryKey: true,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});
