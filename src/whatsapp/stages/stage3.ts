import stages from "../stages";
import banco from "../banco";
import external from "../updateExternal";
import { atualizarAtendimento } from "../../services/atendimento";

function execute(
  user: any,
  msg: any,
  name: any,
  language: any,
  atendimento: any,
  conn: any
) {

  if (msg === "*") {

    banco[user].stage = 0;
    const optionsSelect = {
      pt: `* Suporte Oficial da Apple*\nAté logo!👋 Foi um prazer poder te ajudar. Quando precisar da minha ajuda novamente, estarei por aqui, basta iniciar um novo atendimento.\n\nPara mais informações procure uma de nossas lojas em sua região ou ligue para nossa central de atendimento 📞 0800 761 0867.`,
      en: `* Apple Support*\nGoodbye!👋 I hope you could help. If you need my help again, I'll be here, just start a new support.\n\nFor more information, please visit one of our stores in your region or call our support center 📞 0800 761 0867.`,
      es: `* Soporte Oficial de Apple*\nHasta pronto!👋 ¡Espero pudiera ayudarle. Si necesita mi ayuda de nuevo, estaré aquí, basta iniciar un nuevo atención.\n\nPara más información, visite una de nuestras tiendas en su región o llámese a nuestro centro de soporte 📞 0800 761 0867.`,
      fr: `* Support Officiel de Apple*\nAu revoir!👋 J'espère que vous pouviez vous aider. Si vous avez besoin de ma aide de nouveau, je serai là, juste démarrer un nouveau support.\n\nPour plus d'informations, visitez une de nos magasins dans votre région ou appelez notre centre de support 📞 0800 761 0867.`,
    };
    console.log(optionsSelect[language]);
    return [optionsSelect[language]];
  }

  if (msg === "*") {
    banco[user].stage = 4;
    return stages[4].obj(user, msg, name, language, atendimento);
  }

  const option = {
    pt: `* Suporte Oficial da Apple*\n*${name}*, Você confirma o *Protocolo de Atendimento:*\n${msg}?\n\nDigite novamente o protocolo para corrigir, # para confirmar ou * para encerrar o atendimento.`,
    en: `* Apple Support*\n*${name}*, You confirm the *Protocolo de Atendimento:*\n${msg}?\n\nType again the protocol to correct, # to confirm or * to close the support.`,
    es: `* Soporte Oficial de Apple*\n*${name}*, Confirma el *Protocolo de Atendimento:*\n${msg}?\n\nDigite de nuevo el protocolo para corregir, # para confirmar ou * para cerrar el atención.`,
    fr: `* Support Officiel de Apple*\n*${name}*, Vous confirmez le *Protocolo de Atendimento:*\n${msg}?\n\nTapez de nouveau le protocole pour corriger, # pour confirmer ou * pour fermer le support.`,
  };

  return [option[language]];
}

export default execute;
