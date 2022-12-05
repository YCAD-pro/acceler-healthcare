export class User {
  _username;
  _firstname;
  _lastname;
  _password;
  _mail;
  creationDate;

  constructor(username, firstname, lastname, password, mail, creationDate) {
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.password = password;
    this.mail = mail;
    creationDate == null
      ? (this.creationDate = Date.now())
      : (this.creationDate = creationDate);
  }

  get username() {
    return this._username;
  }

  set username(value) {
    this._username = value;
  }

  get firstname() {
    return this._firstname;
  }

  set firstname(value) {
    this._firstname = value;
  }

  get lastname() {
    return this._lastname;
  }

  set lastname(value) {
    this._lastname = value;
  }

  get password() {
    return this._password;
  }

  set password(value) {
    this._password = value;
  }

  get mail() {
    return this._mail;
  }

  set mail(value) {
    this._mail = value;
  }
}
