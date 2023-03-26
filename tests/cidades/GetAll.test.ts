import {testServer} from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cidades - GetAll", () => {


    it("Pegar todos os registros", async ()=> {

        const res1 = await testServer
            .post("/cidades")
            .send({
                nome: "Florania"
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");

        const resGetAll = await testServer
            .get("/cidades")
            .send();

        expect(Number(resGetAll.header["x-total-count"])).toBeGreaterThan(0);
        expect(resGetAll.statusCode).toEqual(StatusCodes.OK);
        expect(resGetAll.body.length).toBeGreaterThan(0);

    });

});