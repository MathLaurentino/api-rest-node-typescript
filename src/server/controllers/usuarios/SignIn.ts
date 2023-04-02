import { Request, Response } from "express";
import { IUsuario } from "../../database/models";
import { validation } from "../../shared/middleware";
import * as yup from "yup";
import { UsuarioProvider } from "../../database/providers/usuarios";
import { StatusCodes } from "http-status-codes";
import { PasswordCrypto } from "../../shared/services";


/**
 * Propriedades da requisição do endpoint de signIn.
 * Contém as propriedades do corpo da requisição, exceto o id e o nome do usuário.
 */
interface IBodyProps extends Omit<IUsuario, "id" | "nome"> {}


/**
 * Middleware de validação para a rota de signIn.
 * Valida as propriedades de email e senha do corpo da requisição.
 */
export const signInValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().required().email().min(5),
        senha: yup.string().required().min(6),
    })),
}));


/**
 * Endpoint que realiza a autenticação de um usuário com email e senha.
 */
export const signIn = async (req: Request<{},{}, IBodyProps>, res: Response): Promise<Response> => {

    const {email, senha} = req.body;

    // busca o usuário pelo email
    const result = await UsuarioProvider.getByEmail(email);

    // caso não exista usuário com o email fornecido
    if (result instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: "email ou senha inválidos"
            }
        });
    }

    // verifica a correspondência da senha
    const passwordMatch = await PasswordCrypto.verifyPassword(senha, result.senha);

    // caso a senha não corresponda
    if (!passwordMatch) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: "email ou senha inválidos"
            }
        });
    } 

    // caso a autenticação seja bem sucedida, retorna um token de acesso
    return res.status(StatusCodes.OK).json({accessToken: "teste.teste.teste"});
};