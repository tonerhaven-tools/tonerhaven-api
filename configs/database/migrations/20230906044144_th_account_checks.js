/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("th_account_checks", (table) => {
    table.increments("id");
    table.string("title"); //notification title
    table.string("route"); //api url for initial checks
    table.string("messageTemplate"); // message to prompt
    table.string("type"); // info, warning,error, success
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("th_account_checks");
};
