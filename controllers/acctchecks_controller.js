const express = require("express");
const router = express.Router();
const AccountChecksModel = require("../models/acctchecks_model");

router.get("/me", (req, res) => {
  const profiles = new AccountChecksModel(req, res).me();
  return profiles;
});

module.exports = router;
