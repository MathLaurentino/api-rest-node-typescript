/**
 * Este módulo exporta o controlador da entidade usuario, que agrupa os métodos de
 * singUp e singIn
 * @packageDocumentation
 */

import * as singUp from "./SignUp";
import * as signIn from "./SignIn";


/**
 * Objeto que contém os métodos relacionados à cingUp e singIn 
 * de itens da entidade Usuario
 */
export const UsuariosController = {
    ...singUp,
    ...signIn,
};