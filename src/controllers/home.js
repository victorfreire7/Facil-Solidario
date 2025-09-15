require('dotenv').config();
const sgMail = require('@sendgrid/mail');

function index (req, res){
    res.render('index', { user: req.session.user, csrfToken: req.csrfToken(), successMessage: req.flash('loginSucess') });
}

function store (req, res){
    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            from: 'victr.hf@gmail.com',
            to: 'solidariofacil@gmail.com',
            subject: `nome: ${req.body.nome} email: ${req.body.email}`,
            text: req.body.texto,
        };
        sgMail.send(msg).then(() => {
            res.redirect('/'); // FLASH MESSAGES AQUI... 
        });
    } catch (error) {
       res.json(error); 
    }
}

module.exports = { index, store };