exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("logs")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("logs").insert([
        {
          id: "e87150a7-413a-498e-8a78-3b2eb7a7e3bf",
          last_check: "2021-01-08T22:11:07+00:00",
          code: "200",
          status: true,
          resource_id: "60263e9f-22e7-4a84-9c80-dbd741ecc075",
        },
      ]);
    });
};
