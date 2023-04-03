import { Router } from "express";
import { CidadeController, PessoaController, UsuariosController } from "./../controllers";
import { ensureAuthenticated } from "../shared/middleware";

const router = Router();

router.get("/", (req, res) => { 
    return res.send("Ligado!");
});


router.get("/cidades", ensureAuthenticated, CidadeController.getAllValidation, CidadeController.getAll);
router.post("/cidades", ensureAuthenticated, CidadeController.createValidation, CidadeController.create);
router.get("/cidades/:id", ensureAuthenticated, CidadeController.getByIdValidation, CidadeController.getById);
router.put("/cidades/:id", ensureAuthenticated, CidadeController.updateByIdValidation, CidadeController.updateById);
router.delete("/cidades/:id", ensureAuthenticated, CidadeController.deleteByIdValidation, CidadeController.deleteById);

router.get("/pessoas", ensureAuthenticated, PessoaController.getAllValidation, PessoaController.getAll);
router.post("/pessoas", ensureAuthenticated, PessoaController.createValidation, PessoaController.create);
router.get("/pessoas/:id", ensureAuthenticated, PessoaController.getByIdValidation, PessoaController.getById);
router.put("/pessoas/:id", ensureAuthenticated, PessoaController.updateByIdValidation, PessoaController.updateById);
router.delete("/pessoas/:id", ensureAuthenticated, PessoaController.deleteByIdValidation, PessoaController.deleteById);

router.post("/entrar", UsuariosController.signInValidation, UsuariosController.signIn);
router.post("/cadastrar", UsuariosController.signUpValidation, UsuariosController.signUp);

export { router };

// console.log(req.params);
// console.log(req.query);
// console.log(req.cookies);
// console.log(req.body);