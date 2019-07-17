
exports.up = async function(knex) {
  await knex.schema.createTable('users', tbl => {
        tbl.increments('id');
        tbl.string('email').unique().notNullable();
        tbl.string('firstName').notNullable();
        tbl.string('lastName').notNullable();
        tbl.integer('age');
        tbl.string('phone');
        tbl.string('address');
        tbl.string('city');
        tbl.string('state');
        tbl.string('zip');
        tbl.string('catchPhrase');
        tbl.string('gender');
        tbl.string('imageUrl');
  });

  await knex.schema.createTable('interests', tbl => {
      tbl.increments('id');
      tbl.string('name');
  });

  await knex.schema.createTable('user_interests', tbl => {
      tbl.integer('user_id')
          .unsigned()
         .references('id')
         .inTable('users')
         .notNullable();
     tbl.integer('interest_id')
         .unsigned()
         .references('id')
         .inTable('interests')
         .notNullable();
  });

  await knex.schema.createTable('auth', tbl => {
      tbl.integer('code')
          .unsigned()
          .notNullable();
      tbl.integer('user_id')
          .unsigned()
          .references('id')
          .inTable('users')
          .notNullable()
          .unique();
      tbl.timestamp('created_at')
          .defaultTo(knex.fn.now())
          .notNullable();
  })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('user_interests');
    await knex.schema.dropTableIfExists('interests');
    await knex.schema.dropTableIfExists('auth');
    await knex.schema.dropTableIfExists('users');
};
