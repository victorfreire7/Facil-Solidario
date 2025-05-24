require("dotenv").config();

module.exports = (req, res, next) => {
    if(!req.session.user){
        res.json('login necessario');
        res.redirect('/');
    }

    next();
}