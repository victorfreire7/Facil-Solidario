const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logout');

router.get('/', logoutController.index, (req, res) => {
    res.redirect('/');
});

module.exports = router;
