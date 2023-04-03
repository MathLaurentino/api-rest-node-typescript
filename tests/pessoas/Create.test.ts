import {testServer} from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Pessoas - Create", () => {

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


    it("Criar sem usar token de autenticação", async () => {
        const res1 = await testServer
            .post("/pessoas")
            .send({
                nomeCompleto: "testeJest",
                email: "testeJest@gmail.com",
                cidadeId
            });
    
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty("errors.default");
    });
      

    it("Criar registro", async ()=> {

        const res1 = await testServer
            .post("/pessoas")
            .set({ Authorization: `Bearer ${accessToken}` })
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
            .set({ Authorization: `Bearer ${accessToken}` })
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
            .set({ Authorization: `Bearer ${accessToken}` })
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
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                nomeCompleto: "testeJest",
                email: "testeJest@gmail.com",
                cidadeId: 99999
            });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty("errors.default");
        
    });

});