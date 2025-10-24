module.exports = (req, res, next) => {
    if(req.session.user){
        console.log(req.session.user.admin)
        next();
    } else {
        res.status(404).render('404');
    }
}