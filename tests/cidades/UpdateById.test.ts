import {testServer} from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cidades - UpdateById", () => {


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


    it("Tenta atualizar um registro sem token de acesso", async () => {

        const res1 = await testServer
            .put("/cidades/" + cidadeId)
            .send({ nome: "Natal", });
    
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty("errors.default");

    });


    it("Atualizar Registro", async ()=> {

        const resUpdateById = await testServer
            .put("/cidades/" + cidadeId)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: "Natal", });

        expect(resUpdateById.statusCode).toEqual(StatusCodes.NO_CONTENT);

    });
});