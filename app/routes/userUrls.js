import { app } from "../utils/urlUtils";
import {
  addDoctorInSite,
  createNewUser,
  getAllDoctor,
  getAllDoctorInSite,
  getAllPatient,
  getAllProjectManager,
  getAllUser,
  getByUsername,
  login,
  removeDoctorInSite,
} from "../controllers/UserController";

app.post("/login", login);

app.get("/users", getAllUser);
app.get("/user/:username", getByUsername);
app.post("/user", createNewUser);

app.get("/patients", getAllPatient);

app.get("/doctors", getAllDoctor);
app.get("/site_doctors/:site_id", getAllDoctorInSite);
app.post("/site_doctors/add/:siteId", addDoctorInSite);
app.delete("/site_doctors/remove/:username", removeDoctorInSite);

app.get("/pms", getAllProjectManager);
