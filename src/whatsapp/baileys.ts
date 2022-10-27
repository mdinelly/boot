import jwt from "jsonwebtoken";
import {
  criarConexao,
  buscarConexaoByNome,
  atualizarConexao,
  buscarConexao,
} from "../services/whatsapp";
import { buscarAtendimento, criarAtendimento } from "../services/atendimento";

import { Boom } from "@hapi/boom";
import makeWASocket, {
  AnyMessageContent,
  delay,
  DisconnectReason,
  fetchLatestBaileysVersion,
  getContentType,
  makeInMemoryStore,
  proto,
  useSingleFileAuthState,
  WASocket,
} from "@adiwajshing/baileys";
import qrCode from "qrcode-terminal";
import qrImage from "qr-image";

import MAIN_LOGGER from "@adiwajshing/baileys/lib/Utils/logger";

import banco from "./banco";
import getStages from "./stages";
import { existsSync, unlinkSync } from "fs";
import { join } from "path";

const logger = MAIN_LOGGER.child({});
logger.level = "error";

interface Session extends WASocket {
  id?: number;
  state?: string;
}

const sessions: Session[] = [];

const sessionsx = new Map();
const retries = new Map();

export const sendMessageWTyping = async (
  sock: Session,
  msg: AnyMessageContent,
  jid: string
) => {
  await sock.presenceSubscribe(jid);
  await delay(500);

  await sock.sendPresenceUpdate("composing", jid);
  await delay(2000);

  await sock.sendPresenceUpdate("paused", jid);

  await sock.sendMessage(jid, msg);
};

const getTypeMessage = (msg: proto.IWebMessageInfo): string => {
  try {
    return getContentType(msg.message);
  } catch (error) {
    console.log(error);
  }
};

const sessionsDir = (sessionId = "") => {
  return join(__dirname, "../../", sessionId ? `${sessionId}.json` : "");
};

const isSessionFileExists = (name) => {
  return existsSync(sessionsDir(name));
};

const deleteSession = (sessionId, isLegacy = false) => {
  const sessionFile = (isLegacy ? "legacy_" : "md_") + sessionId;
  const storeFile = `${sessionId}_store`;
  console.log(sessionsDir(sessionFile))
  if (isSessionFileExists(sessionFile)) {
    unlinkSync(sessionsDir(sessionFile));
  }

  if (isSessionFileExists(storeFile)) {
    unlinkSync(sessionsDir(storeFile));
  }
};

const shouldReconnect = (sessionId) => {
  let maxRetries = 5;
  let attempts = retries.get(sessionId) ?? 0;

  maxRetries = maxRetries < 1 ? 1 : maxRetries;

  if (attempts < maxRetries) {
    ++attempts;

    console.log("Reconnecting...", { attempts, sessionId });
    retries.set(sessionId, attempts);

    return true;
  }

  return false;
};

