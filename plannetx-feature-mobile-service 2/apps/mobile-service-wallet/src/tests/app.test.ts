import request from 'supertest';
import app from '../app';

jest.mock('../helpers/sequelize.helper', () => ({
  authenticate: jest.fn()
}))

describe('GET /', () => {
  it('should return 200 and service name', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Scb-planetx : mobile service wallet');
  });
});