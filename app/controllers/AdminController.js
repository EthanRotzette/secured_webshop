const sql = require("../db/db_config")

module.exports = {
    get: (req, res) => {
        const userData = req.cookies.userData;

        if (!userData) {
          return res.redirect(`/login`);
        }

        const [token, username] = req.cookies.userData.split("|");

        sql.getBoolAdminUser(username).then((result) =>{
            //onsole.log(result);
            
            //prend la valeur de useIsAdmin
            const isAdmin = result[0]?.useIsAdmin
            
            //console.log(isAdmin);
            if(isAdmin === 1){
                res.render('admin', {UserList: ""});
            }
            else{
                res.redirect('/homepage');
            }
        }).catch((error) => {
            console.error("Erreur SQL :", error);
            res.status(500).render('errorPage', {ErrorMessage: "Erreur interne du serveur", lien: "/homepage"});
        });
    }
};