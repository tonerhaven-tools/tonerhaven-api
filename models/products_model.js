const DB = require('../configs/database/DB');

class ProductsModel {
  request  = null;
  response = null;

  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  async all_products() {
    DB("th_toners_parts").select().then((rows) => {
      this.response.json(rows);
    }).catch((error) => {
      console.error(error);
      this.response.status(500).json({error: "Internal server error"});
    });
  }
}
module.exports = ProductsModel;