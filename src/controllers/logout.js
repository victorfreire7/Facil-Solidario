function index (req, res){
    req.session.admin = null;
    req.session.user = null;
    req.flash('successMessage', ['Usuário logado com sucesso!']);
    return res.redirect('/');
}

module.exports = { index }