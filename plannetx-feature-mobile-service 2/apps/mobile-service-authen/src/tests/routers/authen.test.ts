import request from 'supertest';

import app from '../../app';

import { VersionModel } from '@planetx/models'

import VersionError from '@planetx/constants/errors/version.error.json'

jest.mock('../../helpers/sequelize.helper', () => ({
  authenticate: jest.fn()
}))

describe('GET /v1/authen/version', () => {
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

  it('should return 400 with missing version header', async () => {
    const requestHeader = { } 

    const res = await request(app).get('/v1/authen/version').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe('Validation Error: version header is required');
  });

  it('should return 400 with not found version', async () => {
    const requestHeader = { version: '1' }
    
    jest.spyOn(VersionModel, 'findOne').mockResolvedValue(null)

    const res = await request(app).get('/v1/authen/version').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe(VersionError.ERR_VERSION_NOT_FOUND.resDesc.en);
  });

  it('should return 400 with user version not match', async () => {
    const requestHeader = { version: '1' }
    
    jest.spyOn(VersionModel, 'findOne').mockResolvedValue({ version: '2', isPass: true} as any)

    const res = await request(app).get('/v1/authen/version').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe(VersionError.ERR_OLD_VERSION_AVAILABLE.resDesc.en);
  });

  it('should return 400 with user version not match and force update', async () => {
    const requestHeader = { version: '1' }
    
    jest.spyOn(VersionModel, 'findOne').mockResolvedValue({ version: '2', isPass: false} as any)

    const res = await request(app).get('/v1/authen/version').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(400);
    expect(resDesc).toBe(VersionError.ERR_OLD_VERSION_UNAVAILABLE.resDesc.en);
  });

  it('should return 200 response success', async () => {
    const requestHeader = { version: '2' }
    
    jest.spyOn(VersionModel, 'findOne').mockResolvedValue({ version: '2' } as any)

    const res = await request(app).get('/v1/authen/version').set(requestHeader);
    const resDesc = JSON.parse(res.text).resDesc
    
    expect(res.status).toBe(200);
    expect(resDesc).toBe('The latest version of the app is now available.');
  });

})