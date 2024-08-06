import request from 'supertest';
import axios from 'axios'

import app from '../../app';

import { UserModel, UserKeyModel, UserBankModel, MasterBankModel } from '@planetx/models'
import { ServiceError } from '../../helpers/error.helper';

jest.mock('../../helpers/sequelize.helper', () => ({
  authenticate: jest.fn()
}))

jest.mock('@planetx/helpers/src/util/jweUtil', () => ({
  JweDecrypt: jest.fn().mockReturnValue('123456'),
  cryptoEncrypt: jest.fn().mockReturnValue('encrypt'),
  cryptoDecrypt: jest.fn().mockReturnValue('{"field":"username"}'
)
}))


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('POST /v1/kyc/scb/user', () => {
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

  const fullbody = { pin: '123456', device: '123456' }

  const mockResultWallet = {
    id: 1,
    walletId: '1234',
    save: jest.fn().mockResolvedValue(null)
  }

  const mockUserKey = {
    id: 1,
    privateKey: '1234',
    phoneNo: '0000000000',
    userId: null,
    save: jest.fn().mockResolvedValue(null)
  }

  it('should return 400 with missing accessToken header', async () => {
    const requestHeader = { } 

    const res = await request(app).post('/v1/kyc/user').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe('Validation Error: accessToken header is required');
  });

  it('should return 400 with missing pin body', async () => {
    const requestHeader = { accessToken: '1234' } 

    const res = await request(app).post('/v1/kyc/user').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe('Validation Error: pin body is required');
  });

  it('should return 400 with missing device body', async () => {
    const requestHeader = { accessToken: '1234' } 
    const requestBody = { pin: '123456' }

    const res = await request(app).post('/v1/kyc/user').send(requestBody).set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe('Validation Error: device body is required');
  });

  it('should return 400 with not found user key', async () => {
    const requestHeader = { accessToken: '1234' } 

    jest.spyOn(UserKeyModel, 'findOne').mockResolvedValue(null)

    const res = await request(app).post('/v1/kyc/user').send(fullbody).set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe('User key not found');
  });

  it('should return 400 with not found bank', async () => {
    const requestHeader = { accessToken: '1234' } 

    jest.spyOn(UserKeyModel, 'findOne').mockResolvedValue({id: 1} as UserKeyModel)
    jest.spyOn(UserModel, 'create').mockResolvedValue(null)
    jest.spyOn(MasterBankModel, 'findOne').mockResolvedValue(null)

    const res = await request(app).post('/v1/kyc/user').send(fullbody).set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe('Bank not found');
  });

  it('should return 400 with token api error', async () => {
    const requestHeader = { accessToken: '1234' } 

    jest.spyOn(UserKeyModel, 'findOne').mockResolvedValue(mockUserKey as any)
    jest.spyOn(UserModel, 'create').mockResolvedValue({id: 1, uid: '1234'})
    jest.spyOn(MasterBankModel, 'findOne').mockResolvedValue({id: 1} as MasterBankModel)
    jest.spyOn(UserBankModel, 'create').mockResolvedValue(null)

    const mockError = {
      statusCode: 400,
      resCode: 'API_ERROR',
      resDesc: { en: 'Token Error', th: 'ผิดพลาด' },
    }
    mockedAxios.get.mockRejectedValue(new ServiceError(mockError));

    const res = await request(app).post('/v1/kyc/user').send(fullbody).set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
      
    expect(res.status).toBe(400);
    expect(resDesc).toEqual(mockError.resDesc.en)
  });

  it('should return 200 with success', async () => {
    const requestHeader = { accessToken: '1234' } 

    jest.spyOn(UserKeyModel, 'findOne').mockResolvedValue(mockUserKey as any)
    jest.spyOn(UserModel, 'create').mockResolvedValue({id: 1, uid: '1234'})
    jest.spyOn(MasterBankModel, 'findOne').mockResolvedValue({id: 1} as MasterBankModel)
    jest.spyOn(UserBankModel, 'create').mockResolvedValue(null)

    const mockDataToken = { data: { accessToken: 'token' } };
    mockedAxios.get.mockResolvedValueOnce({data: mockDataToken});

    const res = await request(app).post('/v1/kyc/user').send(fullbody).set(requestHeader);
    const resData= JSON.parse(res.text).data
    
    expect(res.status).toBe(200);
    expect(resData).toEqual(mockDataToken.data)
  });
})

describe('GET /v1/kyc/scb/user', () => {
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

    const res = await request(app).get('/v1/kyc/user').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe('Validation Error: accessToken header is required');
  });

  it('should return 400 with not found user', async () => {
    const requestHeader = { accessToken: '1234' } 

    jest.spyOn(UserModel, 'findOne').mockResolvedValue(null)

    const res = await request(app).get('/v1/kyc/user').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe('User not found');
  });

  it('should return 200 with response success', async () => {
    const requestHeader = { accessToken: '1234' } 

    jest.spyOn(UserModel, 'findOne').mockResolvedValue({id: 1, titleNameTh: 'title', titleNameEn: 'title', phoneNo: '0', birthDate: '0' } as UserModel)

    const res = await request(app).get('/v1/kyc/user').set(requestHeader);
    const resData = JSON.parse(res.text).data
    
    expect(res.status).toBe(200);
    expect(resData).toHaveProperty('titleNameTh');
    expect(resData).toHaveProperty('firstNameTh');
    expect(resData).toHaveProperty('lastNameTh');
    expect(resData).toHaveProperty('titleNameEn');
    expect(resData).toHaveProperty('firstNameEn');
    expect(resData).toHaveProperty('lastNameEn');
    expect(resData).toHaveProperty('phoneNo');
    expect(resData).toHaveProperty('citizenId');
    expect(resData).toHaveProperty('passportNumber');
    expect(resData).toHaveProperty('alienId');
    expect(resData).toHaveProperty('birthDate');
    expect(resData).toHaveProperty('email');
  });

})