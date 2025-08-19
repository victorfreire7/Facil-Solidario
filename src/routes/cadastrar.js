const express = require('express');
const router = express.Router();
const cadastrarController = require('../controllers/cadastrar');
const stepMiddleware = require('../middlewares/stepLoginRequired');

router.get('/', cadastrarController.index);
router.post('/', cadastrarController.store);

router.get('/confirmacao', stepMiddleware.first, cadastrarController.indexConfirm);

router.get('/code', stepMiddleware.first, cadastrarController.sendCode); // essa rota envia um código ao email do usuario

// router.get('/confirmacao', /*firstStepMiddleware, TEMPORARIO REMOVIDO*/ cadastrarController.indexConfirmacao);
// router.post('/confirmacao', /*firstStepMiddleware,*/ cadastrarController.storeConfirmacao);


module.exports = router;