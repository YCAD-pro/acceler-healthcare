import { app } from "../utils/urlUtils";
import {
  addSiteToClinicalTrial,
  createTrial,
  deleteTrial,
  getAllTrial,
  getSiteToClinicalTrial,
  getTrialById,
  updateTrial,
} from "../controllers/ClinicalTrialController";

// ===============================------- Site --------=========================================
app.get("/trials", getAllTrial);
app.get("/trial/:id", getTrialById);
app.post("/trial", createTrial);
app.get("/trial-site/:trial_id", getSiteToClinicalTrial);
app.post("/trial-site/", addSiteToClinicalTrial);
app.put("/trial/:id", updateTrial);
app.delete("/trial/:id", deleteTrial);
