import { conn } from "../utils/bddUtils";

export class EntitiesTry {
  id_test;
  bla;
  divers;
  constructor(test) {
    this.id_test = test.id_test;
    this.bla = test.bla;
    this.divers = test.divers;
  }
  static async getById(id) {
    let et = await conn.query("SELECT * FROM test WHERE id_test = ?", [id]);

    return new EntitiesTry(et[0]);
  }

  async transform(newDivers) {
    console.log("in class ... id = ", this.id_test);
    return await conn.execute("UPDATE test SET divers=? WHERE id_test=?", [
      newDivers,
      this.id_test,
    ]);
  }

  async save() {
    console.log("before ...");
    let retBDD;
    try {
      retBDD = await conn.execute(
        "INSERT INTO test (bla, divers) VALUES (?,?)",
        [this.bla, this.divers]
      );
    } catch (err) {
      return err;
    }
    console.log(retBDD);
    return retBDD;
  }

  get id_test() {
    return this._id_test;
  }

  set id_test(value) {
    this._id_test = value;
  }

  get bla() {
    return this._bla;
  }

  set bla(value) {
    this._bla = value;
  }

  get divers() {
    return this._divers;
  }

  set divers(value) {
    this._divers = value;
  }
}
