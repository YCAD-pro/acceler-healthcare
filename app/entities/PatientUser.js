import { User } from "./User";

export class PatientUser extends User {
  _research = [];
  _status = "Patient";

  constructor() {
    super();
  }

  addToTrial(trialName) {
    this.research.push(trialName);
  }

  get research() {
    return this._research;
  }

  set research(value) {
    this._research = value;
  }
}
