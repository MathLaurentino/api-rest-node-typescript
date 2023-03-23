import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";


interface IParamProps {
    id?: number;
}

interface IBodyProps {
    nome: string;
}

export const updateByIdValidation = validation(getSchema => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3),
    })),
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

/**
 * Controlador Express para criar uma nova cidade.
 * Valida o corpo da requisição usando o esquema Yup e retorna um objeto de erros se a validação falhar.
 * Se a validação for bem-sucedida, imprime os dados validados e envia uma resposta.
 */
export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => { // RequestHandler
    console.log(req.params.id);
    console.log(req.body.nome);
    
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Ainda não implementado!");
};