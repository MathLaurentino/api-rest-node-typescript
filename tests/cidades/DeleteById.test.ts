import {testServer} from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cidades - DeleteById", () => {


    it("Apagar registro", async ()=> {

        const res1 = await testServer
            .post("/cidades")
            .send({
                nome: "Florania"
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");

        const resDeleted = await testServer
            .delete("/cidades/" + res1.body)
            .send();

        expect(resDeleted.statusCode).toEqual(StatusCodes.NO_CONTENT);

    });


    it("Passa um Id igual a zero", async ()=> {

        const res1 = await testServer
            .delete("/cidades/0")
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.params.id");

    });


    it("Passa um Id tipo string", async ()=> {

        const res1 = await testServer
            .delete("/cidades/r")
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.params.id");

    });

});