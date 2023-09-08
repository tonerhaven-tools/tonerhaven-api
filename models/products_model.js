const ModelBase = require("./base/model_base");

class ProductsModel extends ModelBase {
  constructor(request, response) {
    super("toners_parts", request, response);
  }

  async all_products() {
    try {
      return await this.table.select();
    } catch (error) {
      console.error(error);
      throw new Error("Internal server error");
    }
  }

  async store_product(filename) {
    try {
      const form_values = this.request.body;
      form_values.thumbnail = filename;
      return await this.table.insert(form_values).returning('*');
    } catch (error) {
      console.error(error);
      throw new Error("Internal server error");
    }
  }

  async destroy_product() {
    try {
      const prod_id  = await this.request.body.product_id;
      const product  = await this.table.where('id',prod_id).first();
      const filesys  = require('fs').promises;
      const filepath = `storage/uploads/products/${product.thumbnail}`;

      return {
        image_deleted: await filesys.unlink(filepath),
        product_delete: await this.table.where('id',prod_id).delete(),
      }
    }
    catch (error) {
      console.error(error);
      throw new Error("Internal server error");
    }
  }
}
module.exports = ProductsModel;
