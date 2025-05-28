const userRepository = require('../models/usuario');
const doacaoRepository = require('../models/doacao');

async function index(req, res){
    const users = await userRepository.findAll({
        attributes: ['id_usuario', 'nome', 'email'],
        include: [{
            model: doacaoRepository,
            attributes: ['id_doacao', 'tipo', 'quantidade', 'entregue']
        }]
    });

    res.json(users);
}

async function show(req, res){
    const users = await userRepository.findByPk(req.params.id, {
        attributes: ['id_usuario', 'nome', 'email'],
        include: [{
            model: doacaoRepository,
            attributes: ['id_doacao', 'tipo', 'quantidade', 'entregue']
        }]
    });

    res.json(users)
}

async function showDoacao(req, res) {
    const doacao = await doacaoRepository.findByPk(req.params.doacao)
    
    res.json({"render aqui": "", "doacao": doacao});
}

async function update(req, res){   
    const doacao = await doacaoRepository.findByPk(req.params.doacao);
    
    await doacao.update({
        tipo: req.body.tipo,
        quantidade: req.body.quantidade,
        entregue: req.body.entregue
    }).then((result) => {
        res.json(result);
    })
}

module.exports = { index, show, showDoacao, update }