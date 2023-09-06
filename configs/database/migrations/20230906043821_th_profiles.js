/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("th_profiles", (table) => {
    table.increments("id");
    table.string("first_name");
    table.string("last_name");
    table.string("address");
    table.string("email");
    table.string("company");
    table.string("company_phone");
    table.string("personal_phone");
    table.string("auth_id").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("th_profiles");
};
