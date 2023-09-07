const express = require("express");
const router = express.Router();
const ProductsModel = require("../models/products_model");

router.get("/all-products", async (req, res) => {
  return res.json(await (new ProductsModel()).all_products());
});

module.exports = router;
