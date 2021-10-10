import { Request } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { env } from '../constants';

const jwtPrivateKey = env.JWT_PRIVATE_KEY;

export interface IJwtBody extends JwtPayload {
  id?: string;
}

export interface IUserInfo {
  id: number;
  displayName: string;
}

export const getUserIdByToken = async (token = ''): Promise<string> => {
  const decodedData = await jwt.verify(token, jwtPrivateKey);
  const id = (<IJwtBody>decodedData)?.id;
  return String(id);
};

export const getUserInfoByToken = async (token = ''): Promise<IUserInfo> => {
  const decodedData = await jwt.verify(token, jwtPrivateKey);
  const info = (<IJwtBody>decodedData) as any as IUserInfo;
  return info;
};

export const getTokenByRequest = (req: Request): string =>
  (req.headers.authorization &&
    req.headers.authorization.replace('Bearer ', '')) ??
  '';

export const getUserIdByRequest = (req: Request): Promise<string> => {
  const token = getTokenByRequest(req);
  return getUserIdByToken(token);
};
