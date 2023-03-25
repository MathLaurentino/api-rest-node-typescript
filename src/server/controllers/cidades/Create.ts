import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";


interface ICidade {
    nome: string;
}

export const createValidation = validation( (getSchema) => ({
    body: getSchema<ICidade>(yup.object().shape({
        nome: yup.string().required().min(3),
    })),
})); 

/**
 * Controlador Express para criar uma nova cidade.
 * Valida o corpo da requisição usando o esquema Yup e retorna um objeto de erros se a validação falhar.
 * Se a validação for bem-sucedida, imprime os dados validados e envia uma resposta.
 */
export const create = async (req: Request<{}, {}, ICidade>, res: Response) => { // RequestHandler
    console.log(req.body);
    
    return res.status(StatusCodes.CREATED).json(1); // devolve o id criado
};