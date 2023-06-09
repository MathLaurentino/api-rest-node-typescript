/**
 * Este módulo exporta funções relacionadas à criação de itens e seu middleware de validação.
 * @packageDocumentation
 */

import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";
import { ICidade } from "../../database/models";
import { CidadeProvider } from "../../database/providers/cidades";


/** 
 * Interface para o corpo da solicitação usado na função create
 * extends o ICidade mas omitindo o campo "id"
 */
interface IBodyProps extends Omit<ICidade, "id"> {}


/**
 * Retorna uma função de middleware que valida o corpo de uma solicitação POST usando Yup.
 * @returns Função de middleware Express para validar o corpo da solicitação
 */
export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3).max(150),
    })),
})); 


/**
 * Função que cria um item com base no corpo da solicitação
 * @param req - Objeto de solicitação Express
 * @param res - Objeto de resposta Express
 * @returns Promessa que resolve em um objeto de item ou um erro
 */
export const create = async (req: Request<{}, {}, ICidade>, res: Response): Promise<Response> => {

    const result = await CidadeProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    } else {
        return res.status(StatusCodes.CREATED).json(result); // devolve o id criado
    }
    
};