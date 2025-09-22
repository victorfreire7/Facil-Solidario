require('dotenv').config();
const randomStringGenerator = require('random-string-generator');
const UsuarioRepository = require('../models/usuario');
const validator = require('validator');

function index (req, res){
    res.render('cadastro', 
        { 
            csrfToken: req.csrfToken(), 
            successMessage: req.flash('successMessage'), 
            errorMessage: req.flash('errorMessage') 
        }
    ); // aqui seria a renderização do EJS
}

async function store (req, res){
    try {
        await UsuarioRepository.findOne({ //executo um método que procura um valor no BD e retorna um dado BOOLEAN
            where: {
                email: req.body.email // envio como argumento o input de email
            }
        }).then((result) => { 
            if(result)
            {
                req.flash('errorMessage', ['E-mail já utilizado!']);
                return res.redirect('/sign-up'); 
            }  
            else 
            {
                if(!validator.isEmail(req.body.email))
                { // crio uma verificação de caso o e-mail seja valido.
                    req.flash('errorMessage', ['Por favor, digite um E-mail válido!']);
                    return res.redirect('/sign-up');
                } 
                else if(!validator.isMobilePhone(req.body.telefone, 'pt-BR'))
                { // crio uma verificação de caso o telefone celular seja valido.
                    req.flash('errorMessage', ['Por favor, digite um Telefone válido!!!']);
                    return res.redirect('/sign-up');// TA DANDO ERRO AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
                }
                else {   
                    req.session.firstStep = true; // seto uma sessao na nuvem para identificar se o primeiro passo(no caso, a validaçao) foi concluido ou nao
                    req.session.userInfo = req.body; // salvo em uma sessão todas informaçoes enviadas pelo usuario.
                    req.session.save();
                    
                    return res.redirect('/sign-up/code'); //caso passe por todas verificações, prossegue pra proxima página
                }
            }
        });

    }
    catch (error){        
        req.flash('errorMessage', ['Erro inesperado! Tente novamente mais tarde.']);
        return res.redirect('/sign-up');
    }
}

async function sendCode(req, res) {
    const authCode = randomStringGenerator(6); // crio um código de 6 caracteres
    req.session.code = authCode.toUpperCase(); // salvo esse codigo em uma sessao

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: req.session.userInfo.email,
        from: 'victr.hf@gmail.com',
        subject: `CÓDIGO DE VERIFICAÇÃO FÁCIL SOLIDÁRIO`,
        text: 
        `
            Seu código de verificação é: 
    
            \n \n \n
    
            <strong>${req.session.code}</strong>   
            `
    };
    try {
        await sgMail.send(msg);
    } catch (error) {
        req.flash('errorMessage', ['Erro Inesperado! Tente novamente mais tarde.']);
        return res.redirect('/sign-up');
    }

    req.flash('sucessMessage', ['E-mail enviado! Verifique sua caixa de spam.']); //NAO TO CONSEGUINDO ENVIAR O REQ.FLASH PRO SIGN/CONFIRMACAO
    return res.redirect('/sign-up/confirmacao')  ;
}

function indexConfirm(req, res) {
    res.render('cadastroConfirm', 
        { 
            csrfToken: req.csrfToken(), 
            userInfo: req.session.userInfo,
            successMessage: req.flash('successMessage'), 
            errorMessage: req.flash('errorMessage') 
        }
    );
}

function storeConfirm(req, res) {
    if(req.body.code != req.session.code){
        req.flash('errorMessage', ['Código incorreto!']);
        return res.redirect('/sign-up/confirmacao'); 
    }

    req.session.secondStep = true;
    req.flash('successMessage', ['Código correto!']);
    return res.redirect('/sign-up/password'); 
}

function indexPassword(req, res) {
    res.render('cadastroPassword', 
        { 
            csrfToken: req.csrfToken(), 
            successMessage: req.flash('successMessage'), 
            errorMessage: req.flash('errorMessage') 
        }
    );
}

async function storePassword(req, res) {
    try {
        await UsuarioRepository.create({
            nome: req.session.userInfo.nome ,
            email: req.session.userInfo.email,
            telefone: req.session.userInfo.telefone,
            senha: req.body.senha
        }).then(() => {
            req.session.firstStep = false;
            req.session.secondStep = false;
            req.session.userInfo = false;
            
            req.flash('successMessage', ['Conta criada com sucesso! Faça login para prosseguir.']);
            return res.redirect('/sign-in'); 
        })

    } catch (error) {
        if(error.message == "Validation error"){
            req.flash('errorMessage', ['insira um E-mail e/ou Telefone válidos']);
            return res.redirect('/sign-up');
        } else {
            req.flash('errorMessage', ['Um erro inesperado aconteceu! Tente novamente mais tarde.']);
            return res.redirect('/sign-up/confirmacao/password');
        }
    }
}

module.exports = { index, store, sendCode, indexConfirm, storeConfirm,  indexPassword, storePassword };


// function indexConfirmacao(req, res) {
//     sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//         const msg = {
//             to: userInfo.email,
//             from: 'solidariofacil@gmail.com',
//             subject: `CÓDIGO DE VERIFICAÇÃO FÁCIL SOLIDÁRIO`,
//             text: 
//             `
//                 Seu código de verificação é: 
    
//                 \n \n \n
    
//                 <strong>${authCode}</strong>   

//             `
//         };
//         sgMail.send(msg); 
    
//     res.render('cadastroConfirm');
// }




// async function storeConfirmacao(req, res){
//     if(req.body.codigo != authCode){
//         return res.json('código incorreto!!');
//     }

//     try {
//         await UsuarioRepository.create({
//             nome: userInfo.nome,
//             email: userInfo.email,
//             telefone: userInfo.telefone,
//             senha: userInfo.senha
//         }).then(() => {
//             res.json("conta criada!!"); 
//             req.session.firstStep = false;
//             // res.redirect('/sign-in'); 
//         });
//     } catch (error) {
//         res.json(error)
//     }
//     // colocar um req.session.firstStep = false; no final
// }

