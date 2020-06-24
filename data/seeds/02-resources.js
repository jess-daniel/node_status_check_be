exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('resources')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {
          id: '7168b719-7428-4013-85d9-8def9b006130',
          name: 'google',
          link: 'https://google.com',
          status: true,
          last_check: null,
          user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        },
        {
          id: '60263e9f-22e7-4a84-9c80-dbd741ecc075',
          name: 'amazon',
          link: 'https://amazon.com',
          status: false,
          last_check: null,
          user_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        },
      ]);
    });
};
