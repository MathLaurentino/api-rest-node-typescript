import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";


/**
 * Retorna uma lista de cidades com base nos parâmetros fornecidos.
 * 
 * @param {number} page - Número da página para paginação.
 * @param {number} limit - Limite de registros por página.
 * @param {string} filter - Filtro de pesquisa para o nome da cidade.
 * @param {number} [id=0] - ID da cidade (opcional).
 * @returns {Promise<ICidade[] | Error>} - Retorna uma Promise com um array de cidades ou um erro.
 * @throws {Error} - Retorna um erro se não for possível consultar os registros.
 */
export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<ICidade[] | Error> => {
    try {
        const result = await Knex(ETableNames.cidade)
            .select("*")
            .where("id", Number(id))
            .orWhere("nome", "like", `%${filter}%`)
            .offset((page - 1) * limit)
            .limit(limit);
        
        if (id > 0 && result.every(item => item.id !== id)) {
            const resultById = await Knex(ETableNames.cidade)
                .select("*")
                .where("id", id)
                .first();

            if (resultById) return [...result, resultById];
        }

        return result;
    } catch (error) {
        console.log(error);
        return new Error("Erro ao consultar os registros");
    }
};