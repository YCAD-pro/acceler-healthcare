import { app } from "../utils/urlUtils";
import {
  addSiteToClinicalTrial,
  addTrialToSites,
  createTrial,
  deleteTrial,
  getAllTrial,
  getAllTrialsAlive,
  getSiteToClinicalTrial,
  getTrialById,
  updateTrial,
} from "../controllers/ClinicalTrialController";

// ===============================------- Site --------=========================================
app.get("/trials", getAllTrial);
app.get("/trialsAlive", getAllTrialsAlive);
app.get("/trial/:id", getTrialById);
app.post("/trial", createTrial);
app.get("/trial-site/:trial_id", getSiteToClinicalTrial);
app.post("/trial-site/", addSiteToClinicalTrial);
app.post("/trial-sites/", addTrialToSites);
app.put("/trial/:id", updateTrial);
app.delete("/trial/:id", deleteTrial);
