import request from 'supertest';

import app from '../../app';

import { UserModel } from '@planetx/models'

import PinError from '@planetx/constants/errors/pin.error.json'
import userError from '@planetx/constants/errors/user.error.json'

jest.mock('sequelize')

jest.mock('../../helpers/sequelize.helper', () => ({
  authenticate: jest.fn()
}))

jest.mock('@planetx/helpers/src/util/pinUtil', () => ({
  validatePin: jest.fn().mockResolvedValue(true)
  .mockResolvedValueOnce(false)
}))

jest.mock('@planetx/helpers/src/util/bcryptUtil', () => ({
  compareHash: jest.fn().mockResolvedValue(true)
  .mockResolvedValueOnce(false)
  .mockResolvedValueOnce(true)
  .mockResolvedValueOnce(false),
  generateHash: jest.fn().mockResolvedValue({})
}))

describe('POST /v1/authen/pin/verify', () => {
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

  it('should return 400 with missing accessToken header', async () => {
    const requestHeader = { } 

    const res = await request(app).post('/v1/authen/pin/verify').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe('Validation Error: accessToken header is required');
  });

  it('should return 400 with missing pin body', async () => {
    const requestHeader = { accessToken: '1234' } 

    const res = await request(app).post('/v1/authen/pin/verify').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe('Validation Error: pin body is required');
  });

  it('should return 400 with not found user', async () => {
    const requestHeader = { accessToken: '1234' } 
    const requestBody = { pin: '123456' }
    
    jest.spyOn(UserModel, 'findOne').mockResolvedValue(null)

    const res = await request(app).post('/v1/authen/pin/verify').send(requestBody).set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(UserModel.findOne).toHaveBeenCalledTimes(1)
    expect(resDesc).toBe(userError.ERR_USER_NOT_FOUND.resDesc.en);
  });

  it('should return 400 with wrong pin', async () => {
    const requestHeader = { accessToken: '1234' } 
    const requestBody = { pin: '1234' }
    
    jest.spyOn(UserModel, 'findOne').mockResolvedValue({id: 1 } as any)

    const res = await request(app).post('/v1/authen/pin/verify').send(requestBody).set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(UserModel.findOne).toHaveBeenCalledTimes(1)
    expect(resDesc).toBe(PinError.ERR_PIN_NOT_MATCH.resDesc.en);
  });

  it('should return 200 with response success', async () => {
    const requestHeader = { accessToken: '1234' } 
    const requestBody = { pin: '1234' }
    
    jest.spyOn(UserModel, 'findOne').mockResolvedValue({id: 1 } as any)

    const res = await request(app).post('/v1/authen/pin/verify').send(requestBody).set(requestHeader);
    
    expect(res.status).toBe(200);
    expect(UserModel.findOne).toHaveBeenCalledTimes(1)
  });
})

describe('PUT /v1/authen/pin', () => {
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

  const fullBody = { newPin: '1234', confirmPin: '1234', existingPin: '1234' }

  it('should return 400 with missing accessToken header', async () => {
    const requestHeader = { } 

    const res = await request(app).put('/v1/authen/pin').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe('Validation Error: accessToken header is required');
  });

  it('should return 400 with missing newPin body', async () => {
    const requestHeader = { accessToken: '1234' } 

    const res = await request(app).put('/v1/authen/pin').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe('Validation Error: newPin body is required');
  });
  
  it('should return 400 with missing confirm body', async () => {
    const requestHeader = { accessToken: '1234' } 
    const requestBody = { newPin: '1234' }

    const res = await request(app).put('/v1/authen/pin').send(requestBody).set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe('Validation Error: confirmPin body is required');
  });

  it('should return 400 with missing existingPin body', async () => {
    const requestHeader = { accessToken: '1234' } 
    const requestBody = { newPin: '1234', confirmPin: '1234' }

    const res = await request(app).put('/v1/authen/pin').send(requestBody).set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe('Validation Error: existingPin body is required');
  });

  it('should return 400 with pin validate', async () => {
    const requestHeader = { accessToken: '1234' } 
    const requestBody = fullBody

    const res = await request(app).put('/v1/authen/pin').send(requestBody).set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe(PinError.ERR_PIN_VALIDATE.resDesc.en);
  });

  it('should return 400 with existingPin wrong', async () => {
    const requestHeader = { accessToken: '1234' } 
    const requestBody = fullBody

    jest.spyOn(UserModel, 'findOne').mockResolvedValue({ id: 1, pin: '1234' } as UserModel)

    const res = await request(app).put('/v1/authen/pin').send(requestBody).set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(UserModel.findOne).toHaveBeenCalledTimes(1)
    expect(resDesc).toBe(PinError.ERR_EXISTING_PIN_NOT_CORRECT.resDesc.en);
  });

  it('should return 200 with response success', async () => {
    const requestHeader = { accessToken: '1234' } 
    const requestBody = fullBody

    jest.spyOn(UserModel, 'findOne').mockResolvedValue({ id: 1, pin: '1234' } as UserModel)
    jest.spyOn(UserModel, 'update').mockResolvedValue({} as any)

    const res = await request(app).put('/v1/authen/pin').send(requestBody).set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(200);
    expect(UserModel.findOne).toHaveBeenCalledTimes(1)
    expect(UserModel.update).toHaveBeenCalledTimes(1)
  });
})