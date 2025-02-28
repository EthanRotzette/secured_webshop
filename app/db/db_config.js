require('dotenv').config()
const sql = require("mysql2");
const db = sql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

///////       TOUTE LES REQUÊTES SERONT EXÉCUTÉE ICI        \\\\\\\\

//exemple de requête SQL
const getAllUsers = async () => {
  try {
    const results = await db.promise().query("SELECT * FROM t_users;");
    // console.log('results : ', results);
    return results;
  } catch (error) {
    console.log("error : ", error);
  }
};

//requête pour avoir un utilistateur
const getUser = async (name) => {
  try {
    // le ? est une manière de se protéger contre les injections SQL
    const [rows] = await db.promise().query("SELECT * FROM t_users WHERE useName LIKE ?",[`%${name}%`]); 
    return rows;
  } catch (error) {
    console.error("error : ", error);
    return [];
  }
}

//requête pour avoir un utilistateur
const getPasswordUser = async (name) => {
  try {
    const results = await db.promise().query(`SELECT usePassword FROM t_users where useName = "${name}";`);
    return results;
  } catch (error) {
    console.log("error : ", error);
  }
}

//requête pour incérer une nouvelle personne
const InsertNewUser = async (name, hashedPassword) => {
  try {
    const results = await db.promise().query(`INSERT INTO t_users (useName,usePassword) VALUES ("${name}", "${hashedPassword}");`);
    return results;
  } catch (error) {
    console.log("error : ", error);
  }
}
//incère un token
const InsertToken = async (token, username) => {
  try {
    const results = await db.promise().query(`UPDATE t_users SET useToken = "${token}" WHERE useName = "${username}";`);
    return results;
  } catch (error) {
    console.log("error : ", error);
  }
}
//trouve un token en fonction d'un nom
const getTokenUser = async (name) => {
  try {
    const results = await db.promise().query(`SELECT useToken FROM t_users WHERE useName = "${name}";`);
    return results;
  } catch (error) {
    console.log("error : ", error);
  }
}

//requête pour savoir si un utilisateur est admin
const getBoolAdminUser = async (name) => {
  try {
    // le ? est une manière de se protéger contre les injections SQL3
    const result = await db.promise().query(`SELECT useIsAdmin FROM t_users WHERE useName = ? `,name); 
    return result;
  } catch (error) {
    console.error("error : ", error);
    return [];
  }
}

// requête pour avoir le nom d'un utilisateur
const getNameUser = async (name) => {
  try {
    // le ? est une manière de se protéger contre les injections SQL3
    const result = await db.promise().query(`SELECT useName FROM t_users WHERE useName = ? `,name); 
    return result;
  } catch (error) {
    console.error("error : ", error);
    return [];
  }
}

module.exports = { getAllUsers, getUser, getPasswordUser, InsertNewUser, InsertToken, getTokenUser, getBoolAdminUser, getNameUser };
