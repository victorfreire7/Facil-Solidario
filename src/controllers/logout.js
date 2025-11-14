function index (req, res){
    req.session.destroy((error) => {
        if(error){
            req.flash('errorMessage', ['Um erro inesperado aconteceu! Tente novamente mais tarde.']);
            return res.redirect('/');
        }
    })

    req.flash('successMessage', ['Logout realizado com sucesso!'])
    res.redirect('/'); // FLASH MESSAGE AVISANDO QUE O LOGOUT FOI REALIZADO
}

module.exports = { index }