import { Router } from "express";
import { CidadeController, PessoaController } from "./../controllers";

const router = Router();

router.get("/", (req, res) => { 
    return res.send("Ligado!");
});


router.get("/cidades", CidadeController.getAllValidation, CidadeController.getAll);
router.post("/cidades", CidadeController.createValidation, CidadeController.create);
router.get("/cidades/:id", CidadeController.getByIdValidation, CidadeController.getById);
router.put("/cidades/:id", CidadeController.updateByIdValidation, CidadeController.updateById);
router.delete("/cidades/:id", CidadeController.deleteByIdValidation, CidadeController.deleteById);

router.get("/pessoas", PessoaController.getAllValidation, PessoaController.getAll);
router.post("/pessoas", PessoaController.createValidation, PessoaController.create);
router.get("/pessoas/:id", PessoaController.getByIdValidation, PessoaController.getById);
router.put("/pessoas/:id", PessoaController.updateByIdValidation, PessoaController.updateById);
router.delete("/pessoas/:id", PessoaController.deleteByIdValidation, PessoaController.deleteById);

export { router };

// console.log(req.params);
// console.log(req.query);
// console.log(req.cookies);
// console.log(req.body);