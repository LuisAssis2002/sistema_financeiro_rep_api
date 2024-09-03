import { Router } from "express";

import Pessoa from "./controllers/Pessoa";
import Quarto from "./controllers/Quarto";
import Compras from "./controllers/Compras";
import Conta from "./controllers/Conta";
import Mensalidade from "./controllers/Mensalidade";
import Pagamento from "./controllers/Pagamento";
import Calc from "./calculo/calc";

const router = Router();

router.post("/createPessoa", async(req, res) => {Pessoa.createPessoa(req, res)});
router.get("/findAllPessoa", async(req, res) => {Pessoa.findAllPessoa(req, res)});
router.put("/updatePessoa", async(req, res) => {Pessoa.updatePessoa(req, res)});


router.post("/createQuarto", async (req,res) => {Quarto.createQuarto(req, res)});
router.get("/findAllQuarto", async(req, res) => {Quarto.findAllQuarto(req, res)});

router.post("/createCompra", async (req,res) => {Compras.createCompra(req, res)});
router.get("/findCompra", async(req, res) => {Compras.findCompra(req, res)});
router.get("/findAllCompra", async(req, res) => {Compras.findAllCompra(req, res)});
router.get("/findAllCompra0", async(req, res) => {Compras.findAllCompra0(req, res)});
router.put("/updateCompra", async (req, res) => {Compras.updateCompra(req, res)});

router.post("/createConta", async(req, res) => {Conta.createConta(req, res)});
router.get("/findConta", async(req, res) => {Conta.findConta(req, res)});
router.get("/getIndexConta", async(req, res) => {Conta.getIndexConta(req, res)});
router.put("/updateConta", async(req, res) => {Conta.updateConta(req, res)});


router.post("/createMensalidade", async (req,res) => {Mensalidade.createMensalidade(req, res)});
router.get("/findAllMensalidade", async(req, res) => {Mensalidade.findAllMensalidade(req, res)});
router.put("/updateMensalidade", async (req, res) => {Mensalidade.updateMensalidade(req, res)});

router.post("/createPagamento", async (req,res) => {Pagamento.createPagamento(req, res)});
router.get("/findallPagamento", async(req, res) => {Pagamento.findAllPagamento(req, res)});
router.put("/updatePagamento", async (req, res) => {Pagamento.updatePagamento(req, res)});

router.get("/calc", async (req, res) => {Calc(req, res)});

export { router };