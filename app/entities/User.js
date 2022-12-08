export class User {
  _username;
  _firstname;
  _lastname;
  _password;
  _mail;
  _status;
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

  get status() {
    return this._status;
  }

  set status(value) {
    this._status = value;
  }
}
