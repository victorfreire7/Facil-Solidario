const { randomUUID } = require('node:crypto'); 
const { Sequelize } = require('sequelize');
const db = require('../db');

module.exports = db.define('usuario', {
    id: {
        type: Sequelize.STRING,
        defaultValue: randomUUID(),
        primaryKey: true,
        allowNull: false,
    },

    nome: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
            len: {
                args: [1, 100]
            }
        }
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        unique: true,
        validate: {
            isEmail: {
                args: true,
                msg: 'E-mail inválido.'
            },
            max: 50
        },

    },

    telefone: {
        type: Sequelize.STRING, 
        allowNull: false,
        defaultValue: '',
        unique: true
    },

    senha: {
        type: Sequelize.STRING, 
        allowNull: false,
        defaultValue: '', 
        validate: {
            len: {
                args: [8, 50]
            },
        }
    },
});

