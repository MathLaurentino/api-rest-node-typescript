import {testServer} from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cidades - UpdateById", () => {

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


    it("Atualizar Registro", async ()=> {

        const resUpdateById = await testServer
            .put("/pessoas/" + pessoaId)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                nomeCompleto: "testeJest2",
                email: "testeJest2@gmail.com",
                cidadeId
            });

        expect(resUpdateById.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });


    it("Passa idCidade igual a zero", async ()=> {

        const resUpdateById = await testServer
            .put("/pessoas/" + pessoaId)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                nomeCompleto: "testeJest2",
                email: "testeJest2@gmail.com",
                cidadeId: 0
            });

        expect(resUpdateById.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resUpdateById.body).toHaveProperty("errors.body.cidadeId");
    });


    it("Nome-Completo muito curto", async ()=> {

        const resUpdateById = await testServer
            .put("/pessoas/" + pessoaId)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                nomeCompleto: "te",
                email: "testeJest@gmail.com",
                cidadeId
            });

        expect(resUpdateById.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resUpdateById.body).toHaveProperty("errors.body.nomeCompleto");
    });


    it("Id cidade nao existe", async ()=> {

        const resUpdateById = await testServer
            .put("/pessoas/" + pessoaId)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                nomeCompleto: "testeJest",
                email: "testeJest@gmail.com",
                cidadeId: 99999
            });

        expect(resUpdateById.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(resUpdateById.body).toHaveProperty("errors.default");
    });

});