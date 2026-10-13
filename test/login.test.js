const request = require('supertest');
const {expect} = require('chai');

describe('Login Tests', () => {
    describe('POST /login', () => {
        it('Deve retornar 200 com token em string quando usar credenciais validas', async() => {
            const response = await request('http://localhost:3000')
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'cloe.alberto',
                    'senha': '101010'
                })
            expect(response.status).to.equal(200);
            expect(response.body.token).to.be.a('string');

    })  })

})