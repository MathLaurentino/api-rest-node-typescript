
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";
import { CidadeProvider } from "../cidades";


export const updateById = async (id: number, pessoa: Omit<IPessoa, "id">): Promise<void | Error> => {
    try {
        const verifyIdCidade = CidadeProvider.getById(pessoa.cidadeId);

        if (verifyIdCidade instanceof Error){
            return new Error("id cidade inválido");
        } 
           
        const result = await Knex(ETableNames.pessoa).where("id", id).update(pessoa);

        if (result > 0) return;

        return new Error("Falha ao atualizar pessoa");
    } catch (error) {
        console.log(error);
        return new Error("Falha ao atualizar pessoa");
    }  
};