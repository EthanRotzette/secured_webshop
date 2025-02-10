const sql = require("./db_config")

module.exports = {
    get: ('/', function(req, res) {
        //res.sendFile('C:/Users/pk50gbi/Documents/GitHub/secured_webshop/secured_webshop/app/views/login.html');
        //const result = sql.getUser("Blanchoud");
        //appel le fichier login.html
        //res.sendFile('login.ejs', {root:'./views'});
        res.render('login', {message:""});
    })
};