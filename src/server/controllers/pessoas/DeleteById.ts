import { validation } from "../../shared/middleware";
import * as yup from "yup";
import { Request, Response } from "express";
import { PessoaProvider } from "../../database/providers/pessoas";
import { StatusCodes } from "http-status-codes";


/**
 * Propriedades da requisição do endpoint de deleteById.
 * Contém as propriedades dos parâmetros da requisição, que incluem o id da pessoa a ser deletada.
 */
interface IParamProps {
    id?: number;
}


/**
 * Middleware de validação para a rota de deleteById.
 * Valida a propriedade id dos parâmetros da requisição.
 */
export const deleteByIdValidation = validation(getSchema => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));


/**
 * Endpoint que deleta uma pessoa pelo seu id.
 */
export const deleteById = async (req: Request<IParamProps>, res:Response): Promise<Response> => {
    
    // verifica se o id da pessoa está presente nos parâmetros da requisição
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json();
    }

    // tenta deletar a pessoa pelo id
    const result  = await PessoaProvider.deleteById(req.params.id);

    // caso ocorra um erro na deleção
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            }
        });
    }

    // caso a deleção seja bem sucedida
    return res.status(StatusCodes.NO_CONTENT).send();
};