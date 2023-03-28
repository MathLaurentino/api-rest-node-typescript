/**
 * Este módulo exporta funções relacionadas à exclusão de itens e seu middleware de validação.
 * @packageDocumentation
 */

import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";

/** 
 * Interface para os parâmetros de rota usados na função deleteById
 */
interface IParamProps {
    id?: number;
}

/**
 * Retorna uma função de middleware que valida os parâmetros de rota de uma solicitação DELETE usando Yup.
 * @param getSchema - Função que recebe um esquema Yup e retorna um esquema Yup usado para validar os parâmetros de rota da solicitação
 * @returns Função de middleware Express para validar os parâmetros de rota da solicitação
 */
export const deleteByIdValidation = validation(getSchema => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

/**
 * Função que exclui um item com base nos parâmetros de rota da solicitação
 * @param req - Objeto de solicitação Express
 * @param res - Objeto de resposta Express
 * @returns Promessa que resolve em uma resposta vazia ou um erro
 */
export const deleteById = async (req: Request<IParamProps>, res: Response): Promise<Response> => {
    return res.status(StatusCodes.NO_CONTENT).send();
};