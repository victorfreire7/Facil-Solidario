const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.get("/", adminController.index);

router.get("/:id", adminController.show);
router.put("/:id", adminController.update);

module.exports = router;