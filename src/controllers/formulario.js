const doacaoModel = require('../models/doacao');

function index (req, res){
    res.json('formulario');
}

async function store (req, res){
    try {
        doacaoModel.create({
            tipo: "alimento",
            quantidade: "10",
            usuarioIdUsuario: req.session.user.id_usuario
        });

        res.json('form enviado');
        
    } catch (error) {
        return res.json(error)
    }
}

module.exports = { index, store };