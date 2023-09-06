const { default: knex } = require("knex");
const DB = require("../../configs/database/DB");

//acts as base definition for models
class ModelBase {
  constructor(table, req, res) {
    const table_name = this.get_table_name(table);
    //assign table name, request object, response object
    this.request = req;
    this.response = res;
    this.table = DB(table_name);
    this.database = knex;
  }

  //adds prefix on tables
  get_table_name(table) {
    return `th_${table}`;
  }
}

module.exports = ModelBase;
