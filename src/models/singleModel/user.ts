import { Sequelize, ModelOptions, BIGINT, STRING, ModelCtor } from 'sequelize';
import { IUserModel } from '../../types/user';

export default (db: Sequelize, config: ModelOptions): ModelCtor<IUserModel> =>
  db.define<IUserModel>(
    'user',
    {
      userId: {
        type: BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      username: {
        type: STRING,
        allowNull: false,
      },
      password: {
        type: STRING,
        allowNull: false,
      },
      displayName: {
        type: STRING,
        allowNull: false,
      },
      email: {
        type: STRING,
        allowNull: false,
      },
      avatar: {
        type: STRING,
        allowNull: false,
      },
    },
    config,
  );

/**
 * @swagger
 *
 * definitions:
 *  User:
 *    type: object
 *    properties:
 *      userId:
 *        type: integer
 *      roleId:
 *        type: integer
 *      username:
 *        type: string
 *      gender:
 *        type: string
 *      displayName:
 *        type: string
 *      email:
 *        type: string
 *      avatar:
 *        type: string
 */
