import Redis from "ioredis";

const host = process.env.NODE_ENV === 'development' ? 'localhost' : process.env.REDIS_HOST;
const port = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6380;

const redis = new Redis({
  host: host,
  port: port,
});

// console.log('REDIS CONNECT DATA:', {
//   host: host,
//   port: port,
// })

export default redis;
