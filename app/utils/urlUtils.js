const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3080;
const app = express();
//const router = express.Router();
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const secureUrls = [
  {
    access: "project-manager",
    uri: "/secured",
  },
  {
    access: "project-manager",
    uri: "/none",
  },
  {
    access: "doctor",
    uri: "/none",
  },
];

app.use((req, res, next) => {
  // SECURITY Part
  const token = req.headers.tokenuser;
  process.stdout.write("SECURITY: -USER ");
  if (token) {
    const info = jwt.decode(token);
    process.stdout.write(info.user + "\t-ROLE " + info.role + "\n");
  } else {
    console.log("'unknow'");
  }

  // MY MIDDLEWARE
  process.stdout.write(
    "--------------------------------------------\nLOG: REQ "
  );
  process.stdout.write(
    " -Method : " + req.method + "   -Url : " + req.url + " \t-Body : "
  );
  console.log(req.body);
  //console.log("try to find the road less end :", req);

  const restricted = secureUrls.filter((obj) => {
    return obj.uri.includes(req.url);
  });
  if (restricted[0]) {
    const access = restricted[0];
    console.log("secured ressources asked (restricted= " + access.uri + ")");
    if (token) {
      const info = jwt.decode(token);
      if (
        access.access === "patient" &&
        (info.role === "patient" ||
          info.role === "doctor" ||
          info.role === "project-manager")
      ) {
        console.log("access allowed to patient ressources");
      } else if (
        access.access === "doctor" &&
        (info.role === "doctor" || info.role === "project-manager")
      ) {
        console.log("access allowed to doctor ressources");
      } else if (
        access.access === "project-manager" &&
        info.role === "project-manager"
      ) {
        console.log("access allowed to project-manager ressources");
      } else {
        console.log("you don't have rights to see this ressources");
        res.status(403);
        return;
      }
      next();
    } else {
      console.log("you don't have rights to see this ressources");
      res.status(403);
    }
  } else {
    console.log("public ressources asked");
    next();
  }
});

app.get("/", (req, res) => {
  res.send("<h1>Welcome on back</h1>");
});
// Test JWS
app.get("/secured", (req, res) => {
  //const token = req.headers.tokenuser;
  // console.log(jwt.decode(token));
  res.send("Private ressource");
});

app.listen(PORT, () => {
  console.log("backend listen on http://localhost:" + PORT);
  console.log("\t       or http://back.yacadmander.com:" + PORT);
});

module.exports = { app, jwt };
