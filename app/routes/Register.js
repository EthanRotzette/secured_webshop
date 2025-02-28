const express = require("express");
const strHash = require("../Utils/hash");
const router = express.Router();
const controller = require("../controllers/RegisterController");
const GenSalt = require("../Utils/GenerateSalt");
const sql = require("../db/db_config");
const PairOrNot = require("../Utils/PairOrNot");
const Bcrypt = require("bcrypt");

router.get("/", controller.get);

router.post("/create", (req, res) => {
  const UserName = req.body.username;
  const Password = req.body.password;
  const ConfirmPassword = req.body.ConfirmPassword;

  sql.getNameUser(UserName).then((result) => {

    const DbUserName = result[0][0]?.useName

    if(DbUserName === UserName){
      return res.status(404).render("register", {
        message: "Cet utilisateur existe déjà",
      });
    }else{
      if (Password.length > 9) {
        if (Password === ConfirmPassword) {
          if (PairOrNot(UserName)) {
            strHash(req.body.password).then((Password) => {
              if (UserName == null || Password == null) {
                return res.status(404).render("register", {
                  message: "Remplissez les champs"
                });
              }
    
              //génération du sel
              const salt = GenSalt(10);
    
              //défini un regex qui autorise les lettres majuscules et minuscules, les chiffres, les accents et les espaces
              const regex = /^[a-zA-ZÀ-ÿ0-9 ]+$/;
    
              if (!regex.test(UserName) || !regex.test(Password)) {
                return res.status(404).render("register", {
                  message: "Les caractères spéciaux ne sont pas autorisés",
                });
              }
    
              try {
                sql.InsertNewUser(UserName, salt + Password).then((_) => {
                  res.redirect("/login");
                });
              } catch (error) {
                console.log("error : ", error);
                res
                  .status(404)
                  .render("register", { message: "Le nom existe déjà" });
              }
            });
            //esle du PairOrNot
          } else {
            //défini un regex qui autorise les lettres majuscules et minuscules, les chiffres, les accents et les espaces
            const regex = /^[a-zA-ZÀ-ÿ0-9 ]+$/;
    
            if (!regex.test(UserName) || !regex.test(Password)) {
              return res.status(404).render("register", {
                message: "Les caractères spéciaux ne sont pas autorisés",
              });
            }
    
            Bcrypt.hash(Password, 10).then((hashedSaltedPassword) => {
              try {
                sql.InsertNewUser(UserName, hashedSaltedPassword).then((_) => {
                  res.redirect("/login");
                });
              } catch (error) {
                console.log("error : ", error);
                res
                  .status(404)
                  .render("register", { message: "Le nom existe déjà" });
              }
            });
          }
          //else de la condition de la vérification du mdp avec le mdp de confirmation
        } else {
          return res.status(404).render("register", {
            message: "Veuillez confirmer le mot de passe",
          });
        }
      } else {
        return res.status(404).render("register", {
          message: "Veuillez saisir un mot de passe avec plus de 9 caractères",
        });
      }
    }
  })


});

module.exports = router;
