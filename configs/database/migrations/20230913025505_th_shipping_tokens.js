/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("th_shipping_tokens", (table) => {
    table.increments("id");
    table.integer("courier_id");
    table.string("expires_stamp");
    table.text("access_token");
    table.string("token_type");
    table.string("expires_in");
    table.string("scope");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("th_shipping_tokens");
};
