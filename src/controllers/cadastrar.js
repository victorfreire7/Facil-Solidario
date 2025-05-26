const UsuarioRepository = require('../models/usuario');
const validator = require('validator');

function index (req, res){
    res.json('sign up');
}

async function store (req, res){
    try {

        if(!validator.isEmail(req.body.email)){ // crio uma verificação de caso o e-mail seja valido.
            req.session.save();
            return res.json('Por favor, digite um E-mail válido!');
        }
        
        await UsuarioRepository.findOne({ //executo um método que procura um valor no BD e retorna um dado BOOLEAN
            where: {
                email: req.body.email // envio como argumento o input de email
            }
        }).then((result) => {
            if(result) {
                req.session.save();
                res.json('e-mail já utilizado'); // se o já existir o e-mail no BD, isso sera retornado
            }
        })
        

        await UsuarioRepository.create({
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone,
            senha: req.body.senha
        }).then((result) => {
            req.session.save();
            res.json(result);
            // res.redirect('/sign-in');
        });
    }
    catch (error){
        res.json(error)
    }
}

async function show(arg) {
       
}

module.exports = { index, store };