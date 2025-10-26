const userRepository = require('../models/usuario');
const doacaoRepository = require('../models/doacao');

async function index(req, res){
    try {
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
    } catch {
        req.flash('errorMessage', ['Um erro inesperado aconteceu! Tente novamente mais tarde.']);
        return res.redirect('/sign-up/password');
    }
}

async function show(req, res){
    try {
        const users = await userRepository.findOne({
            where: { email: req.params.email },
            attributes: ['id_usuario', 'nome', 'email'],
            include: [{
                model: doacaoRepository,
                attributes: ['id_doacao', 'tipo', 'quantidade', 'entregue'],
                separate: true, //permite que eu ordene os resultados
                order: [['entregue', 'ASC']] // primeiro retorno os valores false
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
    } catch {
        req.flash('errorMessage', ['Um erro inesperado aconteceu! Tente novamente mais tarde.']);
        return res.redirect('/sign-up/password');
    }
}

async function showDoacao(req, res) {
    try {
        const doacao = await doacaoRepository.findByPk(req.params.doacao)
        
        res.render('admin', 
            { 
                successMessage: req.flash('successMessage'), 
                errorMessage: req.flash('errorMessage'),
                csrfToken: req.csrfToken(), 
                users:  false,
                doacao: doacao,
                params: req.params
            }
        );
    } catch {
        req.flash('errorMessage', ['Um erro inesperado aconteceu! Tente novamente mais tarde.']);
        return res.redirect('/sign-up/password');
    }
}

async function update(req, res){  
    try {
        const doacao = await doacaoRepository.findByPk(req.params.doacao);
        
        await doacao.update({
            tipo: req.body.tipo,
            quantidade: req.body.quantidade,
            entregue: req.body.entregue
        }).then(() => {
            req.flash('successMessage', ['Doação alterada com sucesso!']);
            return res.redirect('/admin');
        })
    } catch {
        req.flash('errorMessage', ['Um erro inesperado aconteceu! Tente novamente mais tarde.']);
        return res.redirect('/sign-up/password');
    } 
}

async function deleteUser(req, res) {
    try {
        if(!req.params.email) return res.status(404).render('404')
        await userRepository.destroy(
            {
                where: {
                    email: req.params.email
                }
            }
        );
        req.flash('successMessage', ['Usuário deletado com sucesso.']);
        return res.redirect('/admin');
    } catch {
        req.flash('errorMessage', ['Um erro inesperado aconteceu! Tente novamente mais tarde.']);
        return res.redirect('/admin');
    }
}

async function deleteDoacao(req, res) {
    try {
        await doacaoRepository.destroy(
            {
                where: {
                    id_doacao: req.params.doacao
                }
            }
        );

        req.flash('successMessage', ['Doação deletada com sucesso.']);
        return res.redirect('/admin');
    } catch {
        req.flash('errorMessage', ['Um erro inesperado aconteceu! Tente novamente mais tarde.']);
        return res.redirect('/admin');
    }
}

function showCreateDonation(req, res) {
    res.render('adminstoredonation', 
            { 
                successMessage: req.flash('successMessage'), 
                errorMessage: req.flash('errorMessage'),
                csrfToken: req.csrfToken()
            }
        )
}

async function storeDonation(req, res) {
    try {
        await userRepository.findOne(
            {
                where: {
                    email: req.params.email
                }
            }
        ).then((user) => {
            doacaoRepository.create({
                tipo: req.body.tipo,
                quantidade: req.body.quantidade,
                usuarioIdUsuario: user.id_usuario
            });
        })
        .then(() => {
            req.flash('successMessage', [`Doação criada no email ${req.params.email} com sucesso.`]);
            return res.redirect('/admin');
        })
    } catch(e) {
        console.log(e)
        req.flash('errorMessage', ['Um erro inesperado aconteceu! Tente novamente mais tarde.']);
        return res.redirect('/admin');

    }
}


module.exports = { index, show, showDoacao, update, deleteUser, deleteDoacao, storeDonation, showCreateDonation }