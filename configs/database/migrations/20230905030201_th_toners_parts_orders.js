/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 * @description Tables ito ng Toners and Parts, yung printers meron separate table
 */
exports.up = function(knex) {
  return knex.schema.createTable('th_toners_parts_orders',table => {
    table.increments('id');
    table.integer('status_id');
    table.integer('courier_id');
    table.integer('customer_id').notNullable();
    table.integer('toners_parts_id').notNullable();
    table.integer('bill_to_address_id').notNullable();
    table.integer('ship_to_address_id').notNullable();
    table.string('shipping_fee');
    table.string('order_date');
    table.string('tracking_number');
    table.string('tracking_link');
    table.timestamps(true,true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('th_toners_parts_orders');
};
