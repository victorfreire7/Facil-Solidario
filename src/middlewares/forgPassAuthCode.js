module.exports = (req, res, next) => {
    if(!req.session.forgetPassowrdAuthCode){
        res.redirect('renderizo a pag 404');
        res.redirect('/');
    }

    next();
}