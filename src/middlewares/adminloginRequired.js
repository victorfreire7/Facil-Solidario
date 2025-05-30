require("dotenv").config();
const adminRepository = require('../models/admin');

module.exports = async function (req, res, next) { // MUDEI AQUI, FIZ NAO SER MAIS UA ARROW FUNCITON
    if(!req.session.admin){
        res.json('login necessario');
        res.redirect('/');
    }

    await adminRepository.findOne()
    .then((result) => {
        if(result.login != req.session.admin.login){ // verifico se as informações do BD coincidem.
            res.json('redirecionando pra pag 404');
        }
    })
    next();
}