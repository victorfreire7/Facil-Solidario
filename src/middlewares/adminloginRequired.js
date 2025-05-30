require("dotenv").config();
const bcryptjs = require('bcryptjs');
const adminRepository = require('../models/admin');

module.exports = async function (req, res, next) { // MUDEI AQUI, FIZ NAO SER MAIS UA ARROW FUNCITON
    if(!req.session.admin){
        res.json('login necessario');
        res.redirect('/');
    }

    const admin = await adminRepository.findByPk(req.session.admin.id_admin);

    console.log(admin.dataValues.senha_hash);
    console.log('-------------------')
    console.log(req.session.admin.senha_hash)

    await bcryptjs.compare(admin.dataValues.senha_hash, req.session.admin.senha_hash)
            .then((result) => {
                if(!result){
                    return res.json('render 404');
                }
            }); // PAREI AQUI
    next();
}