const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
    req.session.user = null;
    res.json({ auth: false, token: null });
    res.redirect('back');
});

module.exports = router;