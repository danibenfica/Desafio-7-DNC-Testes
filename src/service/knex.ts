import knex, { Knex } from 'knex';
import knexConfig from '../config/knex';

export class KnexService {
  private static conn: Knex

  obterConexao = () => {
    if(!KnexService.conn) {
      KnexService.conn = knex(knexConfig)
    }
    return KnexService.conn
  }
}     