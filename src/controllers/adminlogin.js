require('dotenv').config();
const sgMail = require('@sendgrid/mail');

const adminRepository = require('../models/admin');
const randomStringGenerator = require('random-string-generator');
const bcryptjs = require('bcryptjs');


async function index(req, res) {
    res.render('adminlogin', { csrfToken: req.csrfToken() });
}

async function sendCode(req, res) {
    let dayLogin = randomStringGenerator(6); // gera uma string aleátoria de 6 caracteres.
    let dayPassword = randomStringGenerator(25); // faço o mesmo aqui

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    sgMail.send({
        to: 'solidariofacil@gmail.com',
        from: 'victr.hf@gmail.com',
        subject: `LOGIN DE ADMINISTRADOR DO DIA.`,
        text: 
        `
            Seu login atual para entrar como ADMINISTRADOR no sistemas do Fácil Solidário LTDA. é:

            \n \n \n

            LOGIN: ${dayLogin}   
            SENHA: ${dayPassword}

            \n \n \n

            Tenha um bom serviço!
        `
    }); // envio no E-mail, o login e a senha do dia para acesso do admin

    storeAdmin(dayLogin, dayLogin); // adiciono as informações do ADMIN no BD

    res.redirect('adminlogin');

}

async function storeAdmin(login, pass){
    let admins = await adminRepository.findOne(); //guardo dentro de uma constante os valores da tabela admin
    if(!admins){ // caso nao exista um admin ainda, eu vou criar um.
        await adminRepository.create({
            login: login, // seto como valor de login, a string aleatoria criada anteriormente.   
            senha_hash: await bcryptjs.hash(pass, 8) // faço o mesmo com a senha.
        });
    } else { // caso já exista um admin, eu mudo os valores dele pros novos
        await admins.update({
            login: login,
            senha_hash: await bcryptjs.hash(pass, 8)
        });
    }
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
            return res.json('login nao achado');
        }

        await bcryptjs.compare(req.body.senha, admin.senha_hash)
        .then((result) => {
             if (result) {
                req.session.admin = admin;
                return res.json('redirectionando!');
            } else {
                return res.json('senha inválida');
            }
        });

    } catch (error) {
        res.send(error + "deu erro ai");
    }
}

module.exports = { index, login, sendCode }