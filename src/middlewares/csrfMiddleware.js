module.exports = (err, req, res, next) => {
    if(err.code == 'EBADCSRFTOKEN') {
        res.send('CSRF invalido')
    } else {
           next();
    }
}