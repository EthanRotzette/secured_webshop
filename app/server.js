const express = require("express");


const app = express();
const userRoute = require('./routes/User');
app.use('/user', userRoute);

//Ajouter la licence

// Démarrage du serveur
app.listen(443, () => {
    console.log('Server running on port 443');
});