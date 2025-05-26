const UsuarioRepository = require('../models/usuario');


function index (req, res){
    res.json('sign up');
}

async function store (req, res){
    try {

        if(show(req.body.email)){
            return res.json('E-mail já utilizado!');
        }

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
        await UsuarioRepository.findOne({ //executo um método que procura um valor no BD e retorna um dado BOOLEAN
            where: {
                email: arg // envio como argumento o input de email
            }
        }) ? true : false // se o retorno do método for true, minha função retornada true; faço o mesmo com um valor false.
}

module.exports = { index, store };