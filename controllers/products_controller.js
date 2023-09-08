const express = require("express");
const router = express.Router();
const ProductsModel = require("../models/products_model");

router.get("/", async (req, res) => {
  return res.json(await new ProductsModel().all_products());
});

router.get("/:id", (req, res) => {
  const product = new ProductsModel(req, res).get_product();
  return product;
});

module.exports = router;
