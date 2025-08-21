require('dotenv').config();
const randomStringGenerator = require('random-string-generator');
const UsuarioRepository = require('../models/usuario');
const validator = require('validator');

function index (req, res){
    res.render('cadastro'); // aqui seria a renderização do EJS
}

async function store (req, res){
    try {

        await UsuarioRepository.findOne({ //executo um método que procura um valor no BD e retorna um dado BOOLEAN
            where: {
                email: req.body.email // envio como argumento o input de email
            }
        }).then((result) => { 
            if(result){
                return res.json('e-mail ja utilizado!!!!'); // ADICIONAR FLASH MESSAGES 
            }   
        });

        if(!validator.isEmail(req.body.email)){ // crio uma verificação de caso o e-mail seja valido.
            return res.send('Por favor, digite um E-mail válido!'); // ADICIONAR FLASH MESSAGES
        }       
        
        if(!validator.isMobilePhone(req.body.telefone, 'pt-BR')){ // crio uma verificação de caso o telefone celular seja valido.
            return res.send('Por favor, digite um Telefone válido!!!'); // ADICIONAR FLASH MESSAGES
        }

        req.session.firstStep = true; // seto uma sessao na nuvem para identificar se o primeiro passo(no caso, a validaçao) foi concluido ou nao
        req.session.userInfo = req.body; // salvo em uma sessão todas informaçoes enviadas pelo usuario.
        req.session.save();

        res.redirect('/sign-up/code'); //caso passe por todas verificações, prossegue pra proxima página
    }
    catch (error){  
        console.error('Erro capturado:', error);
        return res.status(500).json({ message: error.message || 'Erro desconhecido' });
    }
}

async function sendCode(req, res) {
    const authCode = randomStringGenerator(6); // crio um código de 6 caracteres
    req.session.code = authCode; // salvo esse codigo em uma sessao

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
        res.send(error);
    }

    res.redirect('/sign-up/confirmacao')  ;
}

function indexConfirm(req, res) {
    res.render('cadastroConfirm');
}

function storeConfirm(req, res) {
    if(req.body.code != req.session.code){
        return res.status(401)
        .redirect('/sign-up/confirmacao'); // ENVIAR FLASH MESSAGE DE CODIGO INCORRETO 
    }

    req.session.secondStep = true;
    res.redirect('/sign-up/password'); 
}

function indexPassword(req, res) {
    res.render('cadastroPassword');
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
            
            res.redirect('/sign-in'); 
            //adicionar flash message de conta criada
        })

    } catch (error) {
        res.json(error.message);
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

