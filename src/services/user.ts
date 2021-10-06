import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import db from '../models';
import { env } from '../constants';
import { IUserModel } from '../types/user';
import { IResponseDTO } from '../types/common';
import EHttpStatusCode from '../enum/httpCode';
import logger from '../utils/logger';
import { defaultResponseDTO } from '../utils/response';
import { client } from '../cached';
import dayjs from 'dayjs';

const jwtPrivateKey = env.JWT_PRIVATE_KEY;

export interface ILoginInReq {
  username: string;
  password: string;
}

export interface ISignUpReq {
  username: string;
  password: string;
  displayName: string;
  email: string;
}

export const signUp = async (signUpReq: ISignUpReq): Promise<IResponseDTO> => {
  try {
    const { username, password, displayName, email } = signUpReq;
    const user = await db.User.findOne({ where: { username } });
    if (user !== null) {
      logger.error('User exist');
      return {
        status: EHttpStatusCode.BAD_REQUEST,
        message: 'User exist',
        data: {},
      };
    }

    const hashedPassword = await bcrypt.hash(password, env.SALT_ROUNDS);
    await db.User.create({
      username,
      password: hashedPassword,
      avatar: '',
      displayName: displayName,
      email: email,
    });
    return {
      status: EHttpStatusCode.OK,
      message: 'success',
      data: {},
    };
  } catch (e) {
    logger.error(e);
    return defaultResponseDTO;
  }
};

export const login = async (
  loginReq: ILoginInReq,
): Promise<IResponseDTO<{ token: string }>> => {
  const { username, password } = loginReq;
  try {
    const user = await db.User.findOne({
      where: { username },
    });

    if (user === null) {
      return {
        status: 400,
        message: 'Invalid login info',
      };
    }
    const encryptedTruePassword = user.password;

    const isPasswordCorrect = await bcrypt.compare(
      password,
      encryptedTruePassword,
    );
    if (isPasswordCorrect) {
      const token = jwt.sign(
        {
          displayName: user.displayName,
          email: user.email,
          id: user.userId,
        },
        jwtPrivateKey,
        { expiresIn: env.JWT_TTL },
      );
      return {
        status: EHttpStatusCode.OK,
        data: { token },
      };
    } else {
      return {
        status: EHttpStatusCode.OK,
        message: 'Invalid login info',
      };
    }
  } catch (e) {
    logger.error(e);
    return defaultResponseDTO;
  }
};

export interface ILogoutParams {
  token: string;
}

export const logout = async (
  logoutReq: ILogoutParams,
): Promise<IResponseDTO<any>> => {
  try {
    const { token: authToken } = logoutReq;

    const info = <JwtPayload>jwt.decode(authToken);
    const remainSecond = Number(info?.exp) - dayjs().unix();
    if (Number(info?.exp) - dayjs().unix() > env.JWT_TTL) {
      return {
        status: EHttpStatusCode.OK,
      };
    }
    client?.set(authToken, '', 'EX', remainSecond);
    return {
      status: EHttpStatusCode.OK,
    };
  } catch (e) {
    logger.error(e);
    return {
      status: EHttpStatusCode.OK,
    };
  }
};

export const getUserInfo = async (
  userId: number,
): Promise<IResponseDTO<IUserModel>> => {
  try {
    const userInfo = await db.User.findOne({
      where: { userId },
    });
    if (userInfo) {
      return {
        status: EHttpStatusCode.OK,
        data: userInfo,
      };
    }
    return {
      status: EHttpStatusCode.NOT_FOUND,
      message: 'User not exist',
    };
  } catch (e) {
    logger.error(e.toString());
    return defaultResponseDTO;
  }
};

export default {
  signUp,
  login,
  getUserInfo,
  logout,
};
