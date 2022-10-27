import express from "express";
const router = express.Router();

import {
  whatsapp,
  enviarMensagem,
  meuBots,
  deslogarZap,
  finalizarSessao,
  repararConexao
} from "../controllers/bot";

import { obrigatorio } from "../token";

router.post("/whatsapp", whatsapp);

router.post("/enviar-mensagem", obrigatorio, enviarMensagem);

router.get("/meuBots", obrigatorio, meuBots);

router.get("/deslogar", obrigatorio, deslogarZap);

router.get("/finalizar-sessao", obrigatorio, finalizarSessao);

router.get("/reparar-sessao", obrigatorio, repararConexao);

export default router;
