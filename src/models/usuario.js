const { DataTypes } = require('sequelize');
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
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
            len: {
                args: [1, 100]
            }
        }
    },

    email: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
        unique: true
    },

    senha_hash: {
        type: DataTypes.STRING,
        defaultValue: ''
    },

    senha: {
        type: DataTypes.VIRTUAL, // um dado primitivo "virtual" nao altera o banco de dados.
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