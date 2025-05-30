const { DataTypes } = require('sequelize');
const db = require('../db');
const doacaoRepository = require('./doacao');

const Admin = db.define('admin', {
    id_admin: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },

    login: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
        unique: true,
    },

    senha_hash: {
        type: DataTypes.STRING,
        defaultValue: ''
    }

});

Admin.hasMany(doacaoRepository);

module.exports = Admin;