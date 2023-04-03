import {testServer} from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cidades - GetById", () => {


    let accessToken = "";

    beforeAll(async () => {

        const email = "create-cidades@gmail.com";
        await testServer.post("/cadastrar").send({ nome: "Teste", email, senha: "123456" });
        const signInRes = await testServer.post("/entrar").send({ email, senha: "123456" });

        accessToken = signInRes.body.accessToken;
        
    });

    let cidadeId: number;

    beforeAll(async () => {

        const res1 = await testServer
            .post("/cidades")
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: "Florania" });

        cidadeId = res1.body;
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");

    });


    it("Tenta pegar um registro sem token de acesso", async () => {

        const res1 = await testServer
            .get("/cidades/"  + cidadeId)
            .send();
    
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty("errors.default");

    });


    it("Buscar registro por Id", async ()=> {

        const resGetById = await testServer
            .get("/cidades/" + cidadeId)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(resGetById.statusCode).toEqual(StatusCodes.OK);
        expect(resGetById.body).toHaveProperty("nome");

    });


    it("Buscou um registro que nao existe", async () => {
        const res1 = await testServer
            .get("/cidades/9999")
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();
        
        expect(res1.body).toHaveProperty("errors.default");
    });

});