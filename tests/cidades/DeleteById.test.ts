import {testServer} from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cidades - DeletById", () => {


    it("Apagar registro", async ()=> {

        const res1 = await testServer
            .delete("/cidades/1")
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.NO_CONTENT);

    });

    it("Passa um Id igual a", async ()=> {

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