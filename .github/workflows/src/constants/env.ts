import { ENodeEnv } from '../enum';

const NODE_ENV = process.env.NODE_ENV ?? ENodeEnv.dev;
const PORT = parseInt(process.env.PORT ?? '8000', 10);
const DATABASE_FORCE_UPDATE = process.env.DATABASE_FORCE_UPDATE === 'true';
const DATABASE_TIME_ZONE = process.env.DATABASE_TIME_ZONE || 'UTC';
const DATABASE_PORT = parseInt(process.env.DATABASE_PORT ?? '3306', 10);
const DATABASE_NAME = process.env.DATABASE_NAME ?? '';
const DATABASE_USERNAME = process.env.DATABASE_USERNAME ?? '';
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD ?? '';
const DATABASE_URL = process.env.DATABASE_URL ?? '';
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY ?? '';
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS ?? '10', 10);
const JWT_TTL = parseInt(process.env.JWT_TTL ?? '10', 10);

export default {
  NODE_ENV,
  PORT,
  DATABASE_FORCE_UPDATE,
  DATABASE_PORT,
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_URL,
  JWT_PRIVATE_KEY,
  SALT_ROUNDS,
  JWT_TTL,
  DATABASE_TIME_ZONE,
};
