import { validation } from "../../shared/middleware";
import * as yup from "yup";
import { Request, Response } from "express";
import { PessoaProvider } from "../../database/providers/pessoas";
import { StatusCodes } from "http-status-codes";

/**
 * Propriedades dos parâmetros da requisição do endpoint de getById.
 * Contém o id da pessoa a ser buscada.
 */
interface IParamProps {
    id?: number;
}

/**
 * Middleware de validação para a rota de getById.
 * Valida a propriedade id dos parâmetros da requisição.
 */
export const getByIdValidation = validation(getSchema => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));


/**
 * Endpoint que busca uma pessoa pelo seu id.
 */
export const getById = async (req: Request<IParamProps>, res: Response): Promise<Response> => {

    // verifica se o id da pessoa está presente nos parâmetros da requisição
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json();
    }

    // busca a pessoa pelo id
    const result = await PessoaProvider.getById(req.params.id);

    // caso ocorra um erro na busca da pessoa
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            }
        });
    }

    // retorna a pessoa encontrada
    return res.status(StatusCodes.OK).json(result);
};