import { app } from "../utils/urlUtils";
import {
  addScheduledMeeting,
  getMeetingByIdDoc,
  updateScheduledMeeting,
} from "../controllers/MeetingController";

app.get("/meeting/doc/:doctor_id", getMeetingByIdDoc);
app.post("/meeting/doc", addScheduledMeeting);
app.put("/meeting/doc", updateScheduledMeeting);
