import { Aluno } from "../aluno.model"

describe('Unit Aluno model suite', () => {
    it('deve retornar a listagem de alunos', async () => {

        let knexServiceMock: any
        
        const knexMock = () => {
            return {
                select: jest.fn().mockReturnValueOnce([])
            }
        }

        knexServiceMock = {
            obterConexao: jest.fn(() => knexMock)
        }
        const aluno = new Aluno(knexServiceMock)
        const response = await aluno.getAll()
        expect(response).toBeTruthy()
        expect(response.length).toBe(0)

    })

    it('deve salvar um aluno no modelo', async () => {

        let knexServiceMock: any
        
        const knexMock = () => {
            return {
                insert: jest.fn().mockReturnValueOnce([6])
            }
        }

        knexServiceMock = {
            obterConexao: jest.fn(() => knexMock)
        }
        const aluno = new Aluno(knexServiceMock)
        const response = await aluno.dbaluno({
            nome: 'Saki',
            cpf: '987-654-321-00'
        })
        expect(response).toBeTruthy()
        expect(response).toEqual([6])

    })

    it('deve retornar um único aluno por ID', async () => {
        let knexServiceMock: any
        
        const knexMock = () => {
            return {
                where: jest.fn().mockReturnValueOnce({ first: jest.fn().mockReturnValueOnce({ id: 3, nome: 'Amelie Wolfhart', cpf: '253.426.755-00' }) })
            }
        }
    
        knexServiceMock = {
            obterConexao: jest.fn(() => knexMock)
        }
        const aluno = new Aluno(knexServiceMock)
        const response = await aluno.getById(3)
        expect(response).toBeTruthy()
        expect(response).toEqual({ id: 3, nome: 'Amelie Wolfhart', cpf: '253.426.755-00' })
    })

    it('deve atualizar os dados de um aluno', async () => {
        let knexServiceMock: any
        
        const knexMock = () => {
            return {
                where: jest.fn().mockReturnValueOnce({ update: jest.fn().mockReturnValueOnce(1) })
            }
        }
    
        knexServiceMock = {
            obterConexao: jest.fn(() => knexMock)
        }
        const aluno = new Aluno(knexServiceMock)
        const response = await aluno.updateById(4, { nome: 'Doug Wolfhart', cpf: '253.126.555-00'})
        expect(response).toBeTruthy()
        expect(response).toEqual(1)
    })

    it('deve excluir um aluno', async () => {
        let knexServiceMock: any
        
        const knexMock = () => {
            return {
                where: jest.fn().mockReturnValueOnce({ del: jest.fn().mockReturnValueOnce(1) })
            }
        }
    
        knexServiceMock = {
            obterConexao: jest.fn(() => knexMock)
        }
        const aluno = new Aluno(knexServiceMock)
        const response = await aluno.deleteById(20)
        expect(response).toBeTruthy()
        expect(response).toEqual(1)
    })

    it('deve retornar um único aluno com um determinado CPF', async () => {
        let knexServiceMock: any
        
        const knexMock = () => {
            return {
                where: jest.fn().mockReturnValueOnce({ first: jest.fn().mockReturnValueOnce({ id: 1, nome: 'Amelie Wolfhart', cpf: '253.426.755-00' }) })
            }
        }
    
        knexServiceMock = {
            obterConexao: jest.fn(() => knexMock)
        }
        const aluno = new Aluno(knexServiceMock)
        const response = await aluno.getByCpf('253.426.755-00')
        expect(response).toBeTruthy()
        expect(response).toEqual({ id: 1, nome: 'Amelie Wolfhart', cpf: '253.426.755-00' })
    })

    it.only('deve retornar 0 ao tentar excluir um aluno inexistente', async () => {
        let knexServiceMock: any
        
        const knexMock = () => {
            return {
                where: jest.fn().mockReturnValueOnce({ del: jest.fn().mockReturnValueOnce(0) })
            }
        }
    
        knexServiceMock = {
            obterConexao: jest.fn(() => knexMock)
        }
        const aluno = new Aluno(knexServiceMock)
        const response = await aluno.deleteById(999)
        expect(response).toEqual(0)
    })
    
    
    
    
    
})