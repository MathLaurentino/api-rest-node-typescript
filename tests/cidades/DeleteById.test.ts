import {testServer} from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cidades - DeleteById", () => {

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
            .send({
                nome: "Florania"
            });

        cidadeId = res1.body;
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");

    });


    it("Tenta apagar um registro sem token de acesso", async () => {

        const res1 = await testServer
            .delete("/cidades/" + cidadeId)
            .send({ nome: "Caxias do Sul" });
    
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty("errors.default");

    });


    it("Apagar registro", async ()=> {

        const resDeleted = await testServer
            .delete("/cidades/" + cidadeId)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(resDeleted.statusCode).toEqual(StatusCodes.NO_CONTENT);

    });


    it("Passa um Id igual a zero", async ()=> {

        const res1 = await testServer
            .delete("/cidades/0")
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.params.id");

    });


    it("Passa um Id tipo string", async ()=> {

        const res1 = await testServer
            .delete("/cidades/r")
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.params.id");

    });

});