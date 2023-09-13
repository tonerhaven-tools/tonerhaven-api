const express = require("express");
const router = express.Router();
const FedexModel = require("../models/shipping/fedex_model")

router.get("/fedex-estimate-cost", async (req, res) => {
  const fedex = new FedexModel(req,res);
  return res.json(await fedex.refresh_token());
});

module.exports = router;

