/* eslint-disable no-undef */

const user = require('../app');
const request = require('supertest');

describe('User Authentication', () => {
    test('Testing sign up', async () => {
            const response = await request(user).post('/signup').send({ "name": "testUser", "role": "Student", "password": "dash", "username": "1by20cs153" });
        return expect(response.body).toBe(200);
       
    });
})

