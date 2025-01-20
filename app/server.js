const express = require("express");
const fs = require('fs');
const https = require("https")

const app = express();
const userRoute = require('./routes/user');
app.use('/user', userRoute);

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