const express = require("express");
const router = express.Router();
const BrandsModel = require("../models/brands_model");

router.get("/all-brands", async (req, res) => {
  return await (new BrandsModel(req,res)).all_brands();
});

module.exports = router;
