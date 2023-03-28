import { Router } from "express";
import { CidadeController } from "./../controllers";

const router = Router();

router.get("/", (req, res) => { 
    return res.send("Ligado!");
});


router.get("/cidades", CidadeController.getAllValidation, CidadeController.getAll);
router.post("/cidades", CidadeController.createValidation, CidadeController.create);
router.get("/cidades/:id", CidadeController.getByIdValidation, CidadeController.getById);
router.put("/cidades/:id", CidadeController.updateByIdValidation, CidadeController.updateById);
router.delete("/cidades/:id", CidadeController.deleteByIdValidation, CidadeController.deleteById);

export { router };

// console.log(req.params);
// console.log(req.query);
// console.log(req.cookies);
// console.log(req.body);