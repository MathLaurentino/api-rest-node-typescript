import { ICidade, IPessoa } from "../../models"; // IPessoa, IUsuario

/**
 * Define a tipagem para o Knex
 */
declare module "knex/types/tables" {
  interface Tables {
    pessoa: IPessoa;
    cidade: ICidade;
    // usuario: IUsuario;
  }
}