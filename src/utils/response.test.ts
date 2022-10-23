import { buildRes } from './response';
import { Response } from 'express';
import EHttpStatusCode from '../enum/httpCode';
import { createResponse } from 'node-mocks-http';

import { jest } from '@jest/globals';

jest.useFakeTimers();

describe('Test buildRes function', () => {
  test('Build correct response object', () => {
    expect(
      buildRes(createResponse(), {
        status: EHttpStatusCode.CONTINUE,
      }),
    ).toEqual({});
  });
});
