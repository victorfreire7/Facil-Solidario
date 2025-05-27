const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');
const doacaoRepository = require('./doacao');
const bcryptjs = require('bcryptjs');

// db.addHook('beforeSave', async user => {
//     if (user.senha) {
//         user.senha_hash = await bcryptjs.hash(user.senha, 8);
//     }
// })

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
    },

    // senha: {
    //     type: Sequelize.VIRTUAL,
    //     allowNull: false,
    //     defaultValue: '',
    //     validate: {
    //         len: {
    //             args: [8, 50]
    //         }
    //     }
    // }

});

Admin.hasMany(doacaoRepository);
doacaoRepository.belongsTo(Admin);

module.exports = Admin;