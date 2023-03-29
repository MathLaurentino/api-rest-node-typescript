import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";


export const remove = async (id: number): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.cidade).where("id", id).del();

        // se apagou o registro
        if (result === 1) {
            return;
        } else {
            return new Error("Erro ao apagar registro");
        } 

    } catch (error) {
        return new Error("Erro ao apagar registro");
    }
};