import { IPessoa } from "../../database/models";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { PessoaProvider } from "../../database/providers/pessoas";

/**
 * Propriedades dos parâmetros da requisição do endpoint de updateById.
 * Contém o id da pessoa a ser atualizada.
 */
interface IParamProps {
    id?: number;
}

/**
 * Propriedades do corpo da requisição do endpoint de updateById.
 * Contém as propriedades da pessoa a ser atualizada.
 */
interface IBodyProps extends Omit<IPessoa, "id"> {}


/**
 * Middleware de validação para a rota de updateById.
 * Valida as propriedades id dos parâmetros da requisição 
 *      e as propriedades de uma pessoa no corpo da requisição.
 */
export const updateByIdValidation = validation(getSchema => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().required().email(),
        cidadeId: yup.number().integer().required().moreThan(0),
        nomeCompleto: yup.string().required().min(3),
    })),
}));


/**
 * Endpoint que atualiza uma pessoa pelo seu id.
 */
export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res:Response): Promise<Response> => {
    
    // verifica se o id da pessoa está presente nos parâmetros da requisição
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json();
    }

    // atualiza a pessoa pelo id com as novas propriedades
    const result = await PessoaProvider.updateById(req.params.id, req.body);

    // caso ocorra um erro na atualização da pessoa
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            }
        });
    }

    // retorna uma resposta sem conteúdo caso a atualização seja bem sucedida
    return res.status(StatusCodes.NO_CONTENT).send();
};