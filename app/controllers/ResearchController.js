const { PatientUser } = require("../entities/PatientUser");

const addPatient = (patientUser) => {
  console.log("addPatient was called");
  patientUser.lastname = "CADET";
  return "PatientUser was added";
};

const askUrl = (req, res) => {
  res.send("BLAAA");
};

module.exports = {
  addPatient,
  askUrl,
};
