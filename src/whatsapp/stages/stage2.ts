import { atualizarAtendimento } from "../../services/atendimento";
import banco from "../banco";

function execute(
  user: any,
  msg: any,
  name: any,
  language: any,
  atendimento: any,
  conn: any
) {
  const optionsSelect = {
    pt: `* Suporte Oficial da Apple*\n*${name}*, O seu atendimento foi encerrado com sucesso, Obrigado. 😃\n\nEspero ter conseguido te ajudar, a *Apple Support* agradeçe o seu contato, até mais.\n\nPara mais informações ligue para 📞 0800 201 7581.`,
    en: `* Apple Support*\n*${name}*, Your support has been closed successfully, Thank you. 😃\n\nI hope you could help, the *Apple Support* thanks you for your contact, see you soon.\n\nFor more information, call 📞 0800 201 7581.`,
    es: `* Soporte Oficial de Apple*\n*${name}*, Su atención ha sido cerrada correctamente, ¡Gracias! 😃\n\nEspero pudiera ayudarle, la *Apple Support* agradece su contacto, hasta pronto.\n\nPara más información, llámese 📞 0800 201 7581.`,
    fr: `* Support Officiel de Apple*\n*${name}*, Votre support a été fermé avec succès, Merci. 😃\n\nJ'espère que vous pouviez vous aider, la *Apple Support* vous remercie de votre contact, à bientôt.\n\nPour plus d'informations, appelez 📞 0800 201 7581.`,
  };

  if (msg === "*") {
    atualizarAtendimento(atendimento.id, { status: "finalizado" });
    banco[user].stage = 0;
    return [optionsSelect[language]];
  }
}

export default execute;
