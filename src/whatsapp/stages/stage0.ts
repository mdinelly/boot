import menu from '../menu'
import banco from '../banco'

function execute(user: any, msg: any, name: any, language: any, atendimento: any) {

  let greeting: any = {
    pt: "*Como posso te ajudar?* \n",
    en: "*How can I help you?* \n",
    es: "*¿Cómo te puedo ayudar?* \n",
    fr: "*Comment puis-je t'aider?* \n",
  }

  let greetingMessage: any = {
    pt: `🤖 Olá *${name}.* Bem-vindo! Eu sou a *Alice,* a sua Assistente Virtual do Canal de Atendimento da *Apple Support.* Por aqui, eu sei resolver os assuntos a seguir. É só digitar o número da opção que você precisa: \n\n*Exemplo: 1*`,
    en: `🤖 Olá *${name}.* Welcome! I'm *Alice,* your *Apple Support Channel Virtual Assistant.* Around here, I know how to handle the following issues. Just type in the option number you need: \n\n*Example: 1*`,
    es: `🤖 Olá *${name}.* ¡Bienvenido! Soy *Alice,* tu Asistente Virtual del Canal de Soporte de Apple.* Por aquí, sé cómo manejar los siguientes problemas. Simplemente escriba el número de opción que necesita: \n\n*Ejemplo: 1*`,
    fr: `🤖 Olá *${name}.* Bienvenue! Je suis *Alice*, votre Assistant Virtuel *Apple Support* Channel. Ici, je sais comment gérer les problèmes suivants. Tapez simplement le numéro d'option dont vous avez besoin: \n\n*Exemple: 1*`,
  }

  let options = greeting[language];
  console.log(menu[language])
  menu[language].forEach((el: any) => {
    options += `*${el.id}* - ${el.descricao}\n`
  })

  const body = `\u200e${greetingMessage[language]}\n\n${options}`;

  console.log(user)
  banco[user].stage = 1

  return [body]
}

export default execute