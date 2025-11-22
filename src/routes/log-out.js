const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    // req.session.user = null;
    // req.session.admin = null;
    // req.flash('errorMessage', ['']); 
    // req.flash('successMessage', ['Logout realizado com sucesso!']);
    // res.redirect('/');
    
    res.render('index', 
    { 
        user: req.session.user, 
        csrfToken: req.csrfToken(), 
        successMessage: req.flash('successMessage'), 
        errorMessage: req.flash('errorMessage'),
        donations: count ,
        popupMessage: false,
    });
});

module.exports = router;