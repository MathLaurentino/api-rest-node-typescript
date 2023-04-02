import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";
import { PessoaProvider } from "../../database/providers/pessoas";


/**
 * Propriedades da requisição do endpoint de getAll.
 * Contém as propriedades dos parâmetros da requisição
 */
interface IQueryProps {
    page?: number;
    limit?: number;
    filter?: string;
}


/**
 * Middleware de validação para a rota de getAll.
 * Valida a propriedade page, limit e filter dos parâmetros da requisição.
 */
export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        filter: yup.string().optional(),
    })), 
}));


/**
 * Endpoint que busca uma pessoa pelo id
 */
export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response): Promise<Response> => {

    // busca a lista de pessoas com paginação e filtro
    const result = await PessoaProvider.getAll(req.query.page || 1, req.query.limit || 7, req.query.filter || "");

    // busca o total de pessoas com o filtro
    const count = await PessoaProvider.count(req.query.filter);

    // caso ocorra um erro na busca da lista de pessoas
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: result.message }
        });
    } 
    // caso ocorra um erro na busca do total de pessoas
    else if (count instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: count.message }
        });
    }

    // define o header com o total de pessoas encontrado com o filtro
    res.setHeader("access-control-expose-headers", "x-total-count");
    res.setHeader("x-total-count", count);

    // retorna a lista de pessoas com paginação e filtro
    return res.status(StatusCodes.OK).json(result);
};
