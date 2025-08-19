function first (req, res, next){
    if(!req.session.firstStep){
        res.status(404).render('404');
    } else {
        next();
    }
}

module.exports = { first }