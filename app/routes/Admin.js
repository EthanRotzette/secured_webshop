const express = require('express');
const {generateToken, auth}  = require("../auth/auth")
const router = express.Router();
const controller = require("../controllers/AdminController");
const sql = require("../db/db_config");

router.get('/',controller.get) 

router.post('/search', (req,res) => {

    const username = req.body.username;

    if (!username) {
        return res.status(400).render('admin', { UserList: [], errorMessage: "Veuillez entrer un nom d'utilisateur" });
    }

    try {
        sql.getUser(username).then((userList) =>{
            res.render('admin', { UserList: userList });
        });
    } catch (error) {
        console.error("Erreur lors de la recherche :", error);
        res.status(500).render('admin', { UserList: [], errorMessage: "Une erreur est survenue." });
    }
})

module.exports = router;