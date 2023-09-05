/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('th_printer_brands').del()
  await knex('th_printer_brands').insert([
    {id: 1, brand_name: 'Canon'},
    {id: 2, brand_name: 'Xerox'},
    {id: 3, brand_name: 'Ricoh'},
    {id: 4, brand_name: 'HP (Hewlet Packard)'},
    {id: 5, brand_name: 'Konica Minolta'},
    {id: 6, brand_name: 'Kyocera'},
    {id: 7, brand_name: 'Samsung'},
    {id: 8, brand_name: 'Lanier'},
    {id: 9, brand_name: 'Lexmark'},
  ]);
};
