module.exports = {
    get: (req, res) => {
        //res.sendFile('register.ejs', {root:'./views'});
        res.render('register', {message: ""});
    }
};