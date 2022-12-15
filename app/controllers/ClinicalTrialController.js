import {
  addDocinTrial,
  addPatientInTrial,
  addSite,
  create,
  deleteFct,
  findPatientsInClinicalTrial,
  getAll,
  getAllAliveTrials,
  getClinicalTrialById,
  getDocInTrial,
  getListSitesByIdTrial,
  getSite,
  getTrialForDoc,
  update,
} from "../model/TrialModel";
import { ClinicalTrial } from "../entities/ClinicalTrial";
import { PatientUser } from "../entities/PatientUser";
import { createPatientUser, getPatientByUsername } from "../model/UserModel";

export async function getAllTrial(req, res) {
  res.json(await getAll());
}

export async function getTrialById(req, res) {
  res.json(await getClinicalTrialById(req.params.id));
}

export async function createTrial(req, res) {
  const trialToCreate = new ClinicalTrial(req.body);
  trialToCreate.creationDate = new Date();
  res.json(await create(trialToCreate));
}

export async function updateTrial(req, res) {
  res.json(await update(req.params.id, req.body));
}

export async function deleteTrial(req, res) {
  res.json(await deleteFct(req.params.id));
}

export async function getSiteToClinicalTrial(req, res) {
  const trialId = req.params.trial_id;
  res.json(await getSite(trialId));
}

export async function addSiteToClinicalTrial(req, res) {
  const { clinical_trial_id, site_id } = req.body;
  res.json(await addSite(clinical_trial_id, site_id));
}

export async function getDoctorsInClinicalTrial(req, res) {
  const clinical_trial_id = req.params.trial_id;

  res.json(await getDocInTrial(clinical_trial_id));
}

export async function addDoctorsToTrial(req, res) {
  const { clinical_trial_id, doctors_id } = req.body;
  const docsInTrial = (await getDocInTrial(clinical_trial_id)).map((doc) => {
    return String(doc.doctor_id);
  });
  console.log("docsInTrial", docsInTrial);
  for (let i = 0; i < doctors_id.length; i++) {
    const doctorId = doctors_id[i];
    if (!docsInTrial.includes(doctorId)) {
      await addDocinTrial(clinical_trial_id, doctorId);
    }
    // get la liste des doc presents
  }
  res.json("ok");
}

export async function addTrialToSites(req, res) {
  let { sitesId, trialId } = req.body;
  let sitesAlreadyInTrial = await getListSitesByIdTrial(trialId);
  sitesAlreadyInTrial = sitesAlreadyInTrial.map((id) => String(id.site_id));
  for (let i = 0; i < sitesId.length; i++) {
    if (!sitesAlreadyInTrial.includes(sitesId[i])) {
      console.log(`add site ${sitesId[i]} to trial ${trialId}`);
      await addSite(trialId, sitesId[i]);
    }
  }
  res.json({ sites: sitesId, trial: trialId });
}

export async function getAllTrialsAlive(req, res) {
  res.json(await getAllAliveTrials());
}

export async function getClinicalTrialForDoctor(req, res) {
  const doctorId = req.params.doctorId;
  res.json(await getTrialForDoc(doctorId));
}

export async function createThenUpdateTrialPatient(req, res) {
  const { patient, trialId } = req.body;
  let patientToCreate = new PatientUser(patient);
  patientToCreate = await createPatientUser(patientToCreate);
  res.json(await addPatientInTrial(trialId, patientToCreate.patient_id));
}

export async function updateTrialPatient(req, res) {
  const { patientId, trialId } = req.body;
  res.json(await addPatientInTrial(trialId, patientId));
}

export async function getPatientsInClinicalTrial(req, res) {
  const trialId = req.params.trial_id;
  res.json(await findPatientsInClinicalTrial(trialId));
}
