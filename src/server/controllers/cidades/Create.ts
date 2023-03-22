import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";


interface ICidade {
    nome: string;
    estado: string;
}

interface IFilter {
    filter?: string;
    limit?: number;
}

export const createValidation = validation({
    body: yup.object().shape({
        nome: yup.string().required().min(3),
        estado: yup.string().required().min(3),
    }),
    query: yup.object().shape({
        filter: yup.string().required().min(3),
    }),
});

/**
 * Controlador Express para criar uma nova cidade.
 * Valida o corpo da requisição usando o esquema Yup e retorna um objeto de erros se a validação falhar.
 * Se a validação for bem-sucedida, imprime os dados validados e envia uma resposta.
 */
export const create = async (req: Request<{}, {}, ICidade>, res: Response) => { // RequestHandler
    console.log(req.body);
    return res.send("Create!");
};