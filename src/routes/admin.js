const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.get("/", adminController.index);

router.get("/:id", adminController.show);

router.get("/:id/:doacao", adminController.showDoacao)
router.post("/:id/:doacao", adminController.update);

module.exports = router;