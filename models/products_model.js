const ModelBase = require("./base/model_base");

class ProductsModel extends ModelBase {
  constructor(request, response) {
    //define table name, request object, response object
    super("toners_parts", request, response);
  }

  async all_products() {
    this.table
      .select()
      .then((rows) => {
        this.response.json(rows);
      })
      .catch((error) => {
        console.error(error);
        this.response.status(500).json({ error: "Internal server error" });
      });
  }
}
module.exports = ProductsModel;
