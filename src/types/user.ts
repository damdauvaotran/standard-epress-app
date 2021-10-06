import { Model } from 'sequelize';
import { IModelWithTime } from './common';

export interface IUser extends IModelWithTime {
  userId: number;
  userName: string;
  password: string;
  displayName: string;
  email: string;
}
export interface IUserModel extends Model, IUser {}
