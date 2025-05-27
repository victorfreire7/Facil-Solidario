const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');

router.get('/', loginController.index);
router.post('/', loginController.store);

module.exports = router;
