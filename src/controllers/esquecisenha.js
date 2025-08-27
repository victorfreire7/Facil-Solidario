require('dotenv').config();
const UsuarioRepository = require('../models/usuario');
const validator = require('validator');
const sgMail = require('@sendgrid/mail');
const randomStringGenerator = require('random-string-generator');
const bcryptjs = require('bcryptjs');

function index(req, res) {
    res.render('esquecisenha', { csrfToken: req.csrfToken() });
}

async function store(req, res) {
    try {
        if(!validator.isEmail(req.body.email)){ // crio uma verificação de caso o e-mail seja valido.
            return res.json('Por favor, digite um E-mail válido!');
        }

        await UsuarioRepository.findOne({ // vejo se existe realmente um cadastro com o email enviado.
            where: {
                email: req.body.email
            }
        })
        .then((result) => {
            if(!result) {
                return res.json('E-mail não encontrado no banco de dados!');
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
            from: 'victr.hf@gmail.com',
            subject: `CÓDIGO PARA ALTERAR SENHA FÁCIL SOLIDÁRIO`,
            text: 
                `
                Seu código para alteração da sua senha é: 
        
                \n \n \n
        
                <strong>${req.session.authCode}</strong>   
                `
        });

        res.redirect('/forget-password/change-password');
    } catch (error) {
        res.json(error);
    }
}


/* 
    essa página vai receber 2 requisiçoes,
    codigo
    senha
*/
function changePassIndex(req, res) { 
    res.render('esquecisenhaChange', { csrfToken: req.csrfToken() });
}

async function changePassUpdate(req, res) {
    try {

        if(req.body.code != req.session.authCode){
            return res.json('código incorreto');
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

            res.json('senha alterada!');
        })

    } catch (error) {
        res.json('ERRO AQUI Ó' + error);
    }
}

module.exports = { index, store, sendCode, changePassIndex, changePassUpdate }