import {
  create,
  deleteFct,
  getAll,
  getAllByJoin,
  getByIdFlatSite,
  getByIdSite,
  update,
} from "../model/SiteModel";
import { Site } from "../entities/Site";

export async function getAllSite(req, res) {
  const result = await getAll();
  res.json(result);
}

export async function getAllSiteByJoin(req, res) {
  res.json(await getAllByJoin());
}

export async function updateSite(req, res) {
  const siteToUpdate = new Site(req.body);
  const result = await update(siteToUpdate);
  res.json(result);
}

export async function getFlatSiteById(req, res) {
  const idSite = req.params.id;
  res.json(await getByIdFlatSite(idSite));
}
export async function getSiteById(req, res) {
  const idSite = req.params.id;
  res.json(await getByIdSite(idSite));
}

export async function createSite(req, res) {
  const siteToCreate = new Site(req.body);
  res.json(await create(siteToCreate));
}

export async function deleteSite(req, res) {
  const idSiteToDelete = req.params.id;
  res.json(await deleteFct(idSiteToDelete));
}
