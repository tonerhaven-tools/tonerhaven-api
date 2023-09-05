const ModelBase = require("./base/model_base");

class BrandsModel extends ModelBase {
  constructor(request, response) {
    super(printer_brands, request, response);
  }

  async all_brands() {
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
module.exports = BrandsModel;
