require('dotenv').config();
const sgMail = require('@sendgrid/mail');

const adminRepository = require('../models/admin');
const bcryptjs = require('bcryptjs');


async function index(req, res) {
    res.render('adminlogin', 
    { 
        successMessage: req.flash('successMessage'), 
        errorMessage: req.flash('errorMessage'), 
        csrfToken: req.csrfToken() 
    });
}

async function login(req, res) {

    try {
        const admin = await adminRepository.findOne(
            {
                where:
                    {
                        login: req.body.login
                    }
            }
        )
        
        if(!admin){
            req.flash('errorMessage', ['Senha ou ID incorreto.']);
            return res.redirect('/admin-login');
        } else {
            await bcryptjs.compare(req.body.senha, admin.senha_hash)
            .then((result) => {
                 if (result) {
                    req.session.admin = admin;
                    req.flash('successMessage', ['Seja Bem-vindo(a)!']);
                    return res.redirect('/admin'); 
                } else {
                    req.flash('errorMessage', ['Senha ou ID incorreto.']);
                    return res.redirect('/admin-login');
                }
            });
        }

    } catch (error) {
        req.flash('errorMessage', ['Um erro inesperado aconteceu! Tente novamente mais tarde.']);
        return res.redirect('/admin-login');
    }
}

// module.exports = { index, login, sendCode }
module.exports = { index, login }