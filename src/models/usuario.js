const { randomUUID } = require('node:crypto');
const { Sequelize } = require('sequelize');
const doacaoRepository = require('./doacao');
const db = require('../db');
const bcryptjs = require('bcryptjs');

db.addHook('beforeSave', async user => {
    if (user.senha) { // isso é oque criptografa a senha.
        user.senha_hash = await bcryptjs.hash(user.senha, 8);
    }
});

const User = db.define('usuario', {
    id_usuario: {
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

    senha_hash: {
        type: Sequelize.STRING,
        defaultValue: ''
    },

    senha: {
        type: Sequelize.VIRTUAL, // um dado primitivo "virtual" nao altera o banco de dados.
        allowNull: false,
        defaultValue: '',
        validate: {
            len: {
                args: [8, 50]
            }
        }
    }
});

User.hasMany(doacaoRepository);
doacaoRepository.belongsTo(User);

module.exports = User;