/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 * @description Tables ito ng Toners and Parts, yung printers meron separate table
 */
exports.up = function(knex) {
  return knex.schema.createTable('th_order_statuses',table => {
    table.increments('id');
    table.string('name');
    table.timestamps(true,true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('th_order_statuses');
};
