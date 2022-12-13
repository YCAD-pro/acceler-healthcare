import { conn } from "../utils/bddUtils";
import { getPatientById } from "./UserModel";
import { getClinicalTrialById } from "./TrialModel";

export async function getIdOfMeeting(
  doctor_id,
  trial_id,
  patient_id,
  dateOfMeeting
) {
  return await conn.query(
    "SELECT id_meeting FROM meeting WHERE (patient_id =?, doctor_id=?, date_meeting=?, clinical_trial_id = ?)",
    [patient_id, doctor_id, dateOfMeeting, trial_id]
  );
}

export async function createScheduledMeetingForDoc(
  doctor_id,
  trial_id,
  patient_id,
  dateOfMeeting
) {
  await conn.execute(
    "INSERT INTO meeting (patient_id, doctor_id, date_meeting, clinical_trial_id) VALUES (?,?,?,?)",
    [patient_id, doctor_id, dateOfMeeting, trial_id]
  );

  return await getIdOfMeeting(doctor_id, trial_id, patient_id, dateOfMeeting);
}

export async function returnScheduledMeetingByIdDoc(doctor_id) {
  let meetingsList = await conn.query(
    "SELECT * FROM meeting WHERE doctor_id = ?",
    [doctor_id]
  );

  for (let i = 0; i < meetingsList.length; i++) {
    const meeting = meetingsList[i];
    meeting.patient = await getPatientById(meeting.patient_id);
    meeting.trial = await getClinicalTrialById(meeting.clinical_trial_id);
  }
  return meetingsList;
}

export async function fillScheduledMeetingByDoc(id_meeting, report) {
  // remplir le champ report... du meeting meeting_ID
  await conn.execute("UPDATE meeting SET report=? WHERE id_meeting=?", [
    report,
    id_meeting,
  ]);
  return { updated: id_meeting };
}
