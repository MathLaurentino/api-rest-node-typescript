/**
 * Este módulo exporta funções relacionadas à atualização de itens e seu middleware de validação.
 * @packageDocumentation
 */

import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";
import { ICidade } from "../../database/models";
import { CidadeProvider } from "../../database/providers/cidades";

/** 
 * Interface para os parâmetros de rota usados na função updateById
 */
interface IParamProps {
    id?: number;
}

/** 
 * Interface para o corpo da solicitação usado na função updateById
 * extends o ICidade mas omitindo o campo "id"
 */
interface IBodyProps extends Omit<ICidade, "id"> {}


/**
 * Retorna uma função de middleware que valida os parâmetros de rota e corpo de uma solicitação PUT usando Yup.
 * @returns Função de middleware Express para validar os parâmetros de rota e corpo da solicitação
 */
export const updateByIdValidation = validation(getSchema => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3),
    })),
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

/**
 * Função que atualiza um item com base nos parâmetros de rota e corpo da solicitação
 * @param req - Objeto de solicitação Express
 * @param res - Objeto de resposta Express
 * @returns Promessa que resolve em uma resposta vazia ou um erro
 */
export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response): Promise<Response> => {

    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: "O parâmetro 'id' precisa ser informado."
            }
        });
    }

    const result = await CidadeProvider.update(req.params.id, req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).send();
};