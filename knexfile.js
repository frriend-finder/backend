// Update with your config settings.
const keys = require('./keys/keys');

module.exports = {

  development: {
    client: 'pg',
    connection: keys.pgDevUrl,
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
