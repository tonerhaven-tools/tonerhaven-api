const ModelBase = require("./base/model_base");

class ProfilesModel extends ModelBase {
  constructor(request, response) {
    //define table name, request object, response object
    super("profiles", request, response);
  }

  async ping() {
    this.table
      .where("auth_id", this.request.params.authId)
      .select()
      .first()
      .then((response) =>
        this.response.json({
          exists: response != undefined,
        })
      )
      .catch((error) => {
        console.error(error);
        this.response.status(500).json({ error: "Internal server error" });
      });
  }

  async get() {
    this.table
      .where("auth_id", this.request.params.authId)
      .select()
      .first()
      .then((response) => this.response.status(200).json(response))
      .catch((error) => {
        console.error(error);
        this.response.status(500).json({ error: "Internal server error" });
      });
  }

  async add() {
    this.table
      .insert(this.request.body)
      .then((resp) =>
        this.response.status(201).json({
          id: resp[0],
        })
      )
      .catch((error) => {
        console.error(error);
        this.response.status(500).json({ error: "Internal server error" });
      });
  }

  async update() {
    this.table
      .where("id", this.request.params.id)
      .update(this.request.body)
      .then((resp) => this.response.status(204).json())
      .catch((error) => {
        console.error(error);
        this.response.status(500).json({ error: "Internal server error" });
      });
  }
}
module.exports = ProfilesModel;
