require('dotenv').config();
const UsuarioRepository = require('../models/usuario');
const validator = require('validator');
const randomStringGenerator = require('random-string-generator');
const sgMail = require('@sendgrid/mail');
const bcryptjs = require('bcryptjs');
let userInfo = {};

function index(req, res) {
    res.json('render first step forget password');
}

async function store(req, res) {
    try {
        if(!validator.isEmail(req.body.email)){ // crio uma verificação de caso o e-mail seja valido.
            req.session.save();
            return res.json('Por favor, digite um E-mail válido!');
        }

        await UsuarioRepository.findOne({
            where: {
                email: req.body.email
            }
        })
        .then((result) => {
            if(!result) {
                return res.json('E-mail não encontrado no banco de dados!');
            }
        });
        
        userInfo.email = req.body.email; // adiciono na variavel local o ultimo email enviado;
        req.session.forgetPasswordAuthCode = randomStringGenerator(6);

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: req.body.email,
            from: 'solidariofacil@gmail.com',
            subject: `CÓDIGO PARA ALTERAR SENHA FÁCIL SOLIDÁRIO`,
            text: 
                `
                Seu código para alteração da sua senha é: 
        
                \n \n \n
        
                <strong>${req.session.forgetPasswordAuthCode}</strong>   
    
            `
        };
        sgMail.send(msg);

        res.json('segunda pag');

    } catch (error) {
        res.json(error)
    }
}

function authCodeIndex(req, res) {
    res.json('//renderizo a pag etc'); 
}

async function authCodeStore(req, res) {
    if(req.body.code != req.session.forgetPasswordAuthCode){
        return res.json('ops! código incorreto.'); //futuramente adiciono uma flash message (???)
    }       
    
    req.session.authCodeSucces = true;
    res.json('aqui eu redireciono para /change-password');
}

function updatePasswordIndex(req, res){
    res.json('renderizo a pag.')
}

async function updatePasswordUpdate(req, res) {
    try {
        const usuario = await UsuarioRepository.findOne({
            where: {
                email: userInfo.email
            }
        });
    
        await usuario.update({
            senha_hash: await bcryptjs.hash(req.body.senha, 8)
        }). then((result) => {
            res.json(result);
        });
    } catch (error) {
        res.json(error)
    }
}

module.exports = { index, store, authCodeIndex, authCodeStore, updatePasswordIndex, updatePasswordUpdate };