require('dotenv').config();
const sgMail = require('@sendgrid/mail');

function index (req, res){
    res.json('hello world!');
}

function store (req, res){
    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: 'solidariofacil@gmail.com',
            from: 'solidariofacil@gmail.com',
            subject: `nome: ${req.body.nome} email: ${req.body.email}`,
            text: req.body.texto,
        };
        sgMail.send(msg).then((result) => {
            res.json('E-mail enviado com sucesso!'); 
        });
    } catch (error) {
       res.json(error) 
    }
}

module.exports = { index, store };