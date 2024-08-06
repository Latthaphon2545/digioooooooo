import request from 'supertest';
import app from '../../app';

import { UserModel } from '@planetx/models'
import userError from '@planetx/constants/errors/user.error.json'

jest.mock('../../helpers/sequelize.helper', () => ({
  authenticate: jest.fn()
}))

jest.mock('@planetx/helpers/src/util/cryptoUtil', () => ({
  cryptoDecrypt: jest.fn().mockReturnValue('name')
}))

describe('Get /v1/transaction', () => {
  const originalConsole = { ...console };

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(async () => {
    jest.clearAllMocks();
    console.log = originalConsole.log;
    console.warn = originalConsole.warn;
    console.error = originalConsole.error;
  });

  const fullHeader: any = {
    accessToken: '',
    uid: '1234'
  }

  it('should return 400 with missing accessToken header', async () => {
    const requestHeader = { } 

    const res = await request(app).get('/v1/transaction').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe('Validation Error: accessToken header is required');
  });

  it('should return 400 with missing uid header', async () => {
    const requestHeader = { accessTOken: fullHeader.accessToken }

    const res = await request(app).get('/v1/transaction').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe('Validation Error: uid header is required');
  });

  it('should return 400 with not found user', async () => {
    const requestHeader = fullHeader

    jest.spyOn(UserModel, 'findOne').mockResolvedValue(null)

    const res = await request(app).get('/v1/transaction').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(UserModel.findOne).toHaveBeenCalledTimes(1)
    expect(resDesc).toBe(userError.ERR_USER_NOT_FOUND.resDesc.en);
  });

  it('should return 200 with response success', async () => {
    const requestHeader = fullHeader

    jest.spyOn(UserModel, 'findOne').mockResolvedValue({ id: 1 } as UserModel)

    const res = await request(app).get('/v1/transaction').set(requestHeader);
    
    expect(res.status).toBe(200);
    expect(UserModel.findOne).toHaveBeenCalledTimes(1)
  });
});