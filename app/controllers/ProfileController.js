module.exports = {
    get: (req, res) => {
        //res.send("Ethan test");
        res.render('profile', {name:req.query.username});
    }
};