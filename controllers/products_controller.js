const express = require("express");
const router = express.Router();
const ProductsModel = require("../models/products_model");

router.get("/all-products", async (req, res) => {
  const all_brands = (new ProductsModel(req,res)).all_products();
  return await all_brands;
});

module.exports = router;
