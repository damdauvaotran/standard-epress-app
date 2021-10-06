import { Response } from 'express';
import EHttpStatusCode from '../enum/httpCode';
import { IResponseDTO } from '../types/common';

export const buildRes = (res: Response, result: IResponseDTO): any => {
  if (result.status === EHttpStatusCode.OK) {
    return res.status(result.status).json({
      success: true,
      data: result.data,
    });
  }
  return res.status(result.status).json({
    success: false,
    message: result.message,
  });
};

export const defaultResponseDTO: IResponseDTO = {
  status: EHttpStatusCode.INTERNAL_SERVER_ERROR,
  message: 'Some thing went wrong',
};
