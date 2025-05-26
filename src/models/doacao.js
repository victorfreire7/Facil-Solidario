const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

module.exports = db.define('doacao', {
    id_doacao: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },

    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            max: 50
        }
    },

    quantidade: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            max: 50
        }
    },

    entregue: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },

})
// .belongsTo(db.models.usuario, { foreignKey: this.id_doacao });