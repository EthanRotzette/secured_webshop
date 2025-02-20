module.exports = {
    get: (req, res) => {
        //res.send("Ethan test");
        const userData = req.cookies.userData;

        if (!userData) {
          return res.redirect(`/login`);
        }
        
        const [token, username] = req.cookies.userData.split("|");
        res.render('profile', {name: username});
    }
};