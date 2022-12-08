import { v4 } from "uuid";
import { checkCredentialUser } from "../utils/userUtils";
import {
  addDoctorSite,
  createUser,
  getAllDoctors,
  getAllPatients,
  getAllProjectManagers,
  getAllUsers,
  getDoctorsBySite,
  getUserByMail,
  getUserByUsername,
  removeDoctorSite,
} from "../model/UserModel";
import { User } from "../entities/User";
import { Doctor } from "../entities/Doctor";

export async function login(req, res) {
  let { user, password } = req.body;
  console.log("received : " + user, password); // ======DESTROY ON PROD !!!
  const retour = await checkCredentialUser(user, password);
  if (retour) {
    let tokenUser = v4();
    console.log(tokenUser);
    res.json({ tokenUser });
  } else {
    res.json({ error: "Your credentials are incorrect !" });
  }
}

export async function getAllUser(req, res) {
  res.json(await getAllUsers());
}
export async function getByUsername(req, res) {
  const param = req.params.username;
  if (param.indexOf("@") > 0 && param.indexOf(".") > 0) {
    res.json(await getUserByMail(param));
  } else {
    res.json(await getUserByUsername(param));
  }
}
export async function createNewUser(req, res) {
  res.json(await createUser(new User(req.body)));
}

export async function getAllPatient(req, res) {
  res.json(await getAllPatients());
}

export async function getAllDoctor(req, res) {
  res.json(await getAllDoctors());
}
export async function getAllDoctorInSite(req, res) {
  const idSite = req.params.site_id;
  res.json(await getDoctorsBySite(idSite));
}
export async function addDoctorInSite(req, res) {
  const doctor = new Doctor(req.body);
  const siteId = req.params.siteId;
  res.json(await addDoctorSite(doctor.username, siteId));
}
export async function removeDoctorInSite(req, res) {
  const doctor = req.params.username;
  res.json(await removeDoctorSite(doctor));
}

export async function getAllProjectManager(req, res) {
  res.json(await getAllProjectManagers());
}
