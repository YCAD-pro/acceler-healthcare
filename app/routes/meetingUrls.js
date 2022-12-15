import { app } from "../utils/urlUtils";
import {
  addScheduledMeeting,
  getMeetingByIdDoc,
  insertMeetingReport,
  updateScheduledMeeting,
} from "../controllers/MeetingController";

app.get("/meeting/pending/:doctor_id", getMeetingByIdDoc);
app.post("/meeting/", addScheduledMeeting);
app.put("/meeting/", updateScheduledMeeting);
app.post("/meeting/", insertMeetingReport);
