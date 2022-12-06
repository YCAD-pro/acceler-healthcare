import { app, router } from "../utils/urlUtils";
import {
  getAllSite,
  getSiteById,
  createSite,
  getAllSiteByJoin,
  updateSite,
  deleteSite,
} from "../controllers/SiteController";
app.use("/site", router);

// ===============================------- Site --------=========================================
router.get("/sites", getAllSite);
router.get("/flatSites", getAllSiteByJoin);
router.get("/:id", getSiteById);
router.post("/", createSite);
router.put("/:id", updateSite);
router.delete("/:id", deleteSite);
