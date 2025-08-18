require('dotenv').config();
const randomStringGenerator = require('random-string-generator');
const UsuarioRepository = require('../models/usuario');
const sgMail = require('@sendgrid/mail');
const validator = require('validator');
let userInfo = {};
const authCode = randomStringGenerator(6);


function index (req, res){
    res.render('cadastro'); // aqui seria a renderização do EJS
}

async function store (req, res){
    try {

        const result = await UsuarioRepository.findOne({ //executo um método que procura um valor no BD e retorna um dado BOOLEAN
            where: {
                email: req.body.email // envio como argumento o input de email
            }
        });

        if(result){
            return res.json('e-mail j autilizado!!!!');
        }

        if(!validator.isEmail(req.body.email)){ // crio uma verificação de caso o e-mail seja valido.
            return res.send('Por favor, digite um E-mail válido!');
        }        
        
        res.redirect('/sign-up/confirmacao');
        
    }
    catch (error){  
        res.send(error);
    }
}

function indexConfirm(req, res) {
    res.render('cadastroConfirm')
}



// function indexConfirmacao(req, res) {
//     // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//     //     const msg = {
//     //         to: userInfo.email,
//     //         from: 'solidariofacil@gmail.com',
//     //         subject: `CÓDIGO DE VERIFICAÇÃO FÁCIL SOLIDÁRIO`,
//     //         text: 
//     //         `
//     //             Seu código de verificação é: 
    
//     //             \n \n \n
    
//     //             <strong>${authCode}</strong>   

//     //         `
//     //     };
//     //     sgMail.send(msg); TEMPORARIO REMOVIDO
    
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

module.exports = { index, store, indexConfirm };