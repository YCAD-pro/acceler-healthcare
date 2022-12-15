import { conn } from "../utils/bddUtils";
import { checkUserPassword, hashUserPassword } from "../utils/userUtils";

// ======================= ALL USER TYPE ========================>
export async function getAllUsers() {
  return await conn.query("SELECT * FROM user");
}

export async function getUserByUsername(username) {
  const userToFind = await conn.query("SELECT * FROM user WHERE username = ?", [
    username,
  ]);
  if (userToFind.length < 1) {
    return "No user with username " + username;
  }
  return userToFind[0];
}

export async function getDoctorByUsername(username) {
  const userToFind = await conn.query(
    "SELECT * FROM doctor WHERE username = ?",
    [username]
  );
  if (userToFind.length < 1) {
    return "No user with username " + username;
  }
  return userToFind[0];
}

export async function getProjectManagerByUsername(username) {
  const userToFind = await conn.query(
    "SELECT * FROM project_manager WHERE username = ?",
    [username]
  );
  if (userToFind.length < 1) {
    return "No user with username " + username;
  }
  return userToFind[0];
}

export async function getUserByMail(userMail) {
  const userToFind = await conn.query("SELECT * FROM user WHERE mail = ?", [
    userMail,
  ]);
  if (userToFind.length < 1) {
    return "No user with mail " + userMail;
  }
  return userToFind[0];
}

export async function createPatientUser(patient) {
  // modif password to generate...
  patient.password = "password";
  // generate a name mask
  const mask = patient.firstname + patient.lastname;
  await createUser(patient);
  await conn.execute(
    "INSERT INTO patient (username, patient_mask) VALUES (?,?)",
    [patient.username, mask]
  );
  const idPatient = await getPatientByUsername(patient.username);
  await conn.execute(
    "INSERT INTO info_patient (patient_id, description, background, gender, birthday, status_marital, work) VALUES (?,?,?,?,?,?,?)",
    [
      idPatient[0].patient_id,
      patient.description,
      patient.background,
      patient.gender,
      patient.birthday,
      patient.status_marital,
      patient.work,
    ]
  );
  return idPatient[0];
}

export async function createUser(user) {
  console.log("createUser asked with:", user);
  await conn.execute(
    "INSERT INTO user (username, firstname, lastname, mail, status, password, creation_date) VALUES (?,?,?,?,?,?,?)",
    [
      user.username,
      user.firstname,
      user.lastname,
      user.mail,
      user.status,
      hashUserPassword(user.password),
      user.creationDate,
    ]
  );
  if (user.status === "doctor") {
    await createDoctor(user.username);
  } else if (user.status === "project-manager") {
    await createProjectManager(user.username);
  }
  return getUserByUsername(user.username);
}

export async function updateUser(usernameUser, user) {
  const oldUser = await getUserByUsername(usernameUser);
  if (oldUser.length < 1) {
    return "username not found";
  }
  if (!(await checkUserPassword(user.username, user.password))) {
    user.password = hashUserPassword(user.password);
  }
  await conn.execute(
    "UPDATE user SET firstname = ?, lastname=?, mail = ?, password=? WHERE username = ?",
    [user.firstname, user.lastname, user.message, user.password, user.username]
  );
  // gerer les dependance maybe ?!?
  return "user " + user.username + " updated";
}
// ======================= PATIENT TYPE ========================>
export async function getAllPatients() {
  return await conn.query("SELECT * from user WHERE status = ?", ["patient"]);
}
export async function getAllPatientsWithoutTrial() {
  return await conn.query(
    "SELECT * from user u JOIN patient p on u.username = p.username WHERE u.status = ? AND p.clinical_trial IS NULL",
    ["patient"]
  );
}

export async function getPatientsByClinicalTrial(idClinicalTrial) {
  return await conn.query(
    "SELECT * FROM user JOIN patient p on user.username = p.username WHERE status = ? and p.clinical_trial = ?",
    ["patient", idClinicalTrial]
  );
}

export async function getPatientById(idPatient) {
  const patient = await conn.query(
    "SELECT * FROM patient p JOIN user u on u.username = p.username WHERE patient_id=?",
    [idPatient]
  );
  return patient[0];
}

export async function getPatientByUsername(patientUsername) {
  return await conn.query("SELECT * FROM patient WHERE username = ?", [
    patientUsername,
  ]);
}
// ======================= DOCTOR TYPE ========================>
export async function getAllDoctors() {
  return await conn.query(
    "SELECT * from user u JOIN doctor d on u.username = d.username WHERE status = ?",
    ["doctor"]
  );
}

export async function createDoctor(username) {
  await conn.execute("INSERT INTO doctor (username) VALUE (?)", [username]);
}
export async function getDoctorHaveNoSite() {
  return await conn.query("SELECT * FROM doctor where site IS NULL");
}
export async function getDoctorsBySite(idSite) {
  return await conn.query(
    "SELECT * FROM doctor d JOIN user u on u.username = d.username WHERE site = ?",
    [idSite]
  );
}
export async function addDoctorSite(username, siteId) {
  return await conn.execute("UPDATE doctor SET site = ? WHERE username = ?", [
    siteId,
    username,
  ]);
}
export async function removeDoctorSite(username) {
  return await conn.execute("UPDATE doctor SET site = ? where doctor_id = ?", [
    null,
    username,
  ]);
}
// ======================= PM TYPE ========================>
export async function getAllProjectManagers() {
  return await conn.query("SELECT * from user WHERE status = ?", [
    "project-manager",
  ]);
}

export async function createProjectManager(username) {
  await conn.execute("INSERT INTO project_manager (username) VALUE (?)", [
    username,
  ]);
}
