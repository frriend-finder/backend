// Update with your config settings.
const keys = require('./keys/keys');

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/friends.sqlite3'
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: keys.pgConnectionUrl,
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }

};
