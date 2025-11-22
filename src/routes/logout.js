const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    req.session.user = null;
    req.session.admin = null;
    res.redirect('/');
});

module.exports = router;
