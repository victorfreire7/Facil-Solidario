module.exports = (req, res, next) => {
    res.locals.successMessage = 0;
    res.locals.errorMessage = 0;
    res.locals.popupMessage = false;

    if (req.flash) {
        try {
            res.locals.successMessage = req.flash('successMessage');
            res.locals.errorMessage = req.flash('errorMessage');
        } catch (err) {
            console.log("Flash indisponível nesta requisição:", err.message);
        }
    }

    next();
}