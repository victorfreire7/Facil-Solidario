function index (req, res){
    res.render('politicas', { user: req.session.user });
}

module.exports = { index };