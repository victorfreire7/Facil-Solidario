function emailValidator(req, res, next){
    if(!req.session.forgetPasswordAuthCode){ // sessao caso o código já tenha sido enviado
        res.redirect('renderizo a pag 404');
        res.redirect('/');
    }

    next();
}

function codeValidator(req, res, next){
    if(!req.session.authCodeSucces){ // sessao caso o código tenha sido enviado com sucesso.
        res.redirect('renderizo a pag 404');
        res.redirect('/');
    }

    if(!req.session.forgetPasswordAuthCode){ // sessao caso o código já tenha sido enviado
        res.redirect('renderizo a pag 404');
        res.redirect('/');
    }

    next();
}

module.exports = { emailValidator, codeValidator }