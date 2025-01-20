const express = require("express");
const fs = require('fs');
const https = require("https")

const app = express();
//route pour tester
const userRoute = require('./routes/User');
app.use('/user', userRoute);

//route pour le registre
const registerRoute = require('./routes/Register');
app.use('/Register', registerRoute);

//route pour le login
const loginRoute = require('./routes/Login');
app.use('/Login', loginRoute);

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