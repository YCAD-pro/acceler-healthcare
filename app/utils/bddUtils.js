import Db from "mysql2-async";
const dotenv = require("dotenv").config();

console.log("CHARGEMENT CONNECTION BDD...");
let conn = new Db({
  user: process.env.USERBBD,
  password: process.env.PASSBDD,
  host: process.env.HOSTBDD,
  port: process.env.PORTBDD,
  database: process.env.DATABASE,
});

const getPasswordUser = async (username) => {
  const userPassInBDD = await conn.query(
    "SELECT password FROM user WHERE username=?",
    [username]
  );
  if (userPassInBDD.length > 0) {
    return userPassInBDD[0].password;
  } else {
    return "user not find";
  }
};

const getUserRole = async (username) => {
  console.log("in getuser role");
  let userRole = await conn.query(
    "select status from user WHERE username = ?",
    [username]
  );
  return userRole[0];
};

conn.connect;
module.exports = { conn, getPasswordUser, getUserRole };
