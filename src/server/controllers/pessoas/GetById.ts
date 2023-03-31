import { validation } from "../../shared/middleware";
import * as yup from "yup";
import { Request, Response } from "express";
import { PessoaProvider } from "../../database/providers/pessoas";
import { StatusCodes } from "http-status-codes";


interface IParamProps {
    id?: number;
}

export const getByIdValidation = validation(getSchema => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));


export const getById = async (req: Request<IParamProps>, res: Response): Promise<Response> => {

    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json();
    }

    const result = await PessoaProvider.getById(req.params.id);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            }
        });
    }

    return res.status(StatusCodes.OK).json(result);
};