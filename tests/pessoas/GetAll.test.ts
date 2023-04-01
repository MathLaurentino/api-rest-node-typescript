import {testServer} from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("pessoas - GetAll", () => {

    let cidadeId: number | undefined = undefined;

    beforeAll(async () => {
        const resCidade = await testServer
            .post("/cidades")
            .send({ nome: "Teste" });

        cidadeId = resCidade.body;
    });

    it("Pegar todos os registros", async ()=> {

        const res1 = await testServer
            .post("/pessoas")
            .send({
                nomeCompleto: "testeJest",
                email: "testeJest@gmail.com",
                cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");

        const resGetAll = await testServer
            .get("/pessoas")
            .send();

        expect(Number(resGetAll.header["x-total-count"])).toBeGreaterThan(0);
        expect(resGetAll.statusCode).toEqual(StatusCodes.OK);
        expect(resGetAll.body.length).toBeGreaterThan(0);

    });

});