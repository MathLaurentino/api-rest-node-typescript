import {testServer} from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cidades - GetById", () => {


    it("Buscar registro por Id", async ()=> {

        const res1 = await testServer
            .post("/cidades")
            .send({
                nome: "Florania"
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");

        const resGetById = await testServer
            .get("/cidades/" + res1.body)
            .send();

        expect(resGetById.statusCode).toEqual(StatusCodes.OK);
        expect(resGetById.body).toHaveProperty("nome");

    });

    it("Buscou um registro que nao existe", async () => {
        const res1 = await testServer
            .get("/cidades/9999")
            .send();
        
        expect(res1.body).toHaveProperty("errors.default");
    });

});