const { randomUUID } = require('node:crypto');
const { Sequelize } = require('sequelize');
const usuarioModel = require('./doacao');
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
        defaultValue: '',
        allowNull: false,
        validate: {
            max: 50
        }
    },

    quantidade: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        allowNull: false,
        validate: {
            max: 50
        }
    },

    entregue: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },

    userId: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        references: {
            model: 'usuario',
            key: 'id_usuario'
        }
    }
}).belongsTo(usuarioModel, { foreignKey: "userId" });