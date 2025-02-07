const express = require('express');
const strHash = require('./Utils/hash')
const router = express.Router();
const controller = require("../controllers/RegisterController");
router.get('/', controller.get)
const GenSalt = require("../Utils/GenerateSalt")

router.post('/create', (req,res) => {

    const {UserName,Password} = req.body;

    const queryInsert = "INSERT INTO t_users (useName,usePassword) VALUES ( ?, ?)"

    if(UserName == null || Password == null)
    {
        return res.status(404).render('404-page')
    }
    //génération du sel
    const salt = GenSalt(10);
    //const SecuPasswrd = strHash(salt + Password);

    //console.log(SecuPasswrd)
})


module.exports = router;