import { conn } from "../utils/bddUtils";

export class Site {
  site_id;
  name;
  street;
  zip_code;
  city;
  country;

  constructor(site) {
    this.site_id = site.site_id;
    this.name = site.name;
    this.street = site.street;
    this.zip_code = site.zip_code;
    this.city = site.city;
    this.country = site.country;
  }

  static async getAll() {
    return await conn.query("select * from site");
  }

  async getId() {
    const site = await conn.query("SELECT site_id FROM site WHERE name = ?", [
      this.name,
    ]);
    this.site_id = site[0].site_id;
  }

  async save() {
    await conn.execute(
      "INSERT INTO site (name, street, zip_code, city, country) VALUES (?,?,?,?,?)",
      [this.name, this.street, this.zip_code, this.city, this.country]
    );
    await this.getId();
  }

  async update() {
    await conn.execute(
      "UPDATE site SET name = ?, street = ?, zip_code = ?, city = ?, country = ? WHERE site_id = ?",
      [
        this.name,
        this.street,
        this.zip_code,
        this.city,
        this.country,
        this.site_id,
      ]
    );
  }

  async load() {
    const site = await conn.query("SELECT * FROM site WHERE name = ?", [
      this.site_id,
    ]);
    this.name = site[0].name;
    this.street = site[0].street;
    this.zip_code = site[0].zip_code;
    this.city = site[0].city;
    this.country = site[0].country;
  }

  async delete() {
    await conn.execute("DELETE FROM site WHERE site_id = ?", [this.site_id]);
  }
}
