const secretKey = require("./key/key.js")
const jwt = require('jsonwebtoken');
const sql = require("../db/db_config");

function generateToken(username) {
  const token = jwt.sign({ Name: username }, secretKey, { expiresIn: '30m' });
  console.log("Token généré : " + token);
  return token;
}

// Middleware pour vérifier les JWT
const auth = (req, res, next) => {

  console.log(req.query.username)

    sql.getTokenUser(req.query.username).then((result) =>{
      const token = result[0][0]?.useToken
      console.log("token trouvé : " + token);
      if (!token) return res.status(403).send('Accès refusé. Token non fourni.');    
      try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
      } catch (exception) {
        res.status(400).send('Token non valide.');
      }
    })
  };

module.exports = {generateToken, auth};