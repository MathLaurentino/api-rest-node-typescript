/**
 * Este módulo exporta funções para criar e remover a tabela "cidade" no banco de dados.
 * @packageDocumentation
 */

import { Knex } from "knex";
import { ETableNames } from "../ETableNames";


/**
 * Cria a tabela "cidade" no banco de dados.
 * @param knex - Instância do Knex para manipulação do banco de dados
 * @returns Promessa que resolve em um console.log indicando que a tabela foi criada ou um erro
 */
export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.cidade, table => {
            table.bigIncrements("id").primary().index();
            table.string("nome", 150).checkLength("<=", 150).index().notNullable();

            table.comment("Tabela usada para armazenar cidades do sistema.");
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.cidade}`);
        });
}


/**
 * Remove a tabela "cidade" do banco de dados.
 * @param knex - Instância do Knex para manipulação do banco de dados
 * @returns Promessa que resolve em um console.log indicando que a tabela foi removida ou um erro
 */
export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.cidade)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.cidade}`); 
        });
}
