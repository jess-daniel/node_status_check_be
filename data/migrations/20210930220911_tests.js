exports.up = function (knex) {
  return knex.schema.createTable("tests", (tbl) => {
    tbl.uuid("id").primary().notNullable();
    tbl.timestamp("last_check", { precision: 6 });
    tbl.jsonb("fields").notNullable();
    tbl.enu("status", ["passed", "failed"]).notNullable();
    tbl
      .uuid("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("tests");
};
