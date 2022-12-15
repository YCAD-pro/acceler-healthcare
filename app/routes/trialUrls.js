import { app } from "../utils/urlUtils";
import {
  addDoctorsToTrial,
  addSiteToClinicalTrial,
  addTrialToSites,
  createThenUpdateTrialPatient,
  createTrial,
  deleteTrial,
  getAllTrial,
  getAllTrialsAlive,
  getClinicalTrialForDoctor,
  getDoctorsInClinicalTrial,
  getPatientsInClinicalTrial,
  getSiteToClinicalTrial,
  getTrialById,
  updateTrial,
  updateTrialPatient,
} from "../controllers/ClinicalTrialController";

// ===============================------- Site --------=========================================
app.get("/trials", getAllTrial);
app.get("/trialsAlive", getAllTrialsAlive);
app.get("/trial/:id", getTrialById);
app.post("/trial", createTrial);
app.get("/trial-site/:trial_id", getSiteToClinicalTrial);
app.get("/trial-doctors/:trial_id", getDoctorsInClinicalTrial);
app.get("/trials-for-doc/:doctorId", getClinicalTrialForDoctor);
app.get("/trial-patients/:trial_id", getPatientsInClinicalTrial);
app.post("/trial-doctors", addDoctorsToTrial);
app.post("/trial-site/", addSiteToClinicalTrial);
app.post("/trial-sites/", addTrialToSites);
app.post("/trial-patient/", createThenUpdateTrialPatient);
app.put("/trial-patient/", updateTrialPatient);
app.put("/trial/:id", updateTrial);
app.delete("/trial/:id", deleteTrial);
