/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('th_printer_models').del()
  await knex('th_printer_models').insert([
    {
      id: 1,
      brand_id: 2,
      name: "Xerox VersaLink C7020",
    },
    {
      id: 2,
      brand_id: 2,
      name: "Xerox VersaLink C7025",
    },
    {
      id: 3,
      brand_id: 2,
      name: "Xerox VersaLink C7030",
    },
  ]);
};
