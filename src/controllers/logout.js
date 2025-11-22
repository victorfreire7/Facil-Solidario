function index (req, res){
    req.session.destroy();
    return res.redirect('/');
}

module.exports = { index }