import {testServer} from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cidades - Create", () => {

    it("Criar registro", async ()=> {

        const res1 = await testServer
            .post("/cidades")
            .send({
                nome: "Florania"
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");
        
    });


    it("Tenta criar um registro com nome muito curto", async ()=> {

        const res1 = await testServer
            .post("/cidades")
            .send({
                nome: "Fl"
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.nome");
        
    });

});