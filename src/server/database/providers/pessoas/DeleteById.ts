import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";


export const deleteById = async (id: number): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.pessoa).where("id", id).del();

        if (result > 0) return; // se o numero de linhas afetadas for maior que zero

        return new Error("Falha ao apagar registro de pessoa");

    } catch (error) {
        console.log(error);
        return new Error("Falha ao apagar pessoa");
    }
};