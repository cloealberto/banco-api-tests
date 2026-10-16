const request = require('supertest')
const {expect} = require('chai')
require('dotenv').config({ override: true })
const { obterToken } = require('../helpers/autenticacao')
const postTransferencias = require('../fixtures/postTransferencias.json')

describe('Transferencia Tests', () => {
    describe('POST /transferencias', () => {
        let token

        beforeEach(async() => {
            token = await obterToken(process.env.USERNAME, process.env.PASSWORD);

        })
        it('Deve retornar 201 com mensagem de sucesso quando o valor da transferência for igual ou acima de R$ 10,00', async() => {
            const bodyTransferencias = {...postTransferencias}
            
            const responseTransf = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)

            expect(responseTransf.status).to.equal(201)
        })

        it('Deve retornar falha com 422 quando o valor da transferência for abaixo de R$ 10,00', async() => {
            const bodyTransferencias = {...postTransferencias}
            bodyTransferencias.valor = 9.99

            const responseTransf = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)

            expect(responseTransf.status).to.equal(422)


        })

    })

})