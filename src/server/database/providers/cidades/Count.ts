import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";


/**
 * Retorna a quantidade total de cidades que correspondem ao filtro fornecido.
 * 
 * @param {string} [filter=""] - Filtro de pesquisa para o nome da cidade (opcional, valor padrão é "").
 * @returns {Promise<number | Error>} - Retorna uma Promise com o número total de cidades ou um erro.
 * @throws {Error} - Retorna um erro se não for possível consultar a quantidade total de registros.
 */
export const count = async (filter = ""): Promise<number | Error> => {
    
    try {
        const [{count}] = await Knex(ETableNames.cidade)
            .where("nome", "like", `%${filter}%`)
            .count<[{ count: number }]>("* as count");

        if (Number.isInteger(Number(count))) return Number(count);

        return new Error("Erro ao consultar a quantidade todal de registros");
    } catch (error) {
        console.log(error);
        return new Error("Erro ao consultar a quantidade todal de registros");
    }

};
