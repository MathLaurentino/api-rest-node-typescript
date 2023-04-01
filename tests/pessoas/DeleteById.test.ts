import {testServer} from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Pessoa - DeleteById", () => {

    let cidadeId: number | undefined = undefined;

    beforeAll(async () => {
        const resCidade = await testServer
            .post("/cidades")
            .send({ nome: "Teste" });

        cidadeId = resCidade.body;
    });


    it("Apagar registro", async ()=> {

        const res1 = await testServer
            .post("/pessoas")
            .send({
                nomeCompleto: "testeJest",
                email: "testeJest@gmail.com",
                cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");

        const resDeleted = await testServer
            .delete("/pessoas/" + res1.body)
            .send();

        expect(resDeleted.statusCode).toEqual(StatusCodes.NO_CONTENT);

    });


    it("Passa um Id igual a zero", async ()=> {

        const res1 = await testServer
            .delete("/pessoas/0")
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.params.id");

    });


    it("Passa um Id tipo string", async ()=> {

        const res1 = await testServer
            .delete("/pessoas/r")
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.params.id");

    });

    
    it("Id pessoa nao existe ", async ()=> {

        const res1 = await testServer
            .delete("/pessoas/99999")
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty("errors.default");

    });

    

});