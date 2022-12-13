import { Site } from "../entities/Site";
import { conn } from "../utils/bddUtils";

export async function getAll() {
  let sites = await conn.query("select * from site");
  for (let i = 0; i < sites.length; i++) {
    let site = sites[i];
    const address = await conn.query(
      "SELECT street, zip_code, city, country FROM address_site where site_id = ?",
      [site.site_id]
    );
    site.address = address[0];
  }
  return sites;
}

export async function getAllByJoin() {
  let sites = await conn.query(
    `select * from site s join address_site ads on s.site_id = ads.site_id`
  );
  return sites;
}

export async function getByIdFlatSite(id) {
  let site = await conn.query(
    "select * from site s JOIN address_site ads on s.site_id = ads.site_id WHERE s.site_id = ?",
    [id]
  );
  if (site.length === 0) {
    return "id_site " + id + " doesn't found !";
  }

  return site[0];
}
export async function getByIdSite(id) {
  let site = await conn.query("select * from site WHERE site_id = ?", [id]);
  if (site.length === 0) {
    return "id_site " + id + " doesn't found !";
  }
  const address = await conn.query(
    "SELECT street, zip_code, city, country FROM address_site where site_id = ?",
    [site[0].site_id]
  );
  site[0].address = address[0];

  return site[0];
}

export async function getIdByName(siteName) {
  const site = await conn.query("SELECT site_id FROM site WHERE name = ?", [
    siteName,
  ]);
  if (site.length === 0) {
    return "id_site doesn't found !";
  }
  return site[0].site_id;
}

export async function create(site) {
  if ((await getIdByName(site.name)) !== "id_site doesn't found !") {
    return "Site already exist";
  }
  const siteToAdd = await conn.execute("INSERT INTO site (name) VALUE (?)", [
    site.name,
  ]);
  const site_id = await getIdByName(site.name);
  await conn.execute(
    "INSERT INTO address_site (site_id, street, zip_code, city, country) VALUES (?,?,?,?,?)",
    [
      site_id,
      site.siteStreet,
      site.siteZipCode,
      site.siteCity,
      site.siteCountry,
    ]
  );
  return { site_id };
}

export async function update(siteToUpdate) {
  const oldSite = await getByIdSite(siteToUpdate.site_id);
  if (oldSite.name !== siteToUpdate.name) {
    await conn.execute("UPDATE site SET name = ? WHERE site_id = ?", [
      siteToUpdate.name,
      siteToUpdate.site_id,
    ]);
  }
  await conn.execute(
    "UPDATE address_site SET street = ?, zip_code = ?, city = ?, country = ? WHERE site_id = ?",
    [
      siteToUpdate.street,
      siteToUpdate.zip_code,
      siteToUpdate.city,
      siteToUpdate.country,
      siteToUpdate.site_id,
    ]
  );
  return siteToUpdate;
}

export async function deleteFct(idSite) {
  if ((await getByIdSite(idSite)) === "id_site doesn't found !") {
    return "site " + idSite + " doesn't exist";
  }
  await conn.execute("DELETE FROM address_site WHERE site_id = ?", [idSite]);
  await conn.execute("DELETE FROM site WHERE site_id = ?", [idSite]);
  return { deleted_site: idSite };
}
