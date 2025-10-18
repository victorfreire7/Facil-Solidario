const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.get("/", adminController.index);

router.get("/:email", adminController.show);

router.get("/:email/:doacao", adminController.showDoacao)
router.post("/:email/:doacao", adminController.update);

module.exports = router;