const path            = require('path');
const express         = require("express");
const router          = express.Router();
const multer          = require('multer');
const BrandsModel     = require("../models/brands_model");
const ProductsModel   = require("../models/products_model");
const CategoriesModel = require("../models/categories_model");

// Store a new Product
router.post("/store-product", async (req, res) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'storage/uploads/products/'),
    filename: (req, file, cb) => cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  });
  const upload = multer({ storage: storage }).single('thumbnail');
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const insert = await (new ProductsModel(req, res)).store_product(req.file.filename);
    return res.json(insert);
  });
});

// Update a Product
router.post("/update-product", async(req,res) => {
  const Model = new ProductsModel(req, res);
  return res.json(await Model.update_product());
});

// Delete a Product
router.post("/destroy-product", async(req,res) => {
  const destroy = await (new ProductsModel(req, res)).destroy_product();
  return res.json(destroy);
});

// Fetch product information for Dashboard
router.get("/product-related-data", async (req, res) => {
  const all_brands = await (new BrandsModel(req,res)).all_brands();
  const categories = await (new CategoriesModel(req,res)).all_categories();
  const products   = await (new ProductsModel(req,res)).all_products();

  return res.json({
    all_brands, products, categories
  });
});

module.exports = router;
