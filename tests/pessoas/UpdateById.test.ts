import {testServer} from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cidades - UpdateById", () => {

    let cidadeId: number | undefined = undefined;

    beforeAll(async () => {
        const resCidade = await testServer
            .post("/cidades")
            .send({ nome: "Teste" });

        cidadeId = resCidade.body;
    });


    it("Atualizar Registro", async ()=> {

        const res1 = await testServer
            .post("/pessoas")
            .send({
                nomeCompleto: "testeJest",
                email: "testeJest@gmail.com",
                cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");

        const resUpdateById = await testServer
            .put("/pessoas/" + res1.body)
            .send({
                nomeCompleto: "testeJest2",
                email: "testeJest2@gmail.com",
                cidadeId
            });

        expect(resUpdateById.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });


    it("Passa idCidade igual a zero", async ()=> {

        const res1 = await testServer
            .post("/pessoas")
            .send({
                nomeCompleto: "testeJest",
                email: "testeJest@gmail.com",
                cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");

        const resUpdateById = await testServer
            .put("/pessoas/" + res1.body)
            .send({
                nomeCompleto: "testeJest2",
                email: "testeJest2@gmail.com",
                cidadeId: 0
            });

        expect(resUpdateById.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resUpdateById.body).toHaveProperty("errors.body.cidadeId");
    });


    it("Nome-Completo muito curto", async ()=> {

        const res1 = await testServer
            .post("/pessoas")
            .send({
                nomeCompleto: "testeJest3",
                email: "testeJest3@gmail.com",
                cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");

        const resUpdateById = await testServer
            .put("/pessoas/" + res1.body)
            .send({
                nomeCompleto: "te",
                email: "testeJest@gmail.com",
                cidadeId
            });

        expect(resUpdateById.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resUpdateById.body).toHaveProperty("errors.body.nomeCompleto");
    });


    it("Id cidade nao existe", async ()=> {

        const res1 = await testServer
            .post("/pessoas")
            .send({
                nomeCompleto: "testeJest4",
                email: "testeJest4@gmail.com",
                cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");

        const resUpdateById = await testServer
            .put("/pessoas/" + res1.body)
            .send({
                nomeCompleto: "testeJest",
                email: "testeJest@gmail.com",
                cidadeId: 99999
            });

        expect(resUpdateById.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(resUpdateById.body).toHaveProperty("errors.default");
    });

});