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

const test = async () => {
  let rep = await conn.query("select * from user", (err, data) => {
    console.log("here OK");
    return data;
  });
  console.log(rep);
};
conn.connect;
module.exports = { conn, getPasswordUser };
