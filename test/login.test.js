const request = require('supertest');
const {expect} = require('chai');
require('dotenv').config({ override: true });

describe('Login Tests', () => {
    describe('POST /login', () => {
        it('Deve retornar 200 com token em string quando usar credenciais validas', async() => {
            const response = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': process.env.USERNAME,
                    'senha': process.env.PASSWORD
                })
            expect(response.status).to.equal(200);
            expect(response.body.token).to.be.a('string');

    })  })

})