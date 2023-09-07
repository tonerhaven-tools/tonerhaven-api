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
}
module.exports = ProductsModel;
