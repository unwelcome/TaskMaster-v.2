const Redis = require("ioredis");

const redis = new Redis({
  host: process.env.NODE_ENV === 'production' ? process.env.REDIS_HOST : 'localhost',
  port: process.env.REDIS_PORT,
  username: process.env.REDIS_USER,
  password: process.env.REDIS_USER_PASSWORD,
  db: process.env.REDIS_DB,
});

module.exports = redis;