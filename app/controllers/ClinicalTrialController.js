import {
  addSite,
  create,
  deleteFct,
  getAll,
  getById,
  getSite,
  update,
} from "../model/TrialModel";
import { ClinicalTrial } from "../entities/ClinicalTrial";

export async function getAllTrial(req, res) {
  res.json(await getAll());
}

export async function getTrialById(req, res) {
  res.json(await getById(req.params.id));
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
