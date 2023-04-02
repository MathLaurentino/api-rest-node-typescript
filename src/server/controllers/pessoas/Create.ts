import { IPessoa } from "../../database/models";
import { validation } from "../../shared/middleware";
import * as yup from "yup";
import { Request, Response } from "express";
import { PessoaProvider } from "../../database/providers/pessoas";
import { StatusCodes } from "http-status-codes";


/**
 * Propriedades da requisição do endpoint de create.
 * Contém as propriedades do corpo da requisição, exceto o id da pessoa.
 */
interface IBodyProps extends Omit<IPessoa, "id">{}


/**
 * Middleware de validação para a rota de create.
 * Valida as propriedades de email, cidadeId e nomeCompleto do corpo da requisição.
 */
export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().required().email(),
        cidadeId: yup.number().integer().required().moreThan(0),
        nomeCompleto: yup.string().required().min(3),
    })),
})); 


/**
 * Endpoint que cria uma nova pessoa.
 */
export const create = async (req: Request<{},{},IBodyProps>, res:Response): Promise<Response> => {

    // tenta criar a pessoa
    const result = await PessoaProvider.create(req.body);

    // caso ocorra um erro na criação
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    // caso a criação seja bem sucedida, retorna o id da pessoa criada
    return res.status(StatusCodes.CREATED).json(result);
};
