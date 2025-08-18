require('dotenv').config();
const sgMail = require('@sendgrid/mail');

const adminRepository = require('../models/admin');
const randomStringGenerator = require('random-string-generator');
const bcryptjs = require('bcryptjs');


async function index(req, res) {
    const dayLogin = randomStringGenerator(6); // gera uma string aleátoria de 6 caracteres.
    const dayPassword = randomStringGenerator(25); // faço o mesmo aqui

    const admins = await adminRepository.findOne(); //guardo dentro de uma constante os valores da tabela admin

    if(!admins){ // caso nao exista um admin ainda, eu vou criar um.
        await adminRepository.create({
            login: dayLogin, // seto como valor de login, a string aleatoria criada anteriormente.   
            senha_hash: await bcryptjs.hash(dayPassword, 8) // faço o mesmo com a senha.
        });
    } else { // caso já exista um admin, eu mudo os valores dele pros novos
        await admins.update({
            login: dayLogin,
            senha_hash: await bcryptjs.hash(dayPassword, 8)
        });
    }
    
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: 'solidariofacil@gmail.com',
        from: 'solidariofacil@gmail.com',
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
    };
    sgMail.send(msg); // envio no E-mail, o login e a senha do dia para acesso do admin

    res.render('admin');
}

async function store(req, res) {

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
                // console.log(admin)
                req.session.admin = admin;
                return res.json('redirectionando!');
            } else {
                return res.json('senha inválida');
            }
        });

    } catch (error) {
        res.json(error);
    }
}

// async function create() {
//     await adminRepository.create({
//         login: "admin",
//         senha_hash: await bcryptjs.hash("admin123", 8)
//     })
// }

module.exports = { index, store }