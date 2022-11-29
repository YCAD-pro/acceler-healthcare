import { app, router } from "../utils/urlUtils";
const { askUrl } = require("../controllers/ResearchController");
app.use("/research", router);
router.get("/test", askUrl);
