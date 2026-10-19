const request = require('supertest')
const {expect} = require('chai')
require('dotenv').config({ override: true })
const { obterToken } = require('../helpers/autenticacao')
const postTransferencias = require('../fixtures/postTransferencias.json')

describe('Transferencia Tests', () => {
    let token

    beforeEach(async() => {
        token = await obterToken(process.env.USERNAME, process.env.PASSWORD);

    })

    describe('POST /transferencias', () => {
        
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

    describe('GET /transferencias/{id}', () => {
        it('Deve retornar sucesso com 200 e dados iguais ao registro de transferência contido no banco de dados, quando o ID for válido  ', async() => {
            const responseTransf = await request(process.env.BASE_URL)
                .get('/transferencias/8')
                .set('Authorization', `Bearer ${token}`)

            //console.log(responseTransf.body)
            //console.log(responseTransf.status)

            expect(responseTransf.status).to.equal(200)
            expect(responseTransf.body.id).to.equal(8)
            expect(responseTransf.body.id).to.be.a('number')
            expect(responseTransf.body.conta_origem_id).to.equal(1)
            expect(responseTransf.body.conta_destino_id).to.equal(2)
            expect(responseTransf.body.valor).to.equal(53.02)
            

        })


    })

    describe('GET /transferencias', () => {
        it('Deve retornar 10 elementos na paginação quando informar limite de 10 registros ', async() => {
            const responseTransf = await request(process.env.BASE_URL)
                .get('/transferencias?limite=10')
                .set('Authorization', `Bearer ${token}`)

            expect(responseTransf.status).to.equal(200)
            expect(responseTransf.body.limit).to.equal(10)
            expect(responseTransf.body.transferencias).to.have.lengthOf(10)


            console.log(responseTransf.body)
        })        




    })

})