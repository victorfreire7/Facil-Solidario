function index (req, res, next){
    req.session.user = null;
    req.session.admin = null;
    next();
}

module.exports = { index }