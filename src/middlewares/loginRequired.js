module.exports = (req, res, next) => {
    if(!req.session.user){
        req.flash('errorMessage', ['Login necessário!']);
        return res.redirect('/');
    }

    next();
}