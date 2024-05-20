import {Knex} from 'knex'

import { KnexService } from  '../../service/knex'
export class Aluno {
  private db: Knex

  constructor(knexService: KnexService) {
    this.db = knexService.obterConexao()
  }

  getAll = async () => {
    return this.db('aluno').select()
  }

  dbaluno = async (params: any) => {
    return this.db('aluno').insert(params)
  }

  getById = async (id: number) => {
    return this.db('aluno').where({ id }).first()
  }

  getByCpf = async (cpf: string) => {
    return this.db('aluno').where({ cpf }).first()
}
getByName = async (nome: string) => {
  return this.db('aluno').where({ nome }).first()
}
  
  updateById = async (id: number, params: any) => {
    return this.db('aluno')
      .where({ id })
      .update(params)
  }

  deleteById = async (id: number) => {
    return this.db('aluno')
      .where({ id })
      .del()
  }

}
