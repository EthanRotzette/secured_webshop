const sql = require("./db_config")

module.exports = {
    get: (req, res) => {
        //res.send("Ethan test");
        res.render('index', {name:req.body.username});
    }
};