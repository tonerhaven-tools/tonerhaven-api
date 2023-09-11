const ModelBase = require("./base/model_base");

class BrandsModel extends ModelBase {
  constructor(request, response) {
    super("printer_brands", request, response);
  }

  async all_brands() {
    try {
      const result = await this.table.select();
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Internal server error");
    }
  }
}
module.exports = BrandsModel;
