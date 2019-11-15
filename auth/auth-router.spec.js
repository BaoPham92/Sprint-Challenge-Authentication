const req = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');

describe('Auth tests', () => {
    describe('Should be able to check requests', () => {

        beforeAll(async () => {
            await db('users').truncate()
        })

        describe("POST LOGIN",  () =>{
    
            it("should return 200 on successful post",  () => {
                 req(server)
                .post('/api/auth/login')
                .send({"username":"Cuma","password":"SKS"})
                .then(result => expect(result.status).toBe(200));
            });
        });

        describe("POST REGISTER",  () =>{
    
            it("should return 200 on successful post",  () => {
                 req(server)
                .post('/api/auth/register')
                .send({"username":"test","password":"SKS"})
                .then(result => expect(result.status).toBe(201));
            });
        });
    })
})