const ModelBase = require("./base/model_base");

class AccountChecksModel extends ModelBase {
  constructor(request, response) {
    //define table name, request object, response object
    super("account_checks", request, response);
  }

  async me() {
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
module.exports = AccountChecksModel;
