function index (req, res){
    req.session.destroy();
    res.redirect('/'); // FLASH MESSAGE AVISANDO QUE O LOGOUT FOI REALIZADO
}

module.exports = { index }