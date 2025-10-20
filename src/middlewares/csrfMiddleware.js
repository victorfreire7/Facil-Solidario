module.exports = (err, req, res, next) => {
    if(err.code == 'EBADCSRFTOKEN') {
        req.flash('errorMessage', ['CSRF detectado.']);
        return res.redirect('/');
    } else {
        next();
    }
}