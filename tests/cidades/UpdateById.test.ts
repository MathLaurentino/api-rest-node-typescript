import {testServer} from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cidades - UpdateById", () => {


    it("Atualizar Registro", async ()=> {

        const res1 = await testServer
            .post("/cidades")
            .send({
                nome: "Florania"
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");

        const resUpdateById = await testServer
            .put("/cidades/" + res1.body)
            .send({
                nome: "Natal",
            });

        expect(resUpdateById.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

});