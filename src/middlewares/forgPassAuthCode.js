function authCode(req, res, next){
    if(!req.session.authCode){ // caso o codigo nao tenha sido enviado.
        return res.status(404).render('404');
    }

    next();
}

module.exports = { authCode }