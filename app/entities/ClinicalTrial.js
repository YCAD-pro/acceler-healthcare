export class ClinicalTrial {
  get trial_id() {
    return this._trial_id;
  }

  set trial_id(value) {
    this._trial_id = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get startDate() {
    return this._startDate;
  }

  set startDate(value) {
    this._startDate = value;
  }

  get endDate() {
    return this._endDate;
  }

  set endDate(value) {
    this._endDate = value;
  }

  get molecule() {
    return this._molecule;
  }

  set molecule(value) {
    this._molecule = value;
  }

  get creationDate() {
    return this._creationDate;
  }

  set creationDate(value) {
    this._creationDate = value;
  }

  get creator() {
    return this._creator;
  }

  set creator(value) {
    this._creator = value;
  }

  get description() {
    return this._description;
  }

  set description(value) {
    this._description = value;
  }

  trial_id;
  name;
  molecule;
  startDate;
  endDate;
  creationDate;
  creator;
  status;
  description;

  setStatus() {
    if (this.startDate < new Date()) {
      this.status = "started";
    } else if (this.startDate > new Date()) {
      this.status = "pending";
    } else if (this.status === "started" && this.endDate > new Date()) {
      this.status = "finished";
    }
  }

  constructor(trial) {
    this.trial_id = trial.trial_id;
    this.name = trial.name;
    this.startDate = trial.start_date;
    this.endDate = trial.end_date;
    this.molecule = trial.molecule;
    this.creationDate = trial.creation_date;
    this.creator = trial.creator;
    this.description = trial.description;
    this.setStatus();
    // if (trial.status !== null) {
    //   this.status = trial.status;
    // } else {
    //   this.setStatus();
    // }
  }
}
