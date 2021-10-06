import { Sequelize, ModelOptions, BIGINT, STRING, ModelCtor } from 'sequelize';
import { IUserModel } from '../../types/user';

export default (db: Sequelize, config: ModelOptions): ModelCtor<IUserModel> =>
  db.define<IUserModel>(
    'class',
    {
      classId: {
        type: BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      className: {
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
 *  Class:
 *    type: object
 *    properties:
 *      classId:
 *        type: integer
 *      className:
 *        type: string
 */
