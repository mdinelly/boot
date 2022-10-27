import {
  atualizarAtendimento,
  buscarAtendimentoProtocolo,
} from "../../services/atendimento";
import external from "../updateExternal";

const execute = async (
  user: any,
  msg: any,
  name: any,
  language: any,
  atendimento: any,
  conn: any
) => {
  const result = await buscarAtendimentoProtocolo(atendimento.number);
  if (result) {
    const text = {
      pt: "Informações do Protocolo Recuperadas com Sucesso.",
      en: "Information of the Protocol Recovered Successfully.",
      es: "Información del Protocolo Recuperada con Éxito.",
      fr: "Information du Protocol Récupérée avec Succès.",
    };

    const option = {
      pt: `* Suporte Oficial da Apple*\n ${text[language]}\n\nPrezado(a) Cliente Apple,\n\n ${result.model} emitiu uma nova localização e foi encontrado. Saiba como realizar o seu *Processo de Recuperação*.\n\n*Verifique em:* \n${result.link}.\n\nAtenciosamente,\n* Suporte Oficial da Apple*\n\nO seu atendimento foi encerrado, ok? 😉`,
      en: `* Apple Support*\n ${text[language]}\n\nDear Customer Apple,\n\n ${result.model} issued a new location and was found. Learn how to *Process of Recovery*.\n\n*Check in:* \n${result.link}.\n\nThank you,\n* Apple Support*\n\nYour support has been closed, ok? 😉`,
      es: `* Soporte Oficial de Apple*\n ${text[language]}\n\nPrezado(a) Cliente Apple,\n\n ${result.model} emitiu uma nova localização e foi encontrado. Saiba como realizar o seu *Processo de Recuperação*.\n\n*Verifique em:* \n${result.link}.\n\nAtenciosamente,\n* Soporte Oficial de Apple*\n\nSu atención ha sido cerrada, ok? 😉`,
      fr: `* Support Officiel de Apple*\n ${text[language]}\n\nPrezado(a) Cliente Apple,\n\n ${result.model} emitiu uma nova localização e foi encontrado. Saiba como realizar o seu *Processo de Recuperação*.\n\n*Verifique em:* \n${result.link}.\n\nAtenciosamente,\n* Support Officiel de Apple*\n\nVotre support a été fermé, ok? 😉`,
    };

    return [option[language]];
  }

  if (!result) {
    const text = {
      pt: "Não foi possível encontrar informações vinculadas ao Protocolo informado, o parâmetro utilizado para pesquisa foi o seu contato. ",
      en: "It was not possible to find information related to the Protocol informed, the parameter used to search was your contact.",
      es: "No fue posible encontrar información vinculada al Protocolo informado, el parámetro utilizado para la búsqueda fue su contacto.",
      fr: "Il n'a pas été possible de trouver des informations liées au Protocol informé, le paramètre utilisé pour la recherche était votre contact.",
    };

    const optionsReturn = {
      pt: `* Suporte Oficial da Apple*\n ${text[language]}\n\nPrezado(a) Cliente Apple,\n\n ${atendimento.model} emitiu uma nova localização e foi encontrado. Saiba como realizar o seu *Processo de Recuperação*.\n\n*Verifique em:* \n${atendimento.link}.\n\nAtenciosamente,\n* Suporte Oficial da Apple*\n\nO seu atendimento foi encerrado, ok? 😉`,
      en: `* Apple Support*\n ${text[language]}\n\nDear Customer Apple,\n\n ${atendimento.model} issued a new location and was found. Learn how to *Process of Recovery*.\n\n*Check in:* \n${atendimento.link}.\n\nThank you,\n* Apple Support*\n\nYour support has been closed, ok? 😉`,
      es: `* Soporte Oficial de Apple*\n ${text[language]}\n\nPrezado(a) Cliente Apple,\n\n ${atendimento.model} emitiu uma nova localização e foi encontrado. Saiba como realizar o seu *Processo de Recuperação*.\n\n*Verifique em:* \n${atendimento.link}.\n\nAtenciosamente,\n* Soporte Oficial de Apple*\n\nSu atención ha sido cerrada, ok? 😉`,
      fr: `* Support Officiel de Apple*\n ${text[language]}\n\nPrezado(a) Cliente Apple,\n\n ${atendimento.model} emitiu uma nova localização e foi encontrado. Saiba como realizar o seu *Processo de Recuperação*.\n\n*Verifique em:* \n${atendimento.link}.\n\nAtenciosamente,\n* Support Officiel de Apple*\n\nVotre support a été fermé, ok? 😉`,
    };

    await atualizarAtendimento(atendimento.id, { status: "finalizado" });
    await external(atendimento.protocolo, "finalizado");
    return [optionsReturn[language]];
  }


};

export default execute;
