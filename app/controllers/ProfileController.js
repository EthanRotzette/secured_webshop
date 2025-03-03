const sql = require("../db/db_config")

module.exports = {
    get: (req, res) => {
        //res.send("Ethan test");
        const userData = req.cookies.userData;

        if (!userData) {
          return res.redirect(`/login`);
        }
        const [token, username] = req.cookies.userData.split("|");

        sql.getBoolAdminUser(username).then((result) =>{          
          //prend la valeur de useIsAdmin
          const isAdmin = result[0][0].useIsAdmin === 1

          res.render('profile', {name: username, isAdmin: isAdmin});

      }).catch((error) => {
          console.error("Erreur SQL :", error);
          res.status(500).render('errorPage', {ErrorMessage: "Erreur interne du serveur", lien: "/homepage"});
      });
    }
};