/**
 * Este módulo exporta o controlador da entidade Cidade, que agrupa os métodos de
 * criação, recuperação, atualização e exclusão de itens.
 * @packageDocumentation
 */

import * as create from "./Create";
import * as getAll from "./GetAll";
import * as getById from "./GetById";
import * as updateById from "./UpdateById";
import * as deleteById from "./DeleteById";

/**
 * Objeto que contém os métodos relacionados à criação, recuperação, 
 *      atualização e exclusão de itens da entidade Cidade
 */
export const CidadeController = {
    ...create,
    ...getAll,
    ...getById,
    ...updateById,
    ...deleteById,
};