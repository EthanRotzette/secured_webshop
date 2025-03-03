const express = require("express");
const sql = require("../db/db_config");
const router = express.Router();
const controller = require("../controllers/LoginController");
const strHash = require("../Utils/hash");
const { generateToken, auth } = require("../auth/auth");
const PairOrNot = require("../Utils/PairOrNot");
const Bcrypt = require("bcrypt");

router.get("/", controller.get);

router.post("/auth", (req, res) => {
  const { username, password } = req.body;

  if (PairOrNot(username)) {
    //hash la constant password
    strHash(password)
      .then((Password) => {
        //faire un test pour entre celui de la db et hashé
        //import du mdp
        sql
          .getPasswordUser(username)
          .then((userResults) => {
            // Accéder au mot de passe de la base de données
            const dbPassword = userResults[0][0]?.usePassword;

            if (!dbPassword) {
              return res.render("login", {
                message: "Cet utilisateur n'existe pas",
              });
            }

            let saltDbPassword = "";
            for (let i = 0; i < 10; i++) {
              saltDbPassword += dbPassword[i];
            }

            //console.log("sel : ", saltDbPassword);
            //console.log("Mot de passe de la DB:", dbPassword);
            //console.log("Mot de passe hashé:", Password);

            if (dbPassword && saltDbPassword + Password === dbPassword) {
              //token
              const token = generateToken(username);
              //initialise un cookie avec le token et le nom d'utilisateur
              res.cookie("userData", token + "|" + username, {
                maxAge: 900000,
                httpOnly: true,
                secure: true,
              }); // 900000 exprimé en milliseconde (15 minutes)
              // Redirection si mot de passe correct
              res.redirect(`/`);
            } else {
              //message d'erreur
              res.render("login", {
                message: "Le mot de passe ou le nom d'utilisateur est faux",
              });
            }
          })
          .catch((error) => {
            console.error(
              "Erreur lors de la récupération du mot de passe :",
              error
            );
            res.render("login", {
              message: "Le mot de passe ou le nom d'utilisateur est faux",
            });
          });
      })
      .catch((error) => {
        console.error("Erreur lors du hashage du mot de passe :", error);
        res.render("login", { message: "Erreur serveur. Veuillez réessayer." });
      });
  } else {
    sql.getPasswordUser(username).then((userResults) => {
      // Accéder au mot de passe de la base de données
      const dbPassword = userResults[0][0]?.usePassword;

      //console.log(dbPassword)

      Bcrypt.compare(password, dbPassword).then((result) => {
        if (result) {
          const token = generateToken(username);
          //initialise un cookie avec le token et le nom d'utilisateur
          res.cookie("userData", token + "|" + username, {
            maxAge: 900000,
            httpOnly: true,
            secure: true,
          }); // 900000 exprimé en milliseconde (15 minutes)
          // Redirection si mot de passe correct
          res.redirect(`/`);
        } else {
          //message d'erreur
          res.render("login", {
            message: "Le mot de passe ou le nom d'utilisateur est faux",
          });
        }
      });
    });
  }
});
module.exports = router;
