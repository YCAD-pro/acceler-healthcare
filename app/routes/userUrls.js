import { app } from "../utils/urlUtils";
import {
  addDoctorInSite,
  createNewUser,
  getAllDoctor,
  getAllDoctorInSite,
  getAllPatient,
  getAllPatientsWithoutClinicalTrial,
  getAllProjectManager,
  getAllUser,
  getByUsername,
  getDoctorsHaveNoSite,
  login,
  removeDoctorInSite,
} from "../controllers/UserController";

app.post("/login", login);

app.get("/users", getAllUser);
app.get("/user/:username", getByUsername);
app.post("/user", createNewUser);

app.get("/patients", getAllPatient);
app.get("/patientsWithoutTrial", getAllPatientsWithoutClinicalTrial);

app.get("/doctors", getAllDoctor);
app.get("/doctorsNoSite", getDoctorsHaveNoSite);
app.get("/site_doctors/:site_id", getAllDoctorInSite);
app.post("/site_doctors/add/:siteId", addDoctorInSite);
app.delete("/site_doctors/remove/:username", removeDoctorInSite);

app.get("/pms", getAllProjectManager);

// app.post("/testPatient", (req, res) => {
//   const patient = new PatientUser(req.body);
//   res.json(patient.save());
// });
// app.post("/testUser", (req, res) => {
//   const patient = new Doctor(req.body);
//   res.json(patient.save());
// });
// app.post("/testTest", (req, res) => {
//   const test = new EntitiesTry(req.body);
//   res.json(test.save());
// });
// app.get("/getTest/:id", async (req, res) => {
//   const et = await EntitiesTry.getById(req.params.id);
//   console.log("et = ", et);
//   return res.json(et);
// });
// app.put("/getTest/:id", async (req, res) => {
//   let et = await EntitiesTry.getById(req.params.id);
//   let pet = new EntitiesTry(et);
//   await pet.transform("mon nouveau divers qui roule :P");
//   return res.json(await EntitiesTry.getById(req.params.id));
// });
