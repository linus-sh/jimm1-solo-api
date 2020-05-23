exports.up = function(knex) {
  return knex.schema.createTable("users", (table) => {
    table
      .increments("id")
      .primary()
      .index();

    table
      .string("username", 20)
      .notNullable()
      .unique()
      .index();

    table.float("height", 8, 4).notNullable();

    table
      .timestamp("craete_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
