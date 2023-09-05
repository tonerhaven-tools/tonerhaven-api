const express = require("express");
const router = express.Router();
const BrandsModel = require("../models/brands_model");

router.get("/all-brands", async (req, res) => {
  const all_brands = (new BrandsModel(req,res)).all_brands();
  return await all_brands;
});

module.exports = router;
