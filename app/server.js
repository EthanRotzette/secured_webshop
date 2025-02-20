const express = require("express");
const cookieParser = require("cookie-parser");
const fs = require('fs');
const https = require("https")

const app = express();
//appel un middleware pour analyser les données d'un formulaire envoyé
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//pour utiliser le moteur de template ejs
app.set('view engine', 'ejs');

//route pour la homepage
const userRoute = require('./routes/User');
app.use('/homepage', userRoute);

//route pour le profile
const profileRoute = require('./routes/Profile');
app.use('/profile', profileRoute);

//route pour le registre
const registerRoute = require('./routes/Register');
app.use('/register', registerRoute);

//route pour le login
const loginRoute = require('./routes/Login');
app.use('/login', loginRoute);

//route pour la page admin
const adminRoute = require('./routes/Admin');
app.use('/admin', adminRoute);

//Ajouter la licence
// Charger les clés SSL
const privateKey = fs.readFileSync('../keys/privkey.key', 'utf8');
const certificate = fs.readFileSync('../keys/certificate.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };
// Créer le serveur HTTPS
const httpsServer = https.createServer(credentials, app);

// Démarrage du serveur
httpsServer.listen(443, () => {
    console.log('Server running on port 443 with https');
});