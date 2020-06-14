exports.up = function (knex) {
  return knex.schema.createTable('resources', (tbl) => {
    tbl.uuid('id').primary().notNullable();
    tbl.string('name', 255).notNullable();
    tbl.string('link', 500).notNullable();
    tbl.boolean('status');
    tbl.timestamp('lastCheck', { precision: 6 });
    tbl
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('resources');
};
