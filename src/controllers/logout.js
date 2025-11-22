function index (req, res){
        req.session.user = null;
        req.session.admin = null;
        return res.redirect('/');
}

module.exports = { index }