/**
 * Este módulo exporta o provider da entidade Cidade, que agrupa os métodos de
 * criação, recuperação, atualização e exclusão de itens.
 * @packageDocumentation
 */

import * as create from "./Create";
import * as getAll from "./GetAll";
import * as getById from "./GetById";
import * as updateById from "./UpdateById";
import * as deleteById from "./DeleteById";
import * as count from "./Count";

/**
 * Objeto que contém os métodos relacionados à criação, recuperação, 
 *      atualização e exclusão de itens da entidade Cidade
 */
export const CidadeProvider = {
    ...create,
    ...getAll,
    ...getById,
    ...updateById,
    ...deleteById,
    ...count,
};