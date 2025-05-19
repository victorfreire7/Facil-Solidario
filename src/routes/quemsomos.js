const express = require('express');
const router = express.Router();
const quemsomosController = require('../controllers/quemsomos');

router.get('/', quemsomosController.index);

module.exports = router;