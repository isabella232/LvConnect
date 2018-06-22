module.exports = {
  host: {
    hostname: '0.0.0.0',
    port: 8000,
  },
  server: {
    cache: {
      name: 'redisCache',
      engine: 'catbox-redis',
      host: 'cache',
      port: 6379,
      database: 0,
      partition: 'lvc-cache',
    },
  },
  mongodb: {
    host: 'db',
    port: 27017,
    database: 'lvconnect',
  },
  kue: {
    redis: {
      host: 'cache',
      port: 6379,
      db: 0,
    },
    prefix: 'lvc-kue',
    config: {
      shutdownTimeout: 5000,
    },
  },
};
