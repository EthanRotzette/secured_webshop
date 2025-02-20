const express = require('express');
const {generateToken, auth}  = require("../auth/auth")
const router = express.Router();
const controller = require("../controllers/UserController");

router.get('/',controller.get) 
module.exports = router;