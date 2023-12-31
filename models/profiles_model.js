const ModelBase = require("./base/model_base");

class ProfilesModel extends ModelBase {
  constructor(request, response) {
    //define table name, request object, response object
    super("profiles", request, response);
  }

  async ping() {
    this.table
      .where("auth_id", this.request.headers.auth_id)
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
    const {
      first_name,
      last_name,
      address,
      email,
      company,
      company_phone,
      personal_phone,
      auth_id,
    } = this.request.body;

    this.table
      .insert({
        first_name: first_name,
        last_name: last_name,
        address: address,
        email: email,
        company: company,
        company_phone: company_phone,
        personal_phone: personal_phone,
        auth_id: auth_id,
      })
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
