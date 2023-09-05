const ModelBase = require("./base/model_base");

class ProfilesModel extends ModelBase {
  constructor(request, response) {
    //define table name, request object, response object
    super("profiles", request, response);
  }

  async ping() {
    this.table
      .where("auth_id", this.request.params.id)
      .select()
      .then((rows) =>
        this.response.json({
          exists: rows.length > 0,
        })
      )
      .catch((error) => {
        console.error(error);
        this.response.status(500).json({ error: "Internal server error" });
      });
  }

  async addUpdate() {}
}
module.exports = ProfilesModel;
