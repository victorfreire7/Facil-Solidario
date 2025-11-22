function index (req, res){
    req.session.admin = null;
    req.session.user = null;
    return res.redirect('/');
}

module.exports = { index }