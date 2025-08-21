function index (req, res){
    res.render('pontoscoleta', { user: req.session.user });
}

module.exports = { index };