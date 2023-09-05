/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 * @description Tables ito ng Toners and Parts, yung printers meron separate table
 */
exports.up = function(knex) {
  return knex.schema.createTable('th_toners_parts',table => {
    table.increments('id');
    table.integer('brand_id').notNullable();
    table.integer('category_id').notNullable();
    table.string('name');
    table.integer('yield');
    table.string('color'); // Applicable lang pag toner
    table.integer('stocks_available');
    table.string('part_number');
    table.string('item_number'); // e.g. our SKU
    table.text('item_description');
    table.text('compatible_with'); // JSON or CSV
    table.string('suppliers_price');
    table.string('our_price');
    table.string('thumbnail'); // product image stored in ./storage/uploads/products
    table.timestamps(true,true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('th_toners_parts');
};
