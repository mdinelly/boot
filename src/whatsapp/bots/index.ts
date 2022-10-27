// const startAppleTemplate = (name: string) => {
//   let greeting = {
//     pt: "Como posso te ajudar? \n",
//     en: "How can I help you? \n",
//     es: "¿Cómo te puedo ayudar? \n",
//     fr: "*Comment puis-je t'aider? \n",
//   };

//   let greetingMessage = {
//     pt: `🤖 Olá ${name}. Bem-vindo! Eu sou a *Alice,* a sua Assistente Virtual do Canal de Atendimento da *Apple Support.* Por aqui, eu sei resolver os assuntos a seguir. É só digitar o número da opção que você precisa: \n*Exemplo: 1*`,
//     en: `🤖 Olá ${name}. Welcome! I'm *Alice,* your *Apple Support Channel Virtual Assistant.* Around here, I know how to handle the following issues. Just type in the option number you need: \n*Example: 1*`,
//     es: `🤖 Olá ${name}. ¡Bienvenido! Soy *Alice,* tu Asistente Virtual del Canal de Soporte de Apple.* Por aquí, sé cómo manejar los siguientes problemas. Simplemente escriba el número de opción que necesita: \n*Ejemplo: 1*`,
//     fr: `🤖 Olá ${name}. Bienvenue! Je suis *Alice*, votre Assistant Virtuel *Apple Support* Channel. Ici, je sais comment gérer les problèmes suivants. Tapez simplement le numéro d'option dont vous avez besoin: \n*Exemple: 1*`,
//   };

//   return { greeting, greetingMessage };
// };

// const startXiaomiTemplate = (name: string) => {
//   let greeting = {
//     pt: "Como posso te ajudar? \n",
//     en: "How can I help you? \n",
//     es: "¿Cómo te puedo ayudar? \n",
//     fr: "*Comment puis-je t'aider? \n",
//   };

//   let greetingMessage = {
//     pt: `🤖 Olá ${name}. Bem-vindo! Eu sou a *Alice,* a sua Assistente Virtual do Canal de Atendimento da *Apple Support.* Por aqui, eu sei resolver os assuntos a seguir. É só digitar o número da opção que você precisa: \n*Exemplo: 1*`,
//     en: `🤖 Olá ${name}. Welcome! I'm *Alice,* your *Apple Support Channel Virtual Assistant.* Around here, I know how to handle the following issues. Just type in the option number you need: \n*Example: 1*`,
//     es: `🤖 Olá ${name}. ¡Bienvenido! Soy *Alice,* tu Asistente Virtual del Canal de Soporte de Apple.* Por aquí, sé cómo manejar los siguientes problemas. Simplemente escriba el número de opción que necesita: \n*Ejemplo: 1*`,
//     fr: `🤖 Olá ${name}. Bienvenue! Je suis *Alice*, votre Assistant Virtuel *Apple Support* Channel. Ici, je sais comment gérer les problèmes suivants. Tapez simplement le numéro d'option dont vous avez besoin: \n*Exemple: 1*`,
//   };

//   return { greeting, greetingMessage };
// };

// const optionsList: any = {
//   pt: [
//     {
//       id: 1,
//       descricao: "Localizar dispositivo ",
//     },
//     {
//       id: 2,
//       descricao: "Localizar dispositivo desligado ou offline ",
//     },
//     {
//       id: 3,
//       descricao: "Informar o protocolo manualmente",
//     },
//     {
//       id: 4,
//       descricao: "Encerrar atendimento",
//     },
//   ],
//   en: [
//     {
//       id: 1,
//       descricao: "Find Device",
//     },
//     {
//       id: 2,
//       descricao: "Find device offline or offline ",
//     },
//     {
//       id: 3,
//       descricao: "Enter the protocol manually",
//     },
//     {
//       id: 4,
//       descricao: "End service",
//     },
//   ],
//   fr: [
//     {
//       id: 1,
//       descricao: "Trouver un appareil",
//     },
//     {
//       id: 2,
//       descricao: "Rechercher un appareil hors ligne ou hors ligne ",
//     },
//     {
//       id: 3,
//       descricao: "Entrez le protocole manuellement",
//     },
//     {
//       id: 4,
//       descricao: "Fin de service",
//     },
//   ],
//   es: [
//     {
//       id: 1,
//       descricao: "Buscar dispositivo",
//     },
//     {
//       id: 2,
//       descricao: "Buscar dispositivo sin conexión o sin conexión",
//     },
//     {
//       id: 3,
//       descricao: "Ingrese el protocolo manualmente",
//     },
//     {
//       id: 4,
//       descricao: "Servicio final",
//     },
//   ],
// };

// const stage1Template = (name: any, lang = "pt") => {
//   const templateApple: any = startAppleTemplate(name);

//   let options: any = templateApple.greeting[lang];

//   optionsList[lang].forEach((el: any) => {
//     options += `*${el.id}* - ${el.descricao}\n`;
//   });

//   const body = `\u200e${templateApple.greetingMessage[lang]}\n\n${options}`;

//   return body;
// };


// export { startAppleTemplate, startXiaomiTemplate, stage1Template, optionsList };
