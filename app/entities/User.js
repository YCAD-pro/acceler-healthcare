import { conn } from "../utils/bddUtils";
import hashUserPassword from "../utils/userUtils";

export class User {
  username;
  firstname;
  lastname;
  password;
  mail;
  status;
  creationDate;

  constructor(user) {
    this.username = user.username;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.password = user.password;
    this.mail = user.mail;
    this.status = user.status;
    user.creationDate == null
      ? (this.creationDate = new Date())
      : (this.creationDate = user.creationDate);
  }

  save() {
    conn.execute();
  }

  create() {
    conn.execute(
      "INSERT INTO user (username, firstname, lastname, mail, status, password, creation_date) VALUES (?,?,?,?,?,?,?)",
      [
        this.username,
        this.firstname,
        this.lastname,
        this.mail,
        this.status,
        hashUserPassword(this.password),
        this.creationDate,
      ]
    );
  }
}
