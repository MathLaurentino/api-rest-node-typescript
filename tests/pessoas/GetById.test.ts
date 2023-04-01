import {testServer} from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Pessoas - GetById", () => {

    let cidadeId: number | undefined = undefined;

    beforeAll(async () => {
        const resCidade = await testServer
            .post("/cidades")
            .send({ nome: "Teste" });

        cidadeId = resCidade.body;
    });


    it("Buscar registro por Id", async ()=> {

        const res1 = await testServer
            .post("/pessoas")
            .send({
                nomeCompleto: "testeJest",
                email: "testeJest@gmail.com",
                cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");

        const resGetById = await testServer
            .get("/pessoas/" + res1.body)
            .send();

        expect(resGetById.statusCode).toEqual(StatusCodes.OK);
        expect(resGetById.body).toHaveProperty("nomeCompleto");

    });


    it("Buscou um registro que nao existe", async () => {
        const res1 = await testServer
            .get("/pessoas/99999")
            .send();
        
        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty("errors.default");
    });


    it("Passa um Id tipo string", async ()=> {

        const res1 = await testServer
            .get("/pessoas/r")
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.params.id");

    });


    it("Passa um Id igual a zero", async ()=> {

        const res1 = await testServer
            .get("/pessoas/0")
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.params.id");

    });

});