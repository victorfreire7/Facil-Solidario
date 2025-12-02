require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const doacaoRepository = require('../models/doacao');

async function index (req, res){

    let count = 0; // crio um contador
    const allDonation = await doacaoRepository.findAll(); // crio uma variavel que guarda todas doacoes
    allDonation.forEach((result) => { count += parseInt(result.quantidade) });// adiciono a quantidade doada

    res.render('index', 
        { 
            user: req.session.user, 
            csrfToken: req.csrfToken(), 
            successMessage: req.flash('successMessage'), 
            errorMessage: req.flash('errorMessage'),
            donations: count ,
            popupMessage: false,
        });
}

function store (req, res){
    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: 'solidariofacil@gmail.com',
            from: process.env.SENDGRID_API_EMAIL,
            subject: `FEEDBACK`,
            html: 
            `
                <!DOCTYPE html>
                <html lang="pt-BR">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Feedback</title>
                </head>
                <body style="margin: 0; padding: 20px; background-color: #e5e5e5; font-family: Arial, sans-serif;">
                    <div style="background-color: #8fa687; border-radius: 12px; color: #ffffff; text-align: center; padding: 40px 20px; max-width: 400px; margin: 0 auto; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);">
                        <h2 style="font-size: 22px; font-weight: bold; margin-bottom: 25px;">
                            nome: ${req.body.nome}  <br>
                            email: ${req.body.email}
                        </h2>
                        
                        <div style="margin-bottom: 25px;">
                            <img src="https://facilsolidario.com.br/assets/img/logo-branca.png" alt="LOGOTIPO" style="width: 90px;" />
                        </div>

                        <p style="font-size: 15px; color: #f1f1f1; line-height: 22px;">
                            ${req.body.texto}
                        </p>
                    </div>
                </body>
                </html>
            `,
            text: req.body.texto,
        };
        sgMail.send(msg).then(() => {
            req.flash('successMessage', ['E-mail enviado com sucesso!'])
            res.redirect('/'); // FLASH MESSAGES AQUI... 
        });
    } catch (error) {
       res.json(error); 
    }
}

module.exports = { index, store };