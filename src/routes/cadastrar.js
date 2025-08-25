const express = require('express');
const router = express.Router();
const cadastrarController = require('../controllers/cadastrar');
const stepMiddleware = require('../middlewares/stepLoginRequired'); // retorna dois métodos, ambos verificam em qual passo do cadastro o usuario esta.

router.get('/', cadastrarController.index);
router.post('/', cadastrarController.store);

router.get('/confirmacao', stepMiddleware.first, cadastrarController.indexConfirm);
router.post('/confirmacao', stepMiddleware.first, cadastrarController.storeConfirm);

router.get('/password', stepMiddleware.first, stepMiddleware.second, cadastrarController.indexPassword);
router.post('/password', stepMiddleware.first, stepMiddleware.second, cadastrarController.storePassword);

router.get('/code', stepMiddleware.first, cadastrarController.sendCode); // essa rota envia um código ao email do usuario

module.exports = router;