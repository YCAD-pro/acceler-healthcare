import { PatientUser } from "../entities/PatientUser";
import { conn } from "../utils/bddUtils";
import { re } from "@babel/core/lib/vendor/import-meta-resolve";
import userUtils from "../utils/userUtils";

let userList = [];

export async function getAll() {
  return await conn.query("select * from user");
}

export async function getByUsername(username) {
  let rep = await conn.query("SELECT * FROM user WHERE username=?", [username]);
  console.log(rep);
  // userList.filter((patient) => patient.username === username);
  if (rep.length > 0) {
    return rep[0];
  }
  return "Patient not found";
}

export async function add(patient) {
  // userList.push(newPatient);
  // console.log("add user :", newPatient);
  // TODO Creer une fonction de recherche dans la table entiere
  console.log("userFind ?", await getByUsername(patient.username));
  if ((await getByUsername(patient.username)) !== "Patient not found") {
    return "erreur user already exist";
  }
  const result = await conn.query(
    "INSERT INTO user (username, password, firstname, lastname, mail, status,creation_date) VALUES (?,?,?,?,?,?,?)",
    [
      patient.username,
      userUtils.hashUserPassword(patient.password),
      patient.firstname,
      patient.lastname,
      patient.mail,
      "patient",
      new Date(),
    ]
  );
  console.log("result", result);
  return "patient created";
}

export function update(username, patient) {
  let patientToUpdate = getByUsername(username);
  patientToUpdate = patient;
  let newList = userList.filter((patient) => patient.username !== username);
  // get patient par username
  // map sur les nouvelles values
  // on delete le user de la base
  // on push le nouveau
  newList.push(patientToUpdate);
  userList = newList;
  return patientToUpdate;
}

export function remove(username) {
  if (getByUsername(username).length > 0) {
    userList = userList.filter((patient) => patient.username !== username);
  }
  return "user not found";
}

const populate = () => {
  console.log("PatientModel is populated");
  let pt1 = new PatientUser();
  pt1.username = "pt1";
  pt1.password = "password";
  pt1.firstname = "prenomPatient1";
  pt1.lastname = "nomPatient1";
  pt1.mail = "patient1@medoc.com";
  pt1.research = ["covid20"];
  pt1.addToTrial("diabete");
  userList.push(pt1);

  let pt2 = new PatientUser();
  pt2.username = "pt2";
  pt2.password = "password2";
  pt2.firstname = "prenomPatient2";
  pt2.lastname = "nomPatient2";
  pt2.mail = "patient2@medoc.com";
  userList.push(pt2);
};
populate();
