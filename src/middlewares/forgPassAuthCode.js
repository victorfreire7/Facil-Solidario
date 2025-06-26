function emailValidator(req, res, next){
    if(!req.session.forgetPasswordAuthCode){ // sessao caso o código já tenha sido enviado
        res.status(404).render('404');
    }

    next();
}

function codeValidator(req, res, next){
    if(!req.session.authCodeSucces){ // sessao caso o código tenha sido enviado com sucesso.
        res.status(404).render('404');
    }

    if(!req.session.forgetPasswordAuthCode){ // sessao caso o código já tenha sido enviado
        res.status(404).render('404');
    }

    next();
}

module.exports = { emailValidator, codeValidator }