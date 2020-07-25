const request = require('supertest');
const app = require('../server/server');

describe('Test path "/test"', () => {
    test('It should response the GET method', async (done) => {
        const response = await request(app).get('/test');
        expect(response.body.time).toBe('now');
        done();
    });
});

