const express = require("express");
const sql = require("../controllers/db_config");
const router = express.Router();
const controller = require("../controllers/LoginController");
const jwt = require("jsonwebtoken");
const strHash = require("../Utils/hash");

router.get("/", controller.get);

router.post("/auth", (req, res) => {
  const { username, password } = req.body;

  //hash la constant password
  strHash(password).then((Password) => {
    //faire un test pour entre celui de la db et hashé
    //import du mdp
    const UserPassword = sql.getPasswordUser(username).then((userResults) => {
      // Accéder au mot de passe de la base de données
      const dbPassword = userResults[0][0]?.usePassword;
      
      const saltDbPassword = ""
      for(let i = 0; i < 9; i++)
      {
        saltDbPassword += dbPassword[i];  
      }

      console.log("sel : ", saltDbPassword)
      console.log('Mot de passe de la DB:', dbPassword);
      console.log('Mot de passe hashé:', Password);

      if (dbPassword && Password === dbPassword) {
        res.redirect("/user");  // Redirection si mot de passe correct
      } else {
        //message d'erreur
        res.render('login', { message: "Le mot de passe ne correspond pas" });
      }
    })
      .catch((error) => {
        console.error("Erreur lors de la récupération du mot de passe :", error);
        res.render('login', { message: "Erreur serveur. Veuillez réessayer." });
      });
  })
    .catch((error) => {
      console.error("Erreur lors du hashage du mot de passe :", error);
      res.render('login', { message: "Erreur serveur. Veuillez réessayer." });
    });
});
module.exports = router;
