const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3080;
const app = express();
//const router = express.Router();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  // MY MIDDLEWARE
  process.stdout.write(
    "--------------------------------------------\nLOG: REQ "
  );
  process.stdout.write(
    " -Method : " + req.method + "   -Url : " + req.url + " \t-Body : "
  );
  console.log(req.body);
  next();
});

app.get("/", (req, res) => {
  res.send("<h1>Welcome on back</h1>");
});

app.listen(PORT, () => {
  console.log("backend listen on http://localhost:" + PORT);
  console.log("\t       or http://back.yacadmander.com:" + PORT);
});

module.exports = { app };
