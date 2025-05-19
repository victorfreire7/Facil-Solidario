const express = require('express');
const router = express.Router();
const cadastrarController = require('../controllers/cadastrar');

router.get('/', cadastrarController.index);
router.post('/', cadastrarController.store);


module.exports = router;