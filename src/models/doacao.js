const { randomUUID } = require('node:crypto');
const { Sequelize } = require('sequelize');
const db = require('../db');

module.exports = db.define('doacao', {
    id_doacao: {
        type: Sequelize.STRING,
        defaultValue: randomUUID(),
        primaryKey: true,
        allowNull: false
    },

    tipo: {
        type: Sequelize.STRING,
        allowNull: false,
        // validate: {
        //     max: 50
        // }
    },

    quantidade: {
        type: Sequelize.STRING,
        allowNull: false,
        // validate: {
        //     max: 50
        // }
    },

    entregue: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }
}).belongsTo(db.models.usuario);