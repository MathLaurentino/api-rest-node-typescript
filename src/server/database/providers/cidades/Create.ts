import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";


/**
 * Cria uma nova cidade na tabela de cidades.
 * @async
 * @param {Omit<ICidade, "id">} cidade - As informações da cidade a serem inseridas, usa a interface mas omite o campo "id".
 * @returns {Promise<number | Error>} O ID da cidade inserida, ou um objeto Error caso ocorra algum erro.
 */
export const create = async (cidade: Omit<ICidade, "id">): Promise<number | Error> => {
    try{
        const [result] = await Knex(ETableNames.cidade).insert(cidade).returning("id");

        if (typeof result === "object") {
            return result.id;
        }  else if (typeof result === "number") {
            return result;
        }

        return new Error("Erro ao cadastrar o registro");
    } catch(error) {
        console.log(error);
        return new Error("Erro ao cadastrar o registro");
    }   
};