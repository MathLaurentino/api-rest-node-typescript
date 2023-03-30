import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";


export const getById = async (id: number): Promise<IPessoa | Error> => {
    try {
        const result = await Knex(ETableNames.pessoa)
            .select("*")
            .from(ETableNames.pessoa)
            .where("id", id)
            .first();

        if(result) return result;

        return new Error("falha ao buscar pessoa por id");
    } catch (error) {
        console.log(error);
        return new Error("falha ao buscar pessoa por id");
    }
};