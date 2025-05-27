require("dotenv").config();

module.exports = (req, res, next) => {
    if(!req.session.admin){
        res.json('login necessario');
        res.redirect('/');
    }

    next();
}