const express = require('express');
const router = express.Router();
const cadastrarController = require('../controllers/cadastrar');
const firstStepMiddleware = require('../middlewares/secStepLoginRequired');

router.get('/', cadastrarController.index);
router.post('/', cadastrarController.store);

router.get('/confirmacao', firstStepMiddleware, cadastrarController.indexConfirmacao);
router.post('/confirmacao', firstStepMiddleware, cadastrarController.storeConfirmacao);


module.exports = router;