
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('interests').del()
    .then(function () {
      // Inserts seed entries
      return knex('interests').insert([
          {id: 1, name: 'food'},
          {id: 2, name: 'movies'},
          {id: 3, name: 'dancing'},
          {id: 4, name: 'sports'},
          {id: 5, name: 'music'}
      ]);
    });
};
