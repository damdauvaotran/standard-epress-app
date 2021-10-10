import redis from 'redis';
import { promisify } from 'util';
import logger from '../utils/logger';

let client: redis.RedisClient = redis.createClient();
logger.info('runn');
const init = (): void => {
  logger.info('initial redis');
  if (!client) {
    client = redis.createClient();
  }
};

const getAsync = client
  ? promisify(client.get).bind(client)
  : () => {
      logger.error('redis not initial');
    };

client?.on('error', (error: any) => {
  logger.error(error);
});

export default { client, getAsync, init };

export { client, getAsync, init };
