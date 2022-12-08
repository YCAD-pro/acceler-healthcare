import { User } from "./User";

export class Doctor extends User {
  get site() {
    return this._site;
  }

  set site(value) {
    this._site = value;
  }
  site;
  constructor(doctor) {
    super(doctor);
    this.site = doctor.site;
  }
}
