import supertest from "supertest";
import { Knex } from "../src/server/database/knex";
import { server } from "../src/server/Server";

/**
 * roda a migration e a seed antes de inicializar os testes 
 */
beforeAll(async () => {
    await Knex.migrate.latest();
    await Knex.seed.run();
});

afterAll(async () => {
    await Knex.destroy();
});

export const testServer = supertest(server);