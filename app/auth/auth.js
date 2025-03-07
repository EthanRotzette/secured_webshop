const secretKey = require("./key/key.js")
const jwt = require('jsonwebtoken');
const sql = require("../db/db_config");
require('dotenv').config()

function generateToken(username) {
  const token = jwt.sign({ Name: username }, /*process.env.SECRET_KEY*/ secretKey, { expiresIn: '30m' });
  //console.log("Token généré : " + token);
  return token;
}

// Middleware pour vérifier les JWT
const auth = (req, res, next,) => {

  const userData = req.cookies.userData;

  if (!userData) {
    return res.redirect(`/login`);
  }

  const [token, username] = req.cookies.userData.split("|");
  //console.log("token trouvé : " + token);
  if (!token) return res.redirect(`/login`);//status(403).send('Accès refusé. Token non fourni.');    
  try {
    const decoded = jwt.verify(token, /*process.env.SECRET_KEY*/ secretKey);
    req.user = decoded;
    next();
  } catch (exception) {
    res.redirect(`/login`);
  }
};

module.exports = { generateToken, auth };