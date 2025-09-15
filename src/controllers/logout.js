function index (req, res){
    req.session.user = false;
    req.flash('loginSucess', ['Logout realizado com sucesso!'])
    res.redirect('/'); // FLASH MESSAGE AVISANDO QUE O LOGOUT FOI REALIZADO
}

module.exports = { index }