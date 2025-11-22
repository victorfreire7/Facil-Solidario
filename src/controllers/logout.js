function index (req, res){
    req.session.user = null;
    req.session.admin = null;
    req.flash('successMessage', ['Logout realizado com sucesso!']);
    return res.redirect('/');
}

module.exports = { index }