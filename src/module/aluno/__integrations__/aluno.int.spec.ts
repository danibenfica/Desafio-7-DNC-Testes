import * as request from 'supertest'

describe('Int Aluno Suite', () => {
    it('##GET /aluno', async () => {
        const response = await request ('http://localhost:3000')
        .get('/aluno')

    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch('application/json')
    expect(response.body.data).toHaveLength(12)
    })

    it('##POST /aluno', async () => {
        const response = await request ('http://localhost:3000')
        .post('/aluno')
        .send({
            nome: "ana",
            cpf: "523-545-251-36"
        })
        expect(response.status).toBe(201)
        expect(response.headers['content-type']).toMatch('application/json')
        expect(response.body.mensagem).toBe('Aluno cadastrado com sucesso!')
    })

    it('##POST /aluno e cpf incorretos', async () => {
        const response = await request ('http://localhost:3000')
        .post('/aluno')
        .send({
            name: "",
            CPF: "000000"
        })

    expect(response.status).toBe(400)
    expect(response.headers['content-type']).toMatch('application/json')
    expect(response.body.mensagem).toEqual('Insira o nome e o cpf!')
    })

    it('##GET /listar um aluno', async () => {
        const response = await request('http://localhost:3000')
            .get('/aluno/1') 

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch('application/json')
        expect(response.body.data).toHaveProperty('nome')
        expect(response.body.data).toHaveProperty('cpf')
    })

    it.only('##PUT /atualizar aluno', async () => {
        const response = await request('http://localhost:3000')
            .put('/aluno/19') 
            .send({
                nome: "Mya Wolfhart",
            })

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch('application/json')
        expect(response.body.mensagem).toBe('Dados atualizados com sucesso!')
    })

    it('##DELETE /deletar aluno', async () => {
        const response = await request('http://localhost:3000')
            .delete('/aluno/15') 

        expect(response.body.mensagem).toBe('Aluno deletado com sucesso!')
    })

    it('##POST / cpf já cadastrado', async () => {
        const response = await request ('http://localhost:3000')
        .post('/aluno')
        .send({
            name: "ana",
            CPF: "523-545-251-36"
        })

    expect(response.status).toBe(400)
    expect(response.headers['content-type']).toMatch('application/json')
    expect(response.body.mensagem).toEqual('Cpf já cadastrado!')
    })


})