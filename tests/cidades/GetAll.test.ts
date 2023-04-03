import {testServer} from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cidades - GetAll", () => {

    let accessToken = "";

    beforeAll(async () => {

        const email = "create-cidades@gmail.com";
        await testServer.post("/cadastrar").send({ nome: "Teste", email, senha: "123456" });
        const signInRes = await testServer.post("/entrar").send({ email, senha: "123456" });

        accessToken = signInRes.body.accessToken;
        
    });

    // let cidadeId: number;

    beforeAll(async () => {

        const res1 = await testServer
            .post("/cidades")
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: "Florania" });

        // cidadeId = res1.body;
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");

    });


    it("Tenta pegar registros sem token de acesso", async () => {

        const res1 = await testServer
            .get("/cidades")
            .send();
    
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty("errors.default");

    });


    it("Pegar todos os registros", async ()=> {

        // const res1 = await testServer
        //     .post("/cidades")
        //     .set({ Authorization: `Bearer ${accessToken}` })
        //     .send({
        //         nome: "Florania"
        //     });

        // expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        // expect(typeof res1.body).toEqual("number");

        const resGetAll = await testServer
            .get("/cidades")
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(Number(resGetAll.header["x-total-count"])).toBeGreaterThan(0);
        expect(resGetAll.statusCode).toEqual(StatusCodes.OK);
        expect(resGetAll.body.length).toBeGreaterThan(0);

    });

});