const express = require("express");
const router = express.Router();
const ProfilesModel = require("../models/profiles_model");

router.get("/ping/:id", (req, res) => {
  const profiles = new ProfilesModel(req, res).ping();
  return profiles;
});

module.exports = router;
