function index (req, res){
    res.render('quemsomos', { user: req.session.user });
}

module.exports = { index };