module.exports = {
    get: (req, res) => {
        //res.send("Ethan test");
        const userData = req.cookies.userData;

        if (!userData) {
            return res.render('index', { name: "" });
        }
        const [token, username] = req.cookies.userData.split("|");
        res.render('index', { name: username });
    }
};