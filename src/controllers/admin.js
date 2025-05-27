const userRepository = require('../models/usuario');
const doacaoRepository = require('../models/doacao');

async function index(req, res){
    const users = await userRepository.findAll({
        attributes: ['id_usuario', 'nome', 'email']
    });

    res.json(users);
}

async function store(req, res){
    
}

async function show(req, res){
    const users = await userRepository.findByPk(req.params.id, {

    });

    res.json(users)
}

async function update(req, res){
}

module.exports = { index, store, show, update }