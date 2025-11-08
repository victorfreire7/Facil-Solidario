require('dotenv').config();
const UsuarioRepository = require('../models/usuario');
const validator = require('validator');
const sgMail = require('@sendgrid/mail');
const randomStringGenerator = require('random-string-generator');
const bcryptjs = require('bcryptjs');

function index(req, res) {
    res.render('esquecisenha', 
        { 
            csrfToken: req.csrfToken(), 
            successMessage: req.flash('successMessage'),
            errorMessage: req.flash('errorMessage'),
            popupMessage: false,
        }
    );
}

async function store(req, res) {
    try {
        if(!validator.isEmail(req.body.email)){ // crio uma verificação de caso o e-mail seja valido.
            req.flash('errorMessage', ['Por favor, digite um E-mail válido!']);
            return res.redirect('/forget-password'); 
        }

        await UsuarioRepository.findOne({ // vejo se existe realmente um cadastro com o email enviado.
            where: {
                email: req.body.email
            }
        })
        .then((result) => {
            if(!result) {
                req.flash('errorMessage', ['E-mail não encontrado!']);
                return res.redirect('/forget-password'); 
            }
        });

        req.session.email = req.body.email
        res.redirect('/forget-password/code')

    } catch (error) {
        res.json(error);
    }
}

function sendCode(req, res) {   
    try {
        req.session.authCode = randomStringGenerator(6).toUpperCase(); // gero o codigo e adiciono em uma sessao 

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        sgMail.send({
            to: req.session.email,
            from: process.env.SENDGRID_API_EMAIL,
            subject: `CÓDIGO PARA ALTERAR SENHA FÁCIL SOLIDÁRIO`,
            text: 
                `
                Seu código para alteração da sua senha é: 
        
                \n \n \n
        
                <strong>${req.session.authCode}</strong>   
                `
        });

        req.flash('successMessage', ['Código enviado! Verifique sua caixa de spam.']);
        return res.redirect('/forget-password/change-password');
    } catch (error) {
        req.flash('errorMessage', ['Ocorreu um erro ao enviar o E-mail! tente novamente mais tarde.']);
        return res.redirect('/forget-password');
    }
}


/* 
    essa página vai receber 2 requisiçoes,
    codigo
    senha
*/
function changePassIndex(req, res) { 
    res.render('esquecisenhaChange', 
        { 
            csrfToken: req.csrfToken(), 
            successMessage: req.flash('successMessage'),
            errorMessage: req.flash('errorMessage')
        }
    );
}

async function changePassUpdate(req, res) {
    try {

        if(req.body.code != req.session.authCode){
            req.flash('errorMessage', ['Código incorreto!']);
            return res.redirect('/forget-password');
        }

        const user = await UsuarioRepository.findOne({
            where: {
                email: req.session.email
            }
        })
        await user.update({
            senha_hash: await bcryptjs.hash(req.body.senha, 8)
        })
        .then(() => {

            req.session.authCode = false;
            req.session.email = false;

            req.flash('successMessage', ['Senha alterada com sucesso!']);
            return res.redirect('/sign-in');
        })

    } catch (error) {
        req.flash('errorMessage', ['Um erro inesperado aconteceu. Tente novamente mais tarde.']);
        return res.redirect('/forget-password');
    }
}

module.exports = { index, store, sendCode, changePassIndex, changePassUpdate }