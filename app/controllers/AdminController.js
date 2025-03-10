const sql = require("../db/db_config")

module.exports = {
    get: (req, res) => {
        const userData = req.cookies.userData;

        if (!userData) {
          return res.redirect(`/login`);
        }

        const [token, username] = req.cookies.userData.split("|");

        sql.getBoolAdminUser(username).then((result) =>{
            //console.log(result);
            
            //prend la valeur de useIsAdmin
            //const isAdmin = result
            const isAdmin = result[0][0].useIsAdmin === 1

            console.log(isAdmin);
            if(isAdmin){
                sql.getAllUsers().then((userlist) =>{
                    //console.log(userlist[0]);
                    res.render('admin', {UserList: userlist[0]});
                })
            }
            else{
                res.redirect('/');
            }
        }).catch((error) => {
            console.error("Erreur SQL :", error);
            res.status(500).render('errorPage', {ErrorMessage: "Erreur interne du serveur", lien: "/"});
        });
    }
};