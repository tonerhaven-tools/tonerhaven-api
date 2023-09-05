/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('th_order_statuses').del()
  await knex('th_order_statuses').insert([
    {id: 1,name: "Packed"},
    {id: 2,name: "Picked up"},
    {id: 3,name: "Shipped"},
    {id: 4,name: "Delivered"},
    {id: 5,name: "Returned"},
    {id: 6,name: "Refunded"},
  ]);
};
