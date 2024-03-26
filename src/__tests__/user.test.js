const request = require('supertest');
const app = require('../app');

describe('GET /users', () => {
  it('should return a list of users', async () => {
    const res = await request(app).get('/users');
    expect(res.body[1]).toHaveProperty('firstName');
    expect(res.statusCode).toBe(200);
    
  });
});

