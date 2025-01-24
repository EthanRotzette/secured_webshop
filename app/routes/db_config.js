const sql = require("mysql");
const db = sql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE,
    port:process.env.DB_PORT
})

module.exports = db;

/*
// Établir la connexion
connection.connect((err) => {
    if (err) {
      console.error('Erreur de connexion : ' + err.stack);
      return;
    }
    console.log('Connecté en tant que ID ' + connection.threadId);
  });
*/