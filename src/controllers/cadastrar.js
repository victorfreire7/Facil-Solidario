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
                    return res.redirect('/sign-up');
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
        req.flash('successMessage', ['E-mail enviado! Verifique sua caixa de spam.']); //NAO TO CONSEGUINDO ENVIAR O REQ.FLASH PRO SIGN/CONFIRMACAO
        return res.redirect('/sign-up/confirmacao')  ;
    } catch (error) {
        req.flash('errorMessage', ['Erro Inesperado! Tente novamente mais tarde.']);
        return res.redirect('/sign-up');
    }

    
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
    try {
        if(req.body.code.toUpperCase() != req.session.code){
            req.flash('errorMessage', ['Código incorreto!']);
            return res.redirect('/sign-up/confirmacao'); 
        }
    
        req.session.secondStep = true;
        req.flash('successMessage', ['Código correto!']);
        return res.redirect('/sign-up/password'); 
    } catch (error) {
        req.flash('errorMessage', ['Um erro inesperado aconteceu! Tente novamente mais tarde.']);
        return res.redirect('/sign-up');
    }
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

function passwordSeparator(arg){ // essa funçao separa todos os caracteres da string, para ser realizada uma separaçao de seus respectivos valores
    const passwordArray = arg.split('');
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const data = {
        special: 0,
        upper: 0,
        number: 0
    }

    for (const char of passwordArray) { //contem todas as caracteres da senha
        for (const number of numbers) {
            if(parseInt(char) === number){
                data.number++;
            }
        }
        if(char.charCodeAt() >= 65 && char.charCodeAt() <= 91){
            data.upper++;
        }
        if(char.charCodeAt(0) >= 33 && char.charCodeAt(0) <= 47){
            data.special++
        }
        if(char.charCodeAt(0) >= 58 && char.charCodeAt(0) <= 64){
            data.special++
        }
        if(char.charCodeAt(0) >= 91 && char.charCodeAt(0) <= 96){
            data.special++
        }
        if(char.charCodeAt(0) >= 123 && char.charCodeAt(0) <= 126){
            data.special++
        }
    }

    return data; // retorno os valores especiais da senha
}

async function storePassword(req, res) {
    try {
        const password = passwordSeparator(req.body.senha);
        if(req.body.senha !== req.body.confirmSenha){ // verifico se os dois inputs sao iguais
            req.flash('errorMessage', ['Senhas não coincidem.']);
            return res.redirect('/sign-up/password');
        }  
        if(req.body.senha.length < 8){ // verifico se a senha é maior do que o esperado
            req.flash('errorMessage', ['Por favor, digite uma senha maior.']);
            return res.redirect('/sign-up/password');
        }
        if(
            password.number < 2 ||
            password.special < 1 ||
            password.upper < 1 
        ){
            req.flash('errorMessage', ['Por favor, cumpra os requisitos para uma senha segura.']);
            return res.redirect('/sign-up/password');
        }
        await UsuarioRepository.create({ // caso o usuario passe por todo o validador, sera criado o login no BD
            nome: req.session.userInfo.nome,
            email: req.session.userInfo.email,
            telefone: req.session.userInfo.telefone,
            senha: req.body.senha
        }).then(() => {
            req.session.firstStep = false;
            req.session.secondStep = false;
            req.session.userInfo = false; // desativo todos os passos de sign-up ativos anteriormente, para acesso da rota desejada
            
            req.flash('successMessage', ['Conta criada com sucesso! Faça login para prosseguir.']);
            return res.redirect('/sign-in'); 
        });
    } catch (error) {
        if(error.message == "Validation error"){
            req.flash('errorMessage', ['insira um E-mail e/ou Telefone válidos']);
            return res.redirect('/sign-up');
        } else {
            console.log(error)
            req.flash('errorMessage', ['Um erro inesperado aconteceu! Tente novamente mais tarde.']);
            return res.redirect('/sign-up/password');
        }
    }
}

module.exports = { index, store, sendCode, indexConfirm, storeConfirm,  indexPassword, storePassword };