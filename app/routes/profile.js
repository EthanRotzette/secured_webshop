const express = require('express');
const {generateToken, auth}  = require("../auth/auth")
const router = express.Router();
const controller = require("../controllers/ProfileController");

router.get('/', auth,controller.get)

router.get('/disconnect', auth, (req,res) =>{
    res.clearCookie("userData");
    res.redirect("/")
});

module.exports = router;