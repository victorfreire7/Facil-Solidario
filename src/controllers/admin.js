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

}

async function update(req, res){    
}

module.exports = { index, show, showDoacao, update }