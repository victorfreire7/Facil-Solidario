const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    // req.session.user = null;
    // req.session.admin = null;
    // req.flash('errorMessage', ['']); 
    // req.flash('successMessage', ['Logout realizado com sucesso!']);
    // res.redirect('/');
    
    next();
}, () => {
    res.send('oi');
});

module.exports = router;