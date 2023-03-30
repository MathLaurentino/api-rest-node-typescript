/**
 * Este módulo exporta funções para criar e remover a tabela "pessoa" no banco de dados.
 * @packageDocumentation
 */

import { Knex } from "knex";
import { ETableNames } from "../ETableNames";



export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.pessoa, table => {
            table.bigIncrements("id").primary().index();
            table.string("nomeCompleto").index().notNullable();
            table.string("email").unique().notNullable();

            table.bigInteger("cidadeId")
                .index()
                .notNullable()
                .references("id")
                .inTable(ETableNames.cidade) // faz referencia a tabela cidade campo "id"
                .onUpdate("CASCADE") // caso o id da cidade seja mudado, muda aqui também
                .onDelete("RESTRICT"); // não deixa que o registro cidade seja apagado

            table.comment("Tabela usada para armazenar pessoas do sistema.");
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.pessoa}`);
        });
}


export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.pessoa)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.pessoa}`); 
        });
}
