import { conn } from "../utils/bddUtils";
import { getByIdSite } from "./SiteModel";
import { query } from "express";

export async function getAll() {
  let trials = await conn.query("SELECT * FROM clinical_trial");
  return await addStats(trials);
}

export async function getAllAliveTrials() {
  let trials = await conn.query(
    "SELECT * FROM clinical_trial WHERE end_date > CURRENT_DATE"
  );
  return await addStats(trials);
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
  const creatorUser = await conn.query(
    "SELECT * FROM project_manager where pm_id = ?",
    [askedTrial[0].creator]
  );
  askedTrial[0].creator = creatorUser[0];
  return askedTrial[0];
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
