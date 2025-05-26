const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminlogin');

router.get('/', adminController.index);
router.post('/', adminController.store);

module.exports = router;