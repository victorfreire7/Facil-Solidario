const userRepository = require('../models/usuario');
const doacaoRepository = require('../models/doacao');
const doacao = require('../models/doacao');

async function index(req, res){
    const users = await userRepository.findAll({
        attributes: ['id_usuario', 'nome', 'email'],
        include: [{
            model: doacaoRepository,
            attributes: ['id_doacao', 'tipo', 'quantidade', 'entregue']
        }]
    });

    res.render('admin', 
        { 
            csrfToken: req.csrfToken(), 
            users: users, 
            doacao: false
        }
    )
}

async function show(req, res){
    const users = await userRepository.findByPk(req.params.id, {
        attributes: ['id_usuario', 'nome', 'email'],
        include: [{
            model: doacaoRepository,
            attributes: ['id_doacao', 'tipo', 'quantidade', 'entregue']
        }]
    });

    res.render('admin', 
        { 
            csrfToken: req.csrfToken(), 
            users:  [users],
            doacao: false
        }
    )
}

async function showDoacao(req, res) {
    const doacao = await doacaoRepository.findByPk(req.params.doacao)
    
    res.render('admin', 
        { 
            csrfToken: req.csrfToken(), 
            doacao: doacao 
        }
    )
}

async function update(req, res){   
    const doacao = await doacaoRepository.findByPk(req.params.doacao);
    
    await doacao.update({
        tipo: req.body.tipo,
        quantidade: req.body.quantidade,
        entregue: req.body.entregue
    }).then((result) => {
        res.render('admin', 
            { 
                csrfToken: req.csrfToken(), 
                doacao: doacao 
            }
        )
    })
}

module.exports = { index, show, showDoacao, update }