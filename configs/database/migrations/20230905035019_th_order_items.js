/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('th_order_items', table => {
    table.increments('id');
    table.integer('order_id').notNullable();
    table.integer('th_toners_parts_id').notNullable();
    table.integer('quantity').notNullable();
    table.integer('our_price').notNullable();
    table.timestamps(true,true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('th_order_items');
};
