const sql = require("../db/db_config")

module.exports = {
    get: (req, res) => {
        //res.send("Ethan test");
        res.render('index', {name:req.query.username});
    }
};