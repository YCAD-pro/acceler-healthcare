import { v4 } from "uuid";
import { checkCredentialUser } from "../utils/userUtils";
import { getUserRole } from "../utils/bddUtils";
import {
  addDoctorSite,
  createPatientUser,
  createUser,
  getAllDoctors,
  getAllPatients,
  getAllPatientsWithoutTrial,
  getAllProjectManagers,
  getAllUsers,
  getDoctorByUsername,
  getDoctorHaveNoSite,
  getDoctorsBySite,
  getPatientByUsername,
  getProjectManagerByUsername,
  getUserByMail,
  getUserByUsername,
  removeDoctorSite,
} from "../model/UserModel";
import { User } from "../entities/User";
import { Doctor } from "../entities/Doctor";
import { jwt } from "../utils/urlUtils";
import { PatientUser } from "../entities/PatientUser";

let userAuthenticate = [];

export async function login(req, res) {
  let { user, password } = req.body;
  //console.log("received : " + user, password); // ======DESTROY ON PROD !!!
  const retour = await checkCredentialUser(user, password);
  if (retour) {
    const role = await getUserRole(user);
    let userId;
    if (role.status === "project-manager") {
      userId = await getProjectManagerByUsername(user);
      userId = userId.pm_id;
    } else if (role.status === "doctor") {
      userId = await getDoctorByUsername(user);
      userId = userId.doctor_id;
    } else if (role.status === "patient") {
      userId = await getPatientByUsername(user);
      userId = userId[0].patient_id;
    }
    let generatedV4 = v4();
    let tokenUser = jwt.sign(
      { user, role: role.status, id: userId },
      generatedV4
    );
    userAuthenticate.push(tokenUser);
    res.json({ tokenUser });
  } else {
    res.status(401).json({ error: "Your credentials are incorrect !" });
  }
}

function test(token, passToken) {
  console.log("enter in test function...");
  console.log(passToken);
  try {
    let decoded = jwt.verify(token, passToken);
    console.log("jwt.verify ", decoded.user); // user
  } catch (err) {
    console.error("INFO : Bad secret");
  }
  console.log("-------");
  console.log(jwt.decode(token));
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
  // if patient ....
  if (req.body.status === "patient") {
    res.json(await createPatientUser(new PatientUser(req.body)));
    return;
  }
  // or
  res.json(await createUser(new User(req.body)));
}

export async function getAllPatient(req, res) {
  res.json(await getAllPatients());
}

export async function getAllPatientsWithoutClinicalTrial(req, res) {
  res.json(await getAllPatientsWithoutTrial());
}

export async function getAllDoctor(req, res) {
  res.json(await getAllDoctors());
}
export async function getDoctorsHaveNoSite(req, res) {
  res.json(await getDoctorHaveNoSite());
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
