const ModelBase = require("./base/model_base");

class ProductsModel extends ModelBase {
  constructor(request, response) {
    super("toners_parts", request, response);
  }
  async get_product() {
    // this.response.status(200).json(this.request.params.id);
    this.table
      .where({ id: this.request.params.id })
      .select()
      .first()
      .then((response) => this.response.status(200).json(response))
      .catch((error) => {
        console.error(error);
        this.response.status(500).json({ error: "Internal server error" });
      });
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
      return await this.table.insert(form_values).returning("*");
    } catch (error) {
      console.error(error);
      throw new Error("Internal server error");
    }
  }
  async destroy_product() {
    try {
      const prod_id  = await this.request.body.product_id;
      const product  = await this.table.where("id", prod_id).first();

      let image_deleted = false;
      try {
        if (product.thumbnail.length > 0) {
          const filesys  = require("fs").promises;
          const filepath = `storage/uploads/products/${product.thumbnail}`;
          await filesys.access(filepath);
          await filesys.unlink(filepath);
        }
        image_deleted = true;
      } catch {
        image_deleted = false;
      }

      return {
        image_deleted: image_deleted,
        product_deleted: await this.table.where("id",prod_id).delete(),
      };
    } catch (error) {
      console.error(error);
      throw new Error("Internal server error");
    }
  }
  async update_product() {
    try {
      const form = this.request.body;
      delete form.thumbnail;
      const update = this.table.where('id',form.id)
      .update(form).then(count => {console.log(count)}).catch(error => {
        console.error(error);
      });

      return {update, test: "Fuck"};
    } catch (error) {
      console.error(error);
      throw new Error("Internal server error");
    }
  }
}
module.exports = ProductsModel;
