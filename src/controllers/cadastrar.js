const UsuarioRepository = require('../models/usuario');


function index (req, res){
    res.json('sign up');
}

async function store (req, res){
    try {
        await UsuarioRepository.create({
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone,
            senha: req.body.senha
        }).then((result) => {
            res.json(result);
            // res.redirect('/sign-in');
        });
    }
    catch (error){
        res.json(error)
    }
}

module.exports = { index, store };