import { Sequelize, ModelOptions } from 'sequelize';

import { env } from '../constants';
import { logger } from '../utils';

// Single model
import UserModel from './singleModel/user';

const db: Sequelize = new Sequelize(
  env.DATABASE_NAME,
  env.DATABASE_USERNAME,
  env.DATABASE_PASSWORD,
  {
    host: env.DATABASE_URL,
    port: env.DATABASE_PORT,
    dialect: 'mysql',
    timezone: '+07:00',
    retry: {
      max: 100,
      // timeout: 60 * 60 * 1000,
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

const tableConfig: ModelOptions = {
  underscored: true,
  timestamps: true,
  // sequelize: db,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  defaultScope: {
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  },
};

// Single table
const User = UserModel(db, tableConfig);

// Many to many table
// const RolePermission = RolePermissionModel(db, tableConfig);

// Relation here

const init = (): void => {
  logger.info('Initializing database');
  db.sync({ force: env.DATABASE_FORCE_UPDATE })
    .then(async () => {
      logger.info('Database & tables created!');
    })
    .catch((e) => {
      logger.error(e);
    });
};

export default {
  User,
  init,
};
