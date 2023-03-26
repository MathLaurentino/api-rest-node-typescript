import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";


interface IParamProps {
    id?: number;
}

export const getByIdValidation = validation(getSchema => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

/**
 * Controlador Express para criar uma nova cidade.
 * Valida o corpo da requisição usando o esquema Yup e retorna um objeto de erros se a validação falhar.
 * Se a validação for bem-sucedida, imprime os dados validados e envia uma resposta.
 */
export const getById = async (req: Request<IParamProps>, res: Response) => { // RequestHandler
    
    return res.status(StatusCodes.OK).json({
        id: req.params.id,
        nome: "Florania",
    });
};