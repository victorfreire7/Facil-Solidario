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
        req.flash('errorMessage', ['Um erro inesperado aconteceu! Tente novamente mais tarde.']);
        return res.redirect('/admin');
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
            html: 
            `
                <!DOCTYPE html>
                <html lang="pt-BR">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Alterar Senha</title>
                </head>
                <body style="margin: 0; padding: 20px; background-color: #e5e5e5; font-family: Arial, sans-serif;">
                    <div style="background-color: #8fa687; border-radius: 12px; color: #ffffff; text-align: center; padding: 40px 20px; max-width: 400px; margin: 0 auto; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);">
                        <h2 style="font-size: 22px; font-weight: bold; margin-bottom: 25px;">Alterar Senha</h2>
                        
                        <div style="margin-bottom: 25px;">
                            <img src="https://facilsolidario.com.br/assets/img/logo-branca.png" alt="LOGOTIPO" style="width: 90px;" />
                        </div>

                        <div style="font-size: 28px; font-weight: bold; letter-spacing: 10px; background-color: #748e73; color: #ffffff; display: inline-block; padding: 12px 20px; border-radius: 8px; margin-bottom: 25px;">
                            ${req.session.authCode}
                        </div>

                        <p style="font-size: 15px; color: #f1f1f1; line-height: 22px;">
                            Obrigado pela confiança!<br />
                            Insira o código acima para prosseguir na alteração de senha.
                        </p>
                    </div>
                </body>
                </html>
            `,
            text: 
                `
                Seu código para alteração da sua senha é: ${req.session.authCode}   
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
            errorMessage: req.flash('errorMessage'),
            popupMessage: false,
        }
    );
}

async function changePassUpdate(req, res) {
    try {

        if(req.body.senha !== req.body.confirmSenha){ // verifico se os dois inputs sao iguais
            req.flash('errorMessage', ['Senhas não coincidem.']);
            return res.redirect('/sign-up/password');
        }  

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