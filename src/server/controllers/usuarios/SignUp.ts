import { Request, Response } from "express";
import { IUsuario } from "../../database/models";
import { validation } from "../../shared/middleware";
import * as yup from "yup";
import { UsuarioProvider } from "../../database/providers/usuarios";
import { StatusCodes } from "http-status-codes";


/**
 * Propriedades da requisição do endpoint de signUp.
 * Contém as propriedades do corpo da requisição, exceto o id do usuário.
 */
interface IBodyProps extends Omit<IUsuario, "id"> {}


/**
 * Middleware de validação para a rota de signUp.
 * Valida as propriedades de nome, email e senha do corpo da requisição.
 */
export const signUpValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3),
        email: yup.string().required().email().min(5),
        senha: yup.string().required().min(6),
    })),
}));


/**
 * Endpoint que cria um novo usuário.
 */
export const signUp = async (req: Request<{},{}, IBodyProps>, res: Response): Promise<Response> => {

    // tenta criar um usuário
    const result = await UsuarioProvider.create(req.body);

    // caso ocorra um erro na criação
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    // caso a criação seja bem sucedida, retorna o id do usuário criado
    return res.status(StatusCodes.CREATED).json(result); 
};