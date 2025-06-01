const express = require('express');
const router = express.Router();
const esquecisenhaController = require('../controllers/esquecisenha');
const authCodeRequired = require('../middlewares/forgPassAuthCode');

router.get('/', esquecisenhaController.index);
router.post('/', esquecisenhaController.store);

router.get('authentication-code', authCodeRequired.emailValidator, esquecisenhaController.authCodeIndex);
router.post('authentication-code', authCodeRequired.emailValidator, esquecisenhaController.authCodeStore);

router.get('authentication-code/change-password', authCodeRequired.codeValidator, esquecisenhaController.updatePasswordIndex);
router.put('authentication-code/change-password', authCodeRequired.codeValidator, esquecisenhaController.updatePasswordUpdate);

module.exports = router;