const express = require("express");
const sql = require("../controllers/db_config");
const router = express.Router();
const controller = require("../controllers/LoginController");
const jwt = require("jsonwebtoken");

router.get("/", controller.get);

router.post("/auth", (req, res) => {
  const { username, password } = req.body;

  if (username == "" || password == "") {
    return res.status(404).sendFile("404-page.html", { root: "./views/error" });
  }

  //je (mot de passe bidon) = 9e507a6dfbf98393bbf23d487af7f1c5b2e8ea0635e3f0cddeac3a9a090a3dbe
  //hash la constant password
  const hashPassword = strHash(password);

  console.log(hashPassword);

  //faire un test pour entre celui de la db et hashé
  //import du mdp
  const UserPassword = sql.getPasswordUser(req.body.username).catch(res.status(404).json(`error, no existing users for ${username}`));
  console.log(UserPassword);

  //TODO faire le register

  res.redirect("/user");  //actualiser le lien pour rediriger vers index (et ajouter un test de connection)
});
module.exports = router;
