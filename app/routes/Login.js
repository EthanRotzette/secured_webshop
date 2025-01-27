const express = require('express');
const sql = require("../controllers/db_config")
const router = express.Router();
const controller = require("../controllers/LoginController");
router.get('/', controller.get) 
module.exports = router;