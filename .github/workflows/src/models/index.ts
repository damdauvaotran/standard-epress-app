import { Sequelize, ModelOptions } from 'sequelize';

import { env } from '../constants';
import { logger } from '../utils';

// Single model
import UserModel from './singleModel/user';
import ClassModel from './singleModel/class';

const db: Sequelize = new Sequelize(
  env.DATABASE_NAME,
  env.DATABASE_USERNAME,
  env.DATABASE_PASSWORD,
  {
    host: env.DATABASE_URL,
    port: env.DATABASE_PORT,
    dialect: 'mysql',
    timezone: env.DATABASE_TIME_ZONE,
    retry: {
      max: 100,
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
const Class = ClassModel(db, tableConfig);

// Relation here
Class.hasMany(User, { foreignKey: 'classId' });
User.belongsTo(Class, { foreignKey: 'classId' });

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
