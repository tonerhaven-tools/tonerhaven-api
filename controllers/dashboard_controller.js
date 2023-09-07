const express = require("express");
const router = express.Router();
const BrandsModel = require("../models/brands_model");
const ProductsModel = require("../models/products_model");
const CategoriesModel = require("../models/categories_model");

router.get("/product-related-data", async (req, res) => {
  const all_brands = await (new BrandsModel(req,res)).all_brands();
  const categories = await (new CategoriesModel(req,res)).all_categories();
  const products   = await (new ProductsModel(req,res)).all_products();

  return res.json({
    all_brands, products, categories
  });
});

router.post("/store-product", async (req, res) => {
  res.json(req.body); // Why is this shit is empty
});

module.exports = router;
