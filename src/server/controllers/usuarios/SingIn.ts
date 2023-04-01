import { Request, Response } from "express";
import { IUsuario } from "../../database/models";
import { validation } from "../../shared/middleware";
import * as yup from "yup";
import { UsuarioProvider } from "../../database/providers/usuarios";
import { StatusCodes } from "http-status-codes";

interface IBodyProps extends Omit<IUsuario, "id" | "nome"> {}

export const signInValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().required().email().min(5),
        senha: yup.string().required().min(6),
    })),
}));


export const signIn = async (req: Request<{},{}, IBodyProps>, res: Response): Promise<Response> => {

    const {email, senha} = req.body;

    const result = await UsuarioProvider.getByEmail(email);

    if (result instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: "email ou senha inválidos"
            }
        });
    }

    if (senha !== result.senha) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: "email ou senha inválidos"
            }
        });
    } else {
        return res.status(StatusCodes.OK).json({accessToken: "teste.teste.teste"});
    }

};