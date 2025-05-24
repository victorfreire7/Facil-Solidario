function index (req, res){
    req.session.destroy();
    res.json('sessao destruida!');
}

module.exports = { index }