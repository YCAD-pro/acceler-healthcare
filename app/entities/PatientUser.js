import { User } from "./User";

export class PatientUser extends User {
  get gender() {
    return this._gender;
  }

  set gender(value) {
    this._gender = value;
  }

  get birthday() {
    return this._birthday;
  }

  set birthday(value) {
    this._birthday = value;
  }

  get status_marital() {
    return this._status_marital;
  }

  set status_marital(value) {
    this._status_marital = value;
  }

  get work() {
    return this._work;
  }

  set work(value) {
    this._work = value;
  }

  get description() {
    return this._description;
  }

  set description(value) {
    this._description = value;
  }

  get background() {
    return this._background;
  }

  set background(value) {
    this._background = value;
  }

  save() {
    return this;
  }

  description;
  background;
  gender;
  birthday;
  status_marital;
  work;
  patient_id;

  constructor(patient) {
    super(patient);
    this.description = patient.description;
    this.background = patient.background;
    this.gender = patient.gender;
    this.birthday = patient.birthday;
    this.status_marital = patient.status_marital;
    this.work = patient.work;
    this.patient_id = patient.patient_id;
  }
}
