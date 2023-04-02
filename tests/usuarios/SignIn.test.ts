import {testServer} from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Usuario - SignIp", () => {

    beforeAll(async () => {
        const resSingUp = await testServer
            .post("/cadastrar")
            .send({ 
                nome: "JestTestSingIn",
                email: "JestTestSingIn@gmail.com",
                senha: "123456" 
            });
        expect(resSingUp.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof resSingUp.body).toEqual("number");
    });

    it("singUp valido", async ()=> {

        const res1 = await testServer
            .post("/entrar")
            .send({ 
                email: "JestTestSingIn@gmail.com",
                senha: "123456" 
            });

        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(typeof res1.body).toEqual("object");
        
    });

    it("email invalido", async ()=> {

        const res1 = await testServer
            .post("/entrar")
            .send({ 
                email: "InvalidoSingIn@gmail.com",
                senha: "123456" 
            });

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty("errors.default");

    });

    it("senha invalido", async ()=> {

        const res1 = await testServer
            .post("/entrar")
            .send({ 
                email: "JestTestSingIn@gmail.com",
                senha: "Invalido" 
            });

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty("errors.default");

    });

    it("formato de email invalido", async ()=> {

        const res1 = await testServer
            .post("/entrar")
            .send({ 
                email: "JestTestSingIn gmail.com",
                senha: "123456" 
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.email");

    });

    it("senha pequena", async ()=> {

        const res1 = await testServer
            .post("/entrar")
            .send({ 
                email: "JestTestSingIn@gmail.com",
                senha: "12345" 
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.senha");

    });

    it("sem email", async ()=> {

        const res1 = await testServer
            .post("/cadastrar")
            .send({ 
                // email: "JestTest@gmail.com",
                senha: "12345" 
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.email");

    });

    it("sem senha", async ()=> {

        const res1 = await testServer
            .post("/cadastrar")
            .send({ 
                email: "JestTest@gmail.com",
                // senha: "12345" 
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.senha");

    });

});