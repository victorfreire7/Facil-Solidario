const express = require('express');
const router = express.Router();
const politicasController = require('../controllers/politicas');

router.get('/', politicasController.index);

module.exports = router;