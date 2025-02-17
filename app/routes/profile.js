const express = require('express');
const {generateToken, auth}  = require("../auth/auth")
const router = express.Router();
const controller = require("../controllers/ProfileController");

router.get('/', auth,controller.get) 
module.exports = router;