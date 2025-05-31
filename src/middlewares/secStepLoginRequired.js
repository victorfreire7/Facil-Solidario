module.exports = (req, res, next) => {
    if(!req.session.firstStep){
        res.json("renderizo a pag 404");
    } else {
        next();
    }

}