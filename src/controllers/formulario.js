const doacaoModel = require('../models/doacao');

//faço a separação dos itens que estao no URL, retornando somente o valor deles
let cleanString = (arg) => arg.slice(arg.indexOf('=') + 1); 

function index (req, res){
    res.render('formulario', { csrfToken: req.csrfToken() });
}

function store (req, res) {
    //adiciono no URL duas variaveis: o item que foi escolhido para doar, e a quantidade dele


    res.redirect(`/formulario-doacao/:option=${req.body.options}%20quantidade=${req.body.quantidade}`);   
}

function indexDonation (req, res) {
    let [ option, quantidade ] = req.params.donation.split(' ');

    res.render('formulario', {csrfToken: req.csrfToken(), item: cleanString(option), quantidade: cleanString(quantidade)})


    // res.json({

    //     1: cleanString(option),
        // 2: cleanString(quantidade)

    // })


}

function storeDonation (req, res) {
    
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

module.exports = { index, store, indexDonation, storeDonation };