import { Aluno } from "./aluno.model";
import { KnexService } from "../../service/knex";

export default new Aluno(new KnexService)