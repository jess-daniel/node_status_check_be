exports.up = function (knex) {
  return knex.schema.createTable('users', (tbl) => {
    tbl.uuid('id').primary().notNullable();
    tbl.string('username').notNullable();
    tbl.string('email').unique().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
