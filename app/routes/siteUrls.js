import { app } from "../utils/urlUtils";
import {
  getAllSite,
  getSiteById,
  createSite,
  getAllSiteByJoin,
  updateSite,
  deleteSite,
  getFlatSiteById,
} from "../controllers/SiteController";

// ===============================------- Site --------=========================================
app.get("/sites", getAllSite);
app.get("/flatSites", getAllSiteByJoin);
app.get("/flatSite/:id", getFlatSiteById);
app.get("/site/:id", getSiteById);
app.post("/site", createSite);
app.put("/site", updateSite);
app.delete("/site/:id", deleteSite);
