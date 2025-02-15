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
const getUser = async (name) =>{
    try {
        const results = await db.promise().query(`SELECT * FROM t_users where useName = "${name}";`);
        console.log(results);
        return results;
      } catch (error) {
        console.log("error : ", error);
      }
}

//requête pour avoir un utilistateur
const getPasswordUser = async (name) =>{
  try {
      const results = await db.promise().query(`SELECT usePassword FROM t_users where useName = "${name}";`);
      console.log('results', results);
      return results;
    } catch (error) {
      console.log("error : ", error);
    }
}

//requête pour incérer une nouvelle personne
const InsertNewUser = async (name, hashedPassword) =>{
  try {
      const results = await db.promise().query(`INSERT INTO t_users (useName,usePassword) VALUES ("${name}", "${hashedPassword}");`);
      console.log('results', results);
      return results;
    } catch (error) {
      console.log("error : ", error);
    }
}

module.exports = { getAllUsers,getUser,getPasswordUser,InsertNewUser };