// start a connection
export const initWbot = async (zap: any, io: any, isLegacy = false) => {
  return new Promise(async (resolve, reject) => {
    const whatsapp = await buscarConexao(zap.id);

    let sock: Session = null
    const sessionFile = (isLegacy ? "legacy_" : "md_") + zap.id;

    const { state, saveState } = useSingleFileAuthState(`${sessionFile}.json`);

    // fetch latest version of WA Web
    const { version, isLatest } = await fetchLatestBaileysVersion();
    console.log(`using WA v${version.join(".")}, isLatest: ${isLatest}`);

    sock = makeWASocket({
      version,
      logger,
      printQRInTerminal: true,
      auth: state,
      // implement to handle retries
      getMessage: async (key) => {
        return {
          conversation: "hello",
        };
      },
    });

    // store.bind(sock.ev)

    sock.ev.on("messages.upsert", async (m) => {
      const msg = m.messages[0];

      if (!msg.key.fromMe && m.type === "notify") {
        await sock!.sendReadReceipt(msg.key.remoteJid, msg.key.participant, [
          msg.key.id,
        ]);
      }

      const messageContent = m?.messages[0].message;
      if (!messageContent) return;

      let sender = msg.key.remoteJid;

      if (!sender) return false;
      const messageType = getTypeMessage(msg);

      const atendimentoGerado = await buscarAtendimento(sender);

      // if (!atendimentoGerado) return false;

      // if (atendimentoGerado.status === "finalizado") return false;

      const numero = sender.replace(/\D/g, "");

      const nome = msg.pushName;


      if (messageType === "buttonsResponseMessage") {
        
        let resp: any = await getStages(atendimentoGerado?.language)[
          getStage(numero)
        ].obj(
          numero,
          messageContent.buttonsResponseMessage,
          nome,
          atendimentoGerado?.language,
          atendimentoGerado
        );

        resp.map(async (resp: any) => {
          await sendMessageWTyping(sock, { text: resp }, msg.key.remoteJid);
        });
      }

      if (messageType === "conversation") {
        let resp: any = await getStages(atendimentoGerado?.language)[
          getStage(numero)
        ].obj(
          numero,
          messageContent.conversation,
          nome,
          atendimentoGerado.language,
          atendimentoGerado
        );
        console.log(getStage(numero))
        resp?.map(async (resp: any) => {
          await sendMessageWTyping(sock, { text: resp }, msg.key.remoteJid);
        });
      }
    });

    sock.ev.on("connection.update", async (update) => {
      const { connection, lastDisconnect, qr } = update;
      const statusCode = (lastDisconnect?.error as Boom)?.output?.statusCode;

      if (connection === "close") {
        sock.state = "close";
        console.log(statusCode)
        if (
          statusCode === DisconnectReason.loggedOut ||
          !shouldReconnect(zap.id)
        ) {
          removeWbot(zap.id);
          deleteSession(zap.id, false);
        }

        setTimeout(
          () => {
            initWbot(zap, io);
          },
          statusCode === DisconnectReason.restartRequired ? 4000 : 4000
        );

        // reconnect if not logged out
        io.emit("whatsapp-status", {
          message: connection,
          session: whatsapp,
        });
      }

      if (qr) {
        let qr_svg = qrImage.imageSync(qr, {
          type: "png",
        });
        //

        io.emit("whatsapp-status", {
          message: "Leitura do QR pendente!",
          session: whatsapp,
        });
        let base64data = qr_svg.toString("base64");
        let qr_str = "data:image/png;base64," + base64data;

        console.log("QR RECEIVED", qr_str);

        const sessionIndex = sessions.findIndex((s) => s.id === whatsapp?.id);

        if (sessionIndex === -1) {
          sock.id = whatsapp?.id;
          sessions.push(sock);
        }

        await atualizarConexao(whatsapp?.id, {
          qrcode: qr_str,
          status: "qrcode",
          retries: 0,
        });

        io.emit("whatsappSession", {
          action: "update",
          session: whatsapp,
          qr: qr_str,
        });
      }
      console.log("status", connection);
      if (connection === "open") {
        await atualizarConexao(whatsapp?.id, {
          status: "CONNECTED",
          qrcode: "",
          retries: 0,
        });

        const sessionIndex = sessions.findIndex((s) => s.id === whatsapp?.id);
        if (sessionIndex === -1) {
          sock.id = whatsapp?.id;
          sessions.push(sock);
        }

        sock.state = "open";

        resolve(sock);
      }

    });
    // listen for when the auth credentials is updated
    sock.ev.on("creds.update", saveState);
  });
};

const getStage = (user: any) => {
  if (banco[user]) {
    return banco[user].stage;
  } else {
    banco[user] = {
      stage: 0,
      items: [],
    };
    return banco[user].stage;
  }
};

export const getWbot = (whatsappId: number): Session => {
  const sessionIndex = sessions.findIndex((s) => s.id === whatsappId);
  if (sessionIndex === -1) {
    console.log("session not found");
  }
  return sessions[sessionIndex];
};

export const removeWbot = (whatsappId: number): void => {
  try {
    const sessionIndex = sessions.findIndex((s) => s.id === whatsappId);
    if (sessionIndex !== -1) {
      sessions.splice(sessionIndex, 1);
    }
  } catch (err: any) {
    console.log(err);
  }
};
