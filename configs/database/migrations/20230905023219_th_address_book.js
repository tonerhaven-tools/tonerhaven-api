/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('th_address_book', table => {
    table.increments('id');
    table.integer('customer_id');
    table.string('customer_name');
    table.string('company');  // If different from Auth0 profile
    table.string('street_address');
    table.string('address_line_2');
    table.string('city');
    table.string('state');
    table.string('zip');
    table.string('is_preferred');
    table.timestamps(true,true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('th_address_book');
};
