const request = require('supertest');
const {expect} = require('chai');
require('dotenv').config({ override: true });

describe('Transferencia Tests', () => {
    describe('POST /transferencias', () => {
        it('Deve retornar 201 com mensagem de sucesso quando o valor da transferência for igual ou acima de R$ 10,00', async() => {
            
            // captura do token de autenticação
            const responseLogin = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': process.env.USERNAME,
                    'senha': process.env.PASSWORD
                })

            const token = responseLogin.body.token;

            const responseTransf = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 10.00,
                    token: ""
                });
            expect(responseTransf.status).to.equal(201);
        })

        it('Deve retornar falha com 422 quando o valor da transferência for abaixo de R$ 10,00', async() => {

            // captura do token de autenticação
            const responseLogin = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': process.env.USERNAME,
                    'senha': process.env.PASSWORD
                })

            const token = responseLogin.body.token;

            const responseTransf = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 9.99,
                    token: ""
                });
            expect(responseTransf.status).to.equal(422);


        })

    })

})