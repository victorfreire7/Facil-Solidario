const doacaoModel = require('../models/doacao');

function index (req, res){
    res.json('formulario', { csrfToken: req.csrfToken() });
}

async function store (req, res){
    try {
        doacaoModel.create({
            tipo: req.body.tipo,
            quantidade: req.body.quantidade,
            usuarioIdUsuario: req.session.user.id_usuario
        });

        res.json('form enviado');
        
    } catch (error) {
        return res.json(error)
    }
}

module.exports = { index, store };