const DB = require('../configs/database/DB');

class BrandsModel {
  request  = null;
  response = null;

  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  async all_brands() {
    DB("th_printer_brands").select().then((rows) => {
      this.response.json(rows);
    }).catch((error) => {
      console.error(error);
      this.response.status(500).json({error: "Internal server error"});
    });
  }
}
module.exports = BrandsModel;