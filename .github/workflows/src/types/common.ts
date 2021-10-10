import EHttpStatusCode from '../enum/httpCode';

export interface IResponseDTO<T = any> {
  status: EHttpStatusCode;
  message?: string;
  data?: T;
}

export interface IModelWithTime {
  createdAt: number;
  updatedAt: number;
}
