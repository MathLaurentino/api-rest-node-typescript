import {testServer} from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Usuario - SignUp", () => {

    it("singUp", async ()=> {

        const res1 = await testServer
            .post("/cadastrar")
            .send({ 
                nome: "JestTest",
                email: "JestTest@gmail.com",
                senha: "123456" 
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");
        
    });

    it("singUp repetido", async ()=> {

        const res1 = await testServer
            .post("/cadastrar")
            .send({ 
                nome: "JestTest",
                email: "JestTest@gmail.com",
                senha: "123456" 
            });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty("errors.default");

    });

    it("nome pequeno", async ()=> {

        const res1 = await testServer
            .post("/cadastrar")
            .send({ 
                nome: "Je",
                email: "JestTest@gmail.com",
                senha: "123456" 
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.nome");

    });

    it("email pequeno", async ()=> {

        const res1 = await testServer
            .post("/cadastrar")
            .send({ 
                nome: "JestTest",
                email: "J@g",
                senha: "123456" 
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.email");

    });

    it("senha pequena", async ()=> {

        const res1 = await testServer
            .post("/cadastrar")
            .send({ 
                nome: "JestTest",
                email: "JestTest@gmail.com",
                senha: "12345" 
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.senha");

    });

    it("sem nome", async ()=> {

        const res1 = await testServer
            .post("/cadastrar")
            .send({ 
                // nome: "JestTest",
                email: "JestTest@gmail.com",
                senha: "12345" 
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.nome");

    });

    it("sem email", async ()=> {

        const res1 = await testServer
            .post("/cadastrar")
            .send({ 
                nome: "JestTest",
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
                nome: "JestTest",
                email: "JestTest@gmail.com",
                // senha: "12345" 
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.senha");

    });

});