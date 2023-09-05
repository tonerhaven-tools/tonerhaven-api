/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('th_couriers').del()
  await knex('th_couriers').insert([
    {id: 1, name: 'USPS', tracking_url: ""},
    {id: 2, name: 'FedEx', tracking_url: ""},
    {id: 3, name: 'UPS', tracking_url: ""},
    {id: 4, name: 'DHL', tracking_url: ""},
    {id: 5, name: 'OnTrac', tracking_url: ""},
  ]);
};
