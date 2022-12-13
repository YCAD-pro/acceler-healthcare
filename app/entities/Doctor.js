import { User } from "./User";

export class Doctor extends User {
  site;

  constructor(doctor) {
    super(doctor);
    this.site = doctor.site;
  }

  save() {
    super.save();
  }
}
