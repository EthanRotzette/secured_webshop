const express = require('express');
const strHash = require('../Utils/hash')
const router = express.Router();
const controller = require("../controllers/RegisterController");
const GenSalt = require("../Utils/GenerateSalt")
const sql = require("../db/db_config")

router.get('/', controller.get)

router.post('/create', (req, res) => {

    const UserName = req.body.username;
    const password = req.body.password
    const ConfirmPassword = req.body.ConfirmPassword;

    if(password === ConfirmPassword)
    {
        strHash(req.body.password).then((Password) => {
    
            if (UserName == null || Password == null) {
                return res.status(404).render('404-page',{lien:"/register"})
            }
    
            //génération du sel
            const salt = GenSalt(10);
    
            try {
                sql.InsertNewUser(UserName, (salt + Password));//.catch(res.status(404).json(`erreur dans l'insertion`));
                res.redirect("/login")    
            } catch (error) {
                console.log("error : ", error);
            }
        })
    }
    else{
        return res.status(404).render('404-page', {lien:"/register"})
    }
})


module.exports = router;