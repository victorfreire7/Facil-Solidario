const express = require('express');
const router = express.Router();
const formularioController = require('../controllers/formulario');

router.get('/', formularioController.index);
router.post('/', formularioController.store);

module.exports = router;