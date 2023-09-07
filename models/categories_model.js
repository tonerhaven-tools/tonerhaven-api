const ModelBase = require("./base/model_base");

class CategoriesModel extends ModelBase {
  constructor(request, response) {
    super("categories", request, response);
  }

  async all_categories() {
    try {
      return await this.table.select();
    } catch (error) {
      console.error(error);
      throw new Error("Internal server error");
    }
  }
}
module.exports = CategoriesModel;
