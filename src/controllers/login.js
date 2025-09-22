const UsuarioRepository = require('../models/usuario');
const bcryptjs = require('bcryptjs');
require("dotenv").config();

function index (req, res){
    res.render('login', 
        { 
            csrfToken: req.csrfToken(), 
            successMessage: req.flash('successMessage'),
            errorMessage: req.flash('errorMessage')
        });
}

async function store (req, res){
    try {
        
        const user = await UsuarioRepository.findOne(
            {
                where: 
                {
                    email: req.body.email
                }
            }
        );

        if(!user){
            req.flash('errorMessage', ['E-mail ou Senha incorretas.']);
            return res.redirect('/sign-in');
        }

        await bcryptjs.compare(req.body.senha, user.senha_hash) // utilizamos await pois a promisse do bcrypt é assincrona.
        .then((result) => {
            if (result) {
                req.session.user = user;
                req.flash('successMessage', ['Usuário logado com sucesso!'])
                return res.redirect('/');
            } else {
                req.flash('errorMessage', ['E-mail ou Senha incorretas.']);
                return res.redirect('/sign-in');
            }
        }); 

        

    } catch (error) {
        res.json(error);
    }

}


module.exports = { index, store };