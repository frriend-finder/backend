
exports.up = async function(knex) {
  await knex.schema.createTable('user_friends', tbl => {
      tbl.increments('id');
      tbl.integer('user_id')
          .notNullable()
          .references('id')
          .inTable('users');
      tbl.integer('friend_id')
          .notNullable()
          .references('id')
          .inTable('users')
  })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('user_friends');
};
