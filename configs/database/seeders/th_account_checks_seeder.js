/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("th_account_checks").del();
  await knex("th_account_checks").insert([
    {
      id: 1,
      title: "Welcome to TonerHaven",
      route: "/api/profile/ping/{{authId}}",
      messageTemplate:
        "Welcome aboard! Please take a moment to complete your profile to enhance your experience on our platform.",
      type: "warning",
    },
  ]);
};
