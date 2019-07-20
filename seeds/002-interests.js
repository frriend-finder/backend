
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('interests').del()
    .then(function () {
      // Inserts seed entries
      return knex('interests').insert([
          {name: 'food'},
          {name: 'movies'},
          {name: 'dancing'},
          {name: 'sports'},
          {name: 'music'}
      ]);
    });
};
