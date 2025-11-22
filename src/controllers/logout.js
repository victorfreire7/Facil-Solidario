function index (req, res){
    req.session.destroy
    req.flash('successMessage', ['Usuário logado com sucesso!'])
    return res.redirect('/');
}

module.exports = { index }