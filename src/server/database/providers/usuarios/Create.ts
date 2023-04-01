import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUsuario } from "../../models";


/**
 * Cria uma nova usuario na tabela de usuarios.
 * @async
 * @param {Omit<IUsuario, "id">} usuario - As informações da usuario a serem inseridas, usa a interface mas omite o campo "id".
 * @returns {Promise<number | Error>} O ID da usuario inserida, ou um objeto Error caso ocorra algum erro.
 */
export const create = async (usuario: Omit<IUsuario, "id">): Promise<number | Error> => {
    try{
        const [result] = await Knex(ETableNames.usuario).insert(usuario).returning("id");

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
