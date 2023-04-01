/**
 * Este módulo exporta funções para criar e remover a tabela "usuario" no banco de dados.
 * @packageDocumentation
 */

import { Knex } from "knex";
import { ETableNames } from "../ETableNames";


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.usuario, table => {
            table.bigIncrements("id").primary().index();
            table.string("nome").notNullable().checkLength(">", 3);
            table.string("email").index().notNullable().checkLength(">", 6);
            table.string("senha").unique().notNullable().checkLength(">", 5);

            table.comment("Tabela usada para armazenar usuarios do sistema.");
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.usuario}`);
        });
}


export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.usuario)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.usuario}`); 
        });
}
