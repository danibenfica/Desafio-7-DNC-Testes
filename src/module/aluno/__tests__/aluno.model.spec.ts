import { Aluno } from "../aluno.model"
import { KnexService } from "../../../service/knex"

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
})