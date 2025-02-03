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
  strHash(password).then(function (hash) {
    console.log(hash);
    // Renvoie : '2f77668a9dfbf8d5848b9eeb4a7145ca94c6ed9236e4a773f6dcafa5132b2f91'
  });

  async function strHash(a, b) {
    b = b || 'SHA-256';
    var c = new TextEncoder().encode(a),
        d = await crypto.subtle.digest(b, c),
        e = Array.from(new Uint8Array(d)),
        f = e.map(function(c) {
          return c.toString(16).padStart(2, '0');
        }).join('');
    return f;
  }
  //faire un test pour entre celui de la db et hashé
  res.send(result);
});
module.exports = router;
