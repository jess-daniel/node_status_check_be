exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          name: 'Jess',
          email: 'jess@bitzoom.co',
        },
      ]);
    });
};
