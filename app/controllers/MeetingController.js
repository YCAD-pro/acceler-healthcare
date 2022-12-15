import {
  createScheduledMeetingForDoc,
  fillScheduledMeetingByDoc,
  insertNewMeeting,
  returnScheduledMeetingByIdDoc,
} from "../model/MeetingModel";

export async function getMeetingByIdDoc(req, res) {
  res.json(await returnScheduledMeetingByIdDoc(req.params.doctor_id));
}

export async function addScheduledMeeting(req, res) {
  const { doctorId, trialId, patientId, date } = req.body;
  res.json(
    await createScheduledMeetingForDoc(doctorId, trialId, patientId, date)
  );
}

export async function updateScheduledMeeting(req, res) {
  const { id_meeting, report } = req.body;
  res.json(await fillScheduledMeetingByDoc(id_meeting, report));
}

export async function insertMeetingReport(req, res) {
  const { clinical_trial_id, date_meeting, doctor_id, patient_id, report } =
    req.body;
  res.json(
    await insertNewMeeting(
      clinical_trial_id,
      date_meeting,
      doctor_id,
      patient_id,
      report
    )
  );
  //res.json(req.body);
}
