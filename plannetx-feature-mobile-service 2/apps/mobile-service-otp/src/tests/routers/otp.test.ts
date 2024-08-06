import request from 'supertest';
import app from '../../app';

import { OTPModel } from '@planetx/models'
import moment from 'moment';

jest.mock('sequelize')

jest.mock('../../helpers/sequelize.helper', () => ({
  authenticate: jest.fn()
}))

jest.mock('nanoid', () => ({
  nanoid: jest.fn(() => () => 'abcdef'),
  customAlphabet: jest.fn(() => () => 'abcdef')
}))

describe('GET /v1/otp', () => {
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

  const mockOtpModelResult = {
    save: jest.fn().mockResolvedValue({}),
    create: jest.fn().mockResolvedValue({})
  }

  it('should return 400 with missing phoneNo header', async () => {
    const requestHeader = { } 

    const res = await request(app).get('/v1/otp').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe('Validation Error: phoneNo header is required');
  });

  it('should return 200 with not have existing otp', async () => {
    const requestHeader = { phoneNo: '0000000000' } 

    jest.spyOn(OTPModel, 'findOne').mockResolvedValue(null)
    jest.spyOn(OTPModel, 'create').mockResolvedValue({})

    const res = await request(app).get('/v1/otp').set(requestHeader);
    const resData = JSON.parse(res.text).data
    
    expect(res.status).toBe(200);
    expect(OTPModel.create).toHaveBeenCalledTimes(1)
    expect(resData).toHaveProperty('accessToken');
    expect(resData).toHaveProperty('accessExpired');
    expect(resData).toHaveProperty('reference');
    expect(resData.reference).toBe('abcdef');
  });

  it('should return 200 with existing otp', async () => {
    const requestHeader = { phoneNo: '0000000000' } 

    jest.spyOn(OTPModel, 'findOne').mockResolvedValue({id: 1, ...mockOtpModelResult} as any)

    const res = await request(app).get('/v1/otp').set(requestHeader);
    const resData = JSON.parse(res.text).data
    
    expect(res.status).toBe(200);
    expect(mockOtpModelResult.save).toHaveBeenCalledTimes(1)
    expect(resData).toHaveProperty('accessToken');
    expect(resData).toHaveProperty('accessExpired');
    expect(resData).toHaveProperty('reference');
    expect(resData.reference).toBe('abcdef');
  });
});

describe('POST /v1/otp', () => {
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

  jest.mock('moment', () => {
    const actualMoment = jest.requireActual('moment');
    return () => actualMoment('2024-01-01T00:00:00.000Z');
  });

  const requestBody = { otp: '123456' }

  const mockResultOtp = { 
    attempt: 0, 
    expiredAt: moment().add('1', 'hours'), 
    otp: '123456',
    save: jest.fn().mockResolvedValue({})
  }

  it('should return 400 with missing authorization header', async () => {
    const requestHeader = { } 

    const res = await request(app).post('/v1/otp').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe('Validation Error: authorization header is required');
  });

  it('should return 400 with missing otp body', async () => {
    const requestHeader = { authorization: '1234' } 

    const res = await request(app).post('/v1/otp').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe('Validation Error: otp body is required');
  });

  it('should return 400 with otp not found', async () => {
    const requestHeader = { authorization: '1234' } 

    jest.spyOn(OTPModel, 'findOne').mockResolvedValue(null)

    const res = await request(app).post('/v1/otp').send(requestBody).set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(OTPModel.findOne).toHaveBeenCalledTimes(1)
    expect(resDesc).toBe('OTP not found');
  });

  it('should return 400 with otp attemp over 3', async () => {
    const requestHeader = { authorization: '1234' } 

    jest.spyOn(OTPModel, 'findOne').mockResolvedValue({ attempt: 3} as OTPModel)

    const res = await request(app).post('/v1/otp').send(requestBody).set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(OTPModel.findOne).toHaveBeenCalledTimes(1)
    expect(resDesc).toBe('You have exceeded limit OTP attempt');
  });

  it('should return 400 with otp is not correct', async () => {
    const requestHeader = { authorization: '1234' } 

    jest.spyOn(OTPModel, 'findOne').mockResolvedValue({ ...mockResultOtp, otp: '555555'} as any)

    const res = await request(app).post('/v1/otp').send(requestBody).set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(OTPModel.findOne).toHaveBeenCalledTimes(1)
    expect(mockResultOtp.save).toHaveBeenCalledTimes(1)
    expect(resDesc).toBe('Your OTP is not correct');
  });

  it('should return 400 with otp expired', async () => {
    const requestHeader = { authorization: '1234' } 

    jest.spyOn(OTPModel, 'findOne').mockResolvedValue({ ...mockResultOtp, expiredAt: moment().subtract('1', 'hours')} as any)

    const res = await request(app).post('/v1/otp').send(requestBody).set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(OTPModel.findOne).toHaveBeenCalledTimes(1)
    expect(resDesc).toBe('Your OTP has expired');
  });

  it('should return 200 with otp expired', async () => {
    const requestHeader = { authorization: '1234' } 

    jest.spyOn(OTPModel, 'findOne').mockResolvedValue(mockResultOtp as any)

    const res = await request(app).post('/v1/otp').send(requestBody).set(requestHeader);
    
    expect(res.status).toBe(200);
    expect(OTPModel.findOne).toHaveBeenCalledTimes(1)
    expect(mockResultOtp.save).toHaveBeenCalledTimes(1)
  });
});