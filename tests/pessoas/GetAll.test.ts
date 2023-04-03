import {testServer} from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("pessoas - GetAll", () => {

    let accessToken = "";
    beforeAll(async () => {

        const email = "create-pessoas@gmail.com";
        await testServer.post("/cadastrar").send({ email, senha: "123456", nome: "Teste" });
        const signInRes = await testServer.post("/entrar").send({ email, senha: "123456" });

        accessToken = signInRes.body.accessToken;

    });

    
    let cidadeId: number | undefined = undefined;
    beforeAll(async () => {

        const resCidade = await testServer
            .post("/cidades")
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: "Teste" });

        cidadeId = resCidade.body;

    });


    beforeAll(async () => {

        const res1 = await testServer
            .post("/pessoas")
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                nomeCompleto: "testeJest",
                email: "testeJest@gmail.com",
                cidadeId
            });

    });


    it("tentou pegar dados sem usar token de autenticação", async () => {

        const res1 = await testServer
            .get("/pessoas")
            .send();
    
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty("errors.default");
        
    });


    it("Pegar todos os registros", async ()=> {

        const resGetAll = await testServer
            .get("/pessoas")
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(Number(resGetAll.header["x-total-count"])).toBeGreaterThan(0);
        expect(resGetAll.statusCode).toEqual(StatusCodes.OK);
        expect(resGetAll.body.length).toBeGreaterThan(0);

    });

});