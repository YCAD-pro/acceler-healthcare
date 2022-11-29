import { app, router } from "../utils/urlUtils";
import {
  getAllPatient,
  addPatient,
  getPatientByUsername,
  updatePatient,
  deletePatient,
} from "../controllers/PatientController";
app.use("/user", router);

router.get("/patients", getAllPatient);
router.get("/patient/:username", getPatientByUsername);
router.post("/patient", addPatient);
router.put("/patient/:username", updatePatient);
router.delete("/patient/:username", deletePatient);
