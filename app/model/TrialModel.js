import { conn } from "../utils/bddUtils";
import { getByIdSite } from "./SiteModel";
import { query } from "express";
import { ClinicalTrial } from "../entities/ClinicalTrial";

export async function getAll() {
  let trials = await conn.query("SELECT * FROM clinical_trial");
  // trials.forEach((trial) => {
  //   if (trial.status === null) {
  //     let tr = new ClinicalTrial(trial);
  //     console.log("tr=>", tr);
  //     //trial.status = "OKAY";
  //   }
  // });
  let trialsObj = trials.map((trial) => new ClinicalTrial(trial));
  return await addStats(trialsObj);
}

export async function getAllAliveTrials() {
  let trials = await conn.query(
    "SELECT * FROM clinical_trial WHERE end_date > CURRENT_DATE"
  );
  let trialsObj = trials.map((trial) => new ClinicalTrial(trial));
  return await addStats(trialsObj);
}

async function addStats(trials) {
  for (let i = 0; i < trials.length; i++) {
    let trial = trials[i];
    const nbDoc = await conn.query(
      "SELECT count(*) as nb FROM clinical_trial_doctor WHERE clinical_trial_id = ?",
      [trial.trial_id]
    );
    trial.doc_length = nbDoc[0].nb;
    const nbPatient = await conn.query(
      "SELECT count(*) as nb FROM patient WHERE clinical_trial = ?",
      [trial.trial_id]
    );
    trial.patient_length = nbPatient[0].nb;
  }
  return trials;
}

export async function getClinicalTrialById(idTrial) {
  let askedTrial = await conn.query(
    "SELECT * FROM clinical_trial ct WHERE ct.trial_id = ?",
    [idTrial]
  );
  if (askedTrial.length < 1) {
    return "Clinical Trial with id = " + idTrial + " doesn't exist";
  }
  askedTrial = new ClinicalTrial(askedTrial[0]);
  const creatorUser = await conn.query(
    "SELECT * FROM project_manager where pm_id = ?",
    [askedTrial.creator]
  );
  askedTrial.creator = creatorUser[0];
  return askedTrial;
}

export async function create(trial) {
  // tester qu'il n'existe pas...
  await conn.execute(
    "INSERT INTO clinical_trial (name, molecule, start_date, end_date, creator, status, description, creation_date) VALUES (?,?,?,?,?,?,?,?)",
    [
      trial.name,
      trial.molecule,
      trial.startDate,
      trial.endDate,
      trial.creator,
      trial.status,
      trial.description,
      trial.creationDate,
    ]
  );
  return { status: "created" };
}

export async function update(idTrial, trialToUpdate) {
  if (
    (await getClinicalTrialById(idTrial))
      .toString()
      .startsWith("Clinical Trial with id")
  ) {
    return "Clinical trial " + idTrial + " doesn't exist";
  }
  return await conn.execute(
    "UPDATE clinical_trial SET status = ?, description = ?, end_date = ? WHERE trial_id = ?",
    [
      trialToUpdate.status,
      trialToUpdate.description,
      trialToUpdate.end_date,
      idTrial,
    ]
  );
}

export async function deleteFct(idTrial) {
  if (
    (await getClinicalTrialById(idTrial))
      .toString()
      .startsWith("Clinical Trial with id")
  ) {
    return "Clinical trial " + idTrial + " doesn't exist";
  }
  await conn.execute("DELETE FROM clinical_trial WHERE trial_id = ?", [
    idTrial,
  ]);
  return { deleted_trial: idTrial };
}

export async function getSite(idTrial) {
  const listSite = await conn.query(
    "SELECT * FROM clinical_trial_site WHERE clinical_trial_id = ?",
    [idTrial]
  );
  console.log("listSite", listSite);
  let listRetour = [];
  for (let i = 0; i < listSite.length; i++) {
    listRetour.push(await getByIdSite(listSite[i].site_id));
  }
  return listRetour;
}

export async function addSite(idTrial, idSite) {
  await conn.execute(
    "INSERT INTO clinical_trial_site (clinical_trial_id, site_id) VALUES (?,?)",
    [idTrial, idSite]
  );
  return { trial_id: idTrial, site_id: idSite };
}

export async function getListSitesByIdTrial(idTrial) {
  return await conn.query(
    "SELECT site_id FROM clinical_trial_site WHERE clinical_trial_id=?",
    [idTrial]
  );
}

export async function getDocInTrial(idTrial) {
  return await conn.query(
    "SELECT doctor_id FROM clinical_trial_doctor WHERE clinical_trial_id=?",
    [idTrial]
  );
}

export async function addDocinTrial(idTrial, docId) {
  return await conn.execute(
    "INSERT INTO clinical_trial_doctor (clinical_trial_id, doctor_id) VALUES (?,?)",
    [idTrial, docId]
  );
}

export async function addPatientInTrial(idTrial, patientId) {
  console.log("asked add patient " + patientId + " in trial " + idTrial);
  return await conn.execute(
    "UPDATE patient SET clinical_trial=? WHERE patient_id=?",
    [idTrial, patientId]
  );
}

export async function getTrialForDoc(doctorId) {
  return await conn.query(
    "SELECT * FROM clinical_trial_doctor ctd JOIN clinical_trial ct on ctd.clinical_trial_id = ct.trial_id WHERE doctor_id=?",
    [doctorId]
  );
}

export async function findPatientsInClinicalTrial(trialId) {
  return await conn.query(
    "SELECT * FROM patient p JOIN user u ON p.username = u.username WHERE clinical_trial = ?",
    [trialId]
  );
}
