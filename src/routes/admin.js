const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.get("/", adminController.index);

router.get("/", adminController.show);
router.put("/", adminController.update);

module.exports = router;