function index (req, res){
    try {
        req.session.user = null;
        req.session.admin = null;
        req.flash('successMessage', ['Logout realizado com sucesso!']);
        return res.redirect('/');
    } catch (error) {
        req.flash('errorMessage', ['Um erro inesperado aconteceu! Tente novamente mais tarde.']);
        return res.redirect('/sign-up/password');
    }
}

module.exports = { index }