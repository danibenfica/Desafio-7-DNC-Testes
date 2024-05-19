import * as request from 'supertest'

describe('Integration - Aluno Suite', () => {
    it('##GET /aluno', async () => {
        const response = await request ('http://localhost:3000')
        .get('/aluno')

    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch('application/json')
    expect(response.body.data).toHaveLength(6)
    })

    it('##POST /aluno', async () => {
        const response = await request ('http://localhost:3000')
        .post('/aluno')
        .send({
            nome: "Mya Alana",
            cpf: "523-665-411-36"
        })

    expect(response.status).toBe(201)
    expect(response.headers['content-type']).toMatch('application/json')
    expect(response.body.data).toHaveLength(1)
    })
})