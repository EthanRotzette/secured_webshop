module.exports = {
    get: (req, res) => {
        res.sendFile('register.html', {root:'./views'});
    }
};