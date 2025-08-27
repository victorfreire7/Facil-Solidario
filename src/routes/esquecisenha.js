const express = require('express');
const router = express.Router();
const esquecisenhaController = require('../controllers/esquecisenha');
const authCodeRequired = require('../middlewares/forgPassAuthCode');

router.get('/', esquecisenhaController.index);
router.post('/', esquecisenhaController.store);

router.get('/change-password', authCodeRequired.authCode, esquecisenhaController.changePassIndex);
router.post('/change-password', authCodeRequired.authCode, esquecisenhaController.changePassUpdate)

router.get('/code', esquecisenhaController.sendCode)

module.exports = router;