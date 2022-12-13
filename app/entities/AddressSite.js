import { conn } from "../utils/bddUtils";

export class Address_site {
  site_id;
  street;
  zip_code;
  city;
  country;

  constructor(address, siteId) {
    this.site_id = siteId;
    this.street = address.street;
    this.zip_code = address.zip_code;
    this.city = address.city;
    this.country = address.country;
  }

  async save() {
    const save = await conn.execute(
      "INSERT INTO address_site (site_id, street, zip_code, city, country) VALUES (?,?,?,?,?)",
      [this.site_id, this.street, this.zip_code, this.city, this.country]
    );
    return save;
  }

  async update() {
    const update = await conn.execute(
      "UPDATE address_site SET street = ?, zip_code = ?, city = ?, country = ? WHERE site_id = ?",
      [this.street, this.zip_code, this.city, this.country, this.site_id]
    );
    return update;
  }

  async load() {
    const load = await conn.query(
      "SELECT street, zip_code, city, country FROM address_site where site_id = ?",
      [this.site_id]
    );
    return load;
  }

  async delete() {
    await conn.execute("DELETE FROM address_site WHERE site_id = ?", [
      this.site_id,
    ]);
  }

  toString() {
    //console.log(`site_id = ${this.site_id} avec street = ${this.street}`);
    return `site_id = ${this.site_id} avec street = ${this.street}`;
  }
}
