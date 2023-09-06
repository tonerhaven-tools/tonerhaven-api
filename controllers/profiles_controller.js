const express = require("express");
const router = express.Router();
const ProfilesModel = require("../models/profiles_model");

router.get("/ping", (req, res) => {
  const profiles = new ProfilesModel(req, res).ping();
  return profiles;
});

router.post("/create", (req, res) => {
  const profiles = new ProfilesModel(req, res).add();
  return profiles;
});

router.put("/:id", (req, res) => {
  const profiles = new ProfilesModel(req, res).update();
  return profiles;
});

router.get("/:authId", (req, res) => {
  const profiles = new ProfilesModel(req, res).get();
  return profiles;
});

module.exports = router;
