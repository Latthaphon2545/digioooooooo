import request from 'supertest';
import jwt from 'jsonwebtoken';

import app from '../../app';

import { UserModel, UserTokenModel } from '@planetx/models'
import userError from '@planetx/constants/errors/user.error.json'
import TokenError from '@planetx/constants/errors/token.error.json'

jest.mock('../../helpers/sequelize.helper', () => ({
  authenticate: jest.fn()
}))

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn()
}));


describe('GET /v1/token/kyc', () => {
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

  it('should return 400 with missing device header', async () => {
    const requestHeader = { } 

    const res = await request(app).get('/v1/token/kyc').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe('Validation Error: device header is required');
  });

  it('should return 400 with not find user device', async () => {
    const requestHeader = { device: '1234' } 

    jest.spyOn(UserModel, 'findOne').mockResolvedValue(null)

    const res = await request(app).get('/v1/token/kyc').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(UserModel.findOne).toHaveBeenCalledTimes(1)
    expect(resDesc).toBe(userError.ERR_USER_NOT_FOUND.resDesc.en);
  });

  it('should return 200 with no refresh token', async () => {
    const requestHeader = { device: '1234' } 

    jest.spyOn(UserModel, 'findOne').mockResolvedValue({ id: 1 } as UserModel);
    jest.spyOn(UserTokenModel, 'create').mockResolvedValue({ id: 1 } as UserTokenModel);
  
    (jwt.sign as jest.Mock).mockReturnValue(null).mockReturnValueOnce('mocked.token.value');

    const res = await request(app).get('/v1/token/kyc').set(requestHeader);
    
    expect(res.status).toBe(200);
    expect(UserModel.findOne).toHaveBeenCalledTimes(1)
    expect(UserTokenModel.create).toHaveBeenCalledTimes(1)
  });
})

describe('GET /v1/token', () => {
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

  it('should return 400 with missing refreshToken header', async () => {
    const requestHeader = { } 

    const res = await request(app).get('/v1/token').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe('Validation Error: refreshToken header is required');
  });

  it('should return 400 with missing device header', async () => {
    const requestHeader = { refreshToken: 'bearrer 1234' } 

    const res = await request(app).get('/v1/token').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe('Validation Error: device header is required');
  });

  it('should return 400 with invalid refresh token', async () => {
    const requestHeader = { refreshToken: '1234', device: '1234' } 

    const res = await request(app).get('/v1/token').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe(TokenError.ERR_TOKEN_INVALID.resDesc.en);
  });

  it('should return 400 with refresh token verify fail', async () => {
    const requestHeader = { refreshToken: 'bearer 1234', device: '1234' };

    (jwt.verify as jest.Mock).mockReturnValue(false)

    const res = await request(app).get('/v1/token').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe(TokenError.ERR_TOKEN_INVALID.resDesc.en);
  });

  it('should return 400 with not find user device', async () => {
    const requestHeader = { refreshToken: 'bearer 1234', device: '1234' };

    (jwt.verify as jest.Mock).mockReturnValue(true)

    jest.spyOn(UserModel, 'findOne').mockResolvedValue(null)

    const res = await request(app).get('/v1/token').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(UserModel.findOne).toHaveBeenCalledTimes(1)
    expect(resDesc).toBe(userError.ERR_USER_NOT_FOUND.resDesc.en);
  });


  it('should return 200 with existing refresh token found', async () => {
    const requestHeader = { refreshToken: 'bearer 1234', device: '1234' };

    const mockResultvalueUserToken = {
      id: 1,
      update: jest.fn().mockResolvedValue({})
    };

    (jwt.verify as jest.Mock).mockReturnValueOnce(true);
    (jwt.sign as jest.Mock).mockReturnValue('mocked.token.value');

    jest.spyOn(UserModel, 'findOne').mockResolvedValue({ id: 1 } as UserModel);
    jest.spyOn(UserTokenModel, 'findOne').mockResolvedValue(mockResultvalueUserToken as any);
  

    const res = await request(app).get('/v1/token').set(requestHeader);
    
    expect(res.status).toBe(200);
    expect(UserModel.findOne).toHaveBeenCalledTimes(1)
    expect(UserTokenModel.findOne).toHaveBeenCalledTimes(1)
    expect(mockResultvalueUserToken.update).toHaveBeenCalledTimes(1)
  });
})

describe('GET /v1/token/check', () => {
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

  it('should return 400 with missing refreshToken header', async () => {
    const requestHeader = { } 

    const res = await request(app).get('/v1/token/check').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe('Validation Error: refreshToken header is required');
  });

  it('should return 400 with invalid refresh token', async () => {
    const requestHeader = { refreshToken: '1234', device: '1234' } 

    const res = await request(app).get('/v1/token/check').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe(TokenError.ERR_TOKEN_INVALID.resDesc.en);
  });

  it('should return 400 with not find existing refresh token', async () => {
    const requestHeader = { refreshToken: 'bearer 1234', device: '1234' };

    (jwt.verify as jest.Mock).mockReturnValue(true)
    jest.spyOn(UserTokenModel, 'findOne').mockResolvedValue(null)

    const res = await request(app).get('/v1/token/check').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(UserTokenModel.findOne).toHaveBeenCalledTimes(1)
    expect(resDesc).toBe(TokenError.ERR_TOKEN_INVALID.resDesc.en);
  });

  it('should return 200 with response success', async () => {
    const requestHeader = { refreshToken: 'bearer 1234', device: '1234' };

    (jwt.verify as jest.Mock).mockReturnValue(true)
    jest.spyOn(UserTokenModel, 'findOne').mockResolvedValue({ id: 1 } as UserTokenModel)

    const res = await request(app).get('/v1/token/check').set(requestHeader);
    
    expect(res.status).toBe(200);
    expect(UserTokenModel.findOne).toHaveBeenCalledTimes(1)
  });
})