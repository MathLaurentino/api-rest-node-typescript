import {testServer} from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Pessoas - Create", () => {

    let cidadeId: number | undefined = undefined;

    beforeAll(async () => {
        const resCidade = await testServer
            .post("/cidades")
            .send({ nome: "Teste" });

        cidadeId = resCidade.body;
    });

    it("Criar registro", async ()=> {

        const res1 = await testServer
            .post("/pessoas")
            .send({
                nomeCompleto: "testeJest",
                email: "testeJest@gmail.com",
                cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");
        
    });


    it("Nome-Completo muito curto", async ()=> {

        const res1 = await testServer
            .post("/pessoas")
            .send({
                nomeCompleto: "te",
                email: "testeJest@gmail.com",
                cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.nomeCompleto");
        
    });

    it("Id igual a zero", async ()=> {

        const res1 = await testServer
            .post("/pessoas")
            .send({
                nomeCompleto: "testeJest",
                email: "testeJest@gmail.com",
                cidadeId: 0
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.cidadeId");
        
    });


    it("Id cidade nao existe", async ()=> {

        const res1 = await testServer
            .post("/pessoas")
            .send({
                nomeCompleto: "testeJest",
                email: "testeJest@gmail.com",
                cidadeId: 99999
            });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty("errors.default");
        
    });

});