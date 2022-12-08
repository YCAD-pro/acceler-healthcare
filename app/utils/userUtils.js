import bcrypt from "bcrypt";
import bddUtils from "./bddUtils";
const SALT = 5;

const hashUserPassword = (password) => {
  return bcrypt.hashSync(password, SALT);
};

const checkUserPassword = async (username, sendedPassword) => {
  const pwdInDB = await bddUtils.getPasswordUser(username);
  return bcrypt.compareSync(sendedPassword, pwdInDB);
};

const checkCredentialUser = async (name, password) => {
  if (name.includes("@") && name.includes(".")) {
    console.log("this is an email");
  } else {
    console.log("this is a username");
    let retour = await checkUserPassword(name, password);
    console.log(retour);
    return retour;
  }
};

module.exports = {
  hashUserPassword,
  checkUserPassword,
  checkCredentialUser,
};
