/**
 * Este módulo exporta funções relacionadas à recuperação de todos os itens e seu middleware de validação
 * @packageDocumentation
 */

import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";

/** 
 * Interface para os parâmetros da consulta da solicitação usados na função getAll
 */
interface IQueryProps {
    page?: number;
    limit?: number;
    filter?: string;
}

/**
 * Retorna uma função de middleware que valida os parâmetros da consulta de uma solicitação GET usando Yup.
 * @returns Função de middleware Express para validar os parâmetros da consulta da solicitação
 */
export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        filter: yup.string().optional(),
    })), 
}));

/**
 * Função que recupera todos os itens com base nos parâmetros da consulta da solicitação
 * @param req - Objeto de solicitação Express
 * @param res - Objeto de resposta Express
 * @returns Promessa que resolve em uma matriz de itens ou um erro
 */
export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response): Promise<Response> => {
    res.setHeader("access-control-expose-headers", "x-total-count");
    res.setHeader("x-total-count", "1");

    return res.status(StatusCodes.OK).json([
        {
            id: 1,
            nome: "Florania",
        }
    ]);
};
