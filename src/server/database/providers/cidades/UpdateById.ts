import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";


export const update = async (id: number, cidade: Omit<ICidade, "id">): Promise<void | Error> => {

    try {
        const result = await Knex(ETableNames.cidade)
            .where("id", "=", id)
            .update(cidade);

        if (result > 0) return;
    } catch(error) {
        console.log(error);
        return new Error("Erro ao consultar o registro");
    }
    
};