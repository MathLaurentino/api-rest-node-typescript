/**
 * Este módulo exporta funções relacionadas à recuperação de um item por id e seu middleware de validação.
 * @packageDocumentation
 */

import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";
import { CidadeProvider } from "../../database/providers/cidades";

/** 
 * Interface para os parâmetros de rota usados na função getById
 */
interface IParamProps {
    id?: number;
}

/**
 * Retorna uma função de middleware que valida os parâmetros de rota de uma solicitação GET usando Yup.
 * @returns Função de middleware Express para validar os parâmetros de rota da solicitação
 */
export const getByIdValidation = validation(getSchema => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

/**
 * Função que recupera um item com base nos parâmetros de rota da solicitação
 * @param req - Objeto de solicitação Express
 * @param res - Objeto de resposta Express
 * @returns Promise que resolve em um objeto de item ou um erro
 */
export const getById = async (req: Request<IParamProps>, res: Response): Promise<Response> => {

    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: "O parâmetro 'id' precisa ser informado."
            }
        });
    }

    const result = await CidadeProvider.getById(req.params.id);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.OK).json(result);
};