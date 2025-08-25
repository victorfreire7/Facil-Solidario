const express = require('express');
const router = express.Router();
const adminloginController = require('../controllers/adminlogin');

router.get('/', adminloginController.index);
router.post('/', adminloginController.login);

router.get('/code', adminloginController.sendCode)

module.exports = router;