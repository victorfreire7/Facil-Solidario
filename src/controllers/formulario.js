const doacaoModel = require('../models/doacao');

//faço a separação dos itens que estao no URL, retornando somente o valor deles

function index (req, res){
    res.render('formulario', { csrfToken: req.csrfToken() });
}

function store (req, res) {
    res.json(req.body);
    // res.redirect(`/formulario-doacao/option=${req.body.options}%20quantidade=${req.body.quantidade}`);   
}

    // async function store (req, res){
    //     try {
    //         doacaoModel.create({
    //             tipo: req.body.tipo,
    //             quantidade: req.body.quantidade,
    //             usuarioIdUsuario: req.session.user.id_usuario
    //         });
    
    //         res.json('form enviado');
            
    //     } catch (error) {
    //         return res.json(error)
    //     }
    // }

module.exports = { index, store };