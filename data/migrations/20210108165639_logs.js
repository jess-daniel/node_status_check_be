exports.up = function (knex) {
  return knex.schema.createTable("logs", (tbl) => {
    tbl.uuid("id").primary().notNullable();
    tbl.timestamp("last_check", { precision: 6 });
    tbl.string("code").notNullable();
    tbl.boolean("status").notNullable();
    tbl
      .uuid("resource_id")
      .notNullable()
      .references("id")
      .inTable("resources")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("logs");
};
