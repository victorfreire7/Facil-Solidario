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
            successMessage: req.flash('successMessage'), 
            errorMessage: req.flash('errorMessage'),
            csrfToken: req.csrfToken(), 
            users: users, // guarda todos os usuarios, para ser mostrado
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
            successMessage: req.flash('successMessage'), 
            errorMessage: req.flash('errorMessage'),
            csrfToken: req.csrfToken(), 
            users:  [users], // guarda apenas o usuario desejado, mas mantem ele em um ARRAY para ser lido no EJS
            doacao: false 
        }
    )
}

async function showDoacao(req, res) {
    const doacao = await doacaoRepository.findByPk(req.params.doacao)
    
    res.render('admin', 
        { 
            successMessage: req.flash('successMessage'), 
            errorMessage: req.flash('errorMessage'),
            csrfToken: req.csrfToken(), 
            users:  false,
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
    }).then(() => {
        req.flash('successMessage', ['Doação alterada com sucesso!']);
        return res.redirect('/admin')
    })
}

module.exports = { index, show, showDoacao, update }