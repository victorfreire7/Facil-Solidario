const express = require('express');
const router = express.Router();
const esquecisenhaController = require('../controllers/esquecisenha');

router.get('/', esquecisenhaController.index);
router.post('/', esquecisenhaController.store);

module.exports = router;