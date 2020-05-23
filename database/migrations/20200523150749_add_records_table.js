exports.up = function(knex) {
  return knex.schema.createTable("record", (table) => {
    table
      .increments("id")
      .primary()
      .index();

    table
      .integer("user_id")
      .references("users.id")
      .notNullable();

    table.float("weights", 8, 3).notNullable();

    table.float("bmi", 8, 3).notNullable();

    table
      .timestamp("record_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("record");
};
