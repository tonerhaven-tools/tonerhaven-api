/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('th_categories').del()
  await knex('th_categories').insert([
    {id: 1, name: 'Printer Parts'},
    {id: 2, name: 'Ink/Toners'},
  ]);
};
