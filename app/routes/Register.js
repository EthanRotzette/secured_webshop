const express = require('express');
const strHash = require('../Utils/hash')
const router = express.Router();
const controller = require("../controllers/RegisterController");
const GenSalt = require("../Utils/GenerateSalt")
const sql = require("../db/db_config")

router.get('/', controller.get)

router.post('/create', (req, res) => {

    const UserName = req.body.username;
    const Password = req.body.password
    const ConfirmPassword = req.body.ConfirmPassword;

    if (Password === ConfirmPassword) {
        strHash(req.body.password).then((Password) => {

            if (UserName == null || Password == null) {
                return res.status(404).render('errorPage', { ErrorMessage: "Remplissez les champs",lien: "/register" })
            }

            //génération du sel
            const salt = GenSalt(10);

            //défini un regex qui autorise les lettres majuscules et minuscules, les chiffres, les accents et les espaces
            const regex = /^[a-zA-ZÀ-ÿ0-9 ]+$/;

            if (!regex.test(UserName) || !regex.test(Password)) {
                return res.status(404).render('register', { message: "Les caractères spéciaux ne sont pas autorisés" })
            }

            try {
                sql.InsertNewUser(UserName, (salt + Password)).then((_) => {
                    res.redirect("/login")
                })
            } catch (error) {
                console.log("error : ", error);
                res.status(404).render('register', { message: "Le nom existe déjà" })
            }
        })
    }
    else {
        return res.status(404).render('register', { message: "Veuillez confirmer le mot de passe" })
    }
})


module.exports = router;