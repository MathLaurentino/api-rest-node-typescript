import {testServer} from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Pessoas - GetById", () => {

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


    let pessoaId: string | undefined = undefined;
    beforeAll(async () => {

        const res1 = await testServer
            .post("/pessoas")
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                nomeCompleto: "testeJest",
                email: "testeJest@gmail.com",
                cidadeId
            });
        pessoaId = res1.body;

    });


    it("tentou pegar dados por id sem usar token de autenticação", async () => {

        const res1 = await testServer
            .get("/pessoas/" + pessoaId)
            .send();
    
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty("errors.default");
        
    });


    it("Buscar registro por Id", async ()=> {

        const resGetById = await testServer
            .get("/pessoas/" + pessoaId)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(resGetById.statusCode).toEqual(StatusCodes.OK);
        expect(resGetById.body).toHaveProperty("nomeCompleto");

    });


    it("Buscou um registro que nao existe", async () => {
        const res1 = await testServer
            .get("/pessoas/99999")
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();
        
        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty("errors.default");
    });


    it("Passa um Id tipo string", async ()=> {

        const res1 = await testServer
            .get("/pessoas/r")
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.params.id");

    });


    it("Passa um Id igual a zero", async ()=> {

        const res1 = await testServer
            .get("/pessoas/0")
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.params.id");

    });

});