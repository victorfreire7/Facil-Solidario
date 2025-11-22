const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // req.session.user = null;
    // req.session.admin = null;

    // req.flash('successMessage', ['Logout realizado com sucesso!']);
    // res.redirect('/');

    res.send('oi')
});

module.exports = router;
