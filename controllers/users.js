const express = require("express");
const router = express.Router();
const app = express();
const Database = require("../configs/knexfile");
const UsersModel = require("../models/UsersModel");
const Auth = require("../models/Auth");

router.get("/", (request, response) => {
  Database("users")
    .select()
    .then((rows) => {
      response.json(rows);
    })
    .catch((error) => {
      console.error(error);
      response.status(500).json({ error: "Internal server error" });
    });
});

router.post("/login", async (request, response) => {
  const users = new UsersModel(request, response);
  return await users.login();
});

router.post("/register", async (request, response) => {
  const users = new UsersModel(request, response);
  return await users.register();
});

router.post("/logout", async (request, response) => {
  const users = new UsersModel(request, response);
  return await users.logout();
});

module.exports = router;
