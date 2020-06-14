exports.up = function (knex) {
  return knex.schema.createTable('users', (tbl) => {
    tbl.uuid('id').primary().notNullable();
    tbl.string('name').notNullable();
    tbl.string('email').unique().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
