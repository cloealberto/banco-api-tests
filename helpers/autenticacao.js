const request = require('supertest')
require('dotenv').config({ override: true })
const postLogin = require('../fixtures/postLogin.json')

const obterToken = async (usuario, senha) => {
    const bodyLogin = {...postLogin}
    
    const responseLogin = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(bodyLogin)
        
    return responseLogin.body.token;
}

module.exports = { 
    obterToken
};