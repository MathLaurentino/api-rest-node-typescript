import { Router } from "express";
// import { StatusCodes } from "http-status-codes";

import { CidadeController } from "./../controllers";

const router = Router();

router.get("/", (req, res) => { 
    return res.send("casa!");
});

router.post("/cidades",
    CidadeController.createValidation, 
    CidadeController.create);

export { router };

// console.log(req.params);
// console.log(req.query);
// console.log(req.cookies);
// console.log(req.body);