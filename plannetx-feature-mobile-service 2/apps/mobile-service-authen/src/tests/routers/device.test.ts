import request from 'supertest';

import app from '../../app';

import { UserModel } from '@planetx/models'
import DeviceError from '@planetx/constants/errors/device.error.json'

jest.mock('../../helpers/sequelize.helper', () => ({
  authenticate: jest.fn()
}))

describe('GET /v1/authen/device/verify', () => {
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

    const res = await request(app).get('/v1/authen/device/verify').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe('Validation Error: accessToken header is required');
  });

  it('should return 400 with missing device header', async () => {
    const requestHeader = { accessToken: '1234' } 

    const res = await request(app).get('/v1/authen/device/verify').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe('Validation Error: device header is required');
  });

  it('should return 400 with not found user', async () => {
    const requestHeader = { accessToken: '1234', device: '1234' } 
    
    jest.spyOn(UserModel, 'findOne').mockResolvedValue(null)

    const res = await request(app).get('/v1/authen/device/verify').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe(DeviceError.ERR_DEVICE_NOT_FOUND.resDesc.en);
  });

  it('should return 200 response success', async () => {
    const requestHeader = { accessToken: '1234', device: '1234' } 
    
    jest.spyOn(UserModel, 'findOne').mockResolvedValue({id: 1} as any)

    const res = await request(app).get('/v1/authen/device/verify').set(requestHeader);
    
    expect(res.status).toBe(200)
    expect(UserModel.findOne).toHaveBeenCalledTimes(1)
  });

})

describe('PUT /v1/authen/device', () => {
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

    const res = await request(app).put('/v1/authen/device').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe('Validation Error: accessToken header is required');
  });

  it('should return 400 with missing device body', async () => {
    const requestHeader = { accessToken: '1234' } 

    const res = await request(app).put('/v1/authen/device').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe('Validation Error: device body is required');
  });

  it('should return 400 with not found user', async () => {
    const requestHeader = { accessToken: '1234' } 
    const requestBody = { device: '1234' }

    jest.spyOn(UserModel, 'findOne').mockResolvedValue(null)

    const res = await request(app).put('/v1/authen/device').send(requestBody).set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(UserModel.findOne).toHaveBeenCalledTimes(1)
    expect(resDesc).toBe(DeviceError.ERR_DEVICE_NOT_FOUND.resDesc.en);
  });

  it('should return 200 with response success', async () => {
    const requestHeader = { accessToken: '1234' } 
    const requestBody = { device: '1234' }

    jest.spyOn(UserModel, 'findOne').mockResolvedValue({ id: 1 } as UserModel)
    jest.spyOn(UserModel, 'update').mockResolvedValue({ id: 1, device: requestBody.device} as any)

    const res = await request(app).put('/v1/authen/device').send(requestBody).set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(200);
    expect(UserModel.findOne).toHaveBeenCalledTimes(1)
    expect(UserModel.update).toHaveBeenCalledTimes(1)
  });
})