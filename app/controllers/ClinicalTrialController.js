import {
  create,
  deleteFct,
  getAll,
  getAllByJoin,
  getById,
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
  const idSite = req.params.id;
  const siteToUpdate = new Site(req.body);
  const result = await update(idSite, siteToUpdate);
  res.json(result);
}

export async function getSiteById(req, res) {
  const idSite = req.params.id;
  res.json(await getById(idSite));
}

export async function createSite(req, res) {
  const siteToCreate = new Site(req.body);
  res.json(await create(siteToCreate));
}

export async function deleteSite(req, res) {
  const idSiteToDelete = req.params.id;
  res.json(await deleteFct(idSiteToDelete));
}
