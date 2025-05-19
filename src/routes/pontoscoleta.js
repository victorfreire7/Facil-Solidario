const express = require('express');
const router = express.Router();
const pontocoletaController = require('../controllers/pontoscoleta');

router.get('/', pontocoletaController.index);

module.exports = router;