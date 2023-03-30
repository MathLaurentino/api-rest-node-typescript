import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";
import { CidadeProvider } from "../cidades";


export const create = async (pessoa: Omit<IPessoa, "id">): Promise<number | Error> => {
    try {

        const verifyIdCidade = await CidadeProvider.getById(pessoa.cidadeId);

        if (verifyIdCidade instanceof Error) {
            return new Error("id cidade inválido");
        }

        const [result] = await Knex(ETableNames.pessoa).insert(pessoa).returning("id");
        
        if (typeof result === "object") {
            return result.id;
        } 
        else if (typeof result === "number") {
            return result;
        }

        return new Error("falha ao cadastrar pessoa");
    } catch (error) {
        console.log(error);
        return new Error("falha ao cadastrar pessoa");
    }  
};