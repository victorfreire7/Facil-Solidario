function csrfMiddleware(req, res, next){
    res.locals.csrfToken = req.csrfToken();
    next()
}

function checkCsrfError(err, req, res, next) {
    if(err) {
        return res.send(err);
    }
}

module.exports = { csrfMiddleware, checkCsrfError };