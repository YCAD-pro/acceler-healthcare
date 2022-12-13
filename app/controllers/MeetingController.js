import {
  createScheduledMeetingForDoc,
  fillScheduledMeetingByDoc,
  returnScheduledMeetingByIdDoc,
} from "../model/MeetingModel";

export async function getMeetingByIdDoc(req, res) {
  res.json(await returnScheduledMeetingByIdDoc(req.params.doctor_id));
}

export async function addScheduledMeeting(req, res) {
  const { docId, trialId, patientId, date } = req.body;
  res.json(await createScheduledMeetingForDoc(docId, trialId, patientId, date));
}

export async function updateScheduledMeeting(req, res) {
  const { id_meeting, report } = req.body;
  res.json(await fillScheduledMeetingByDoc(id_meeting, report));
}
