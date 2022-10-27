import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const criarConexao = async (data: any) => {
  return prisma.whatsapps.create({ data });
};

const buscarConexao = async (id: any) => {
  return prisma.whatsapps.findUnique({ where: { id: id } });
};

const buscarConexaoByNome = async (name: any) => {
  return prisma.whatsapps.findUnique({ where: { name: name } });
};

const buscarTodasConexao = async () => {
  return prisma.whatsapps.findMany()
};

const atualizarConexao = async (id: any, data: any) => {
  const updateWhatsapp = await prisma.whatsapps.update({
    where: {
      id: id,
    },
    data: data,
  })

  return updateWhatsapp
};

export { criarConexao, buscarConexao, atualizarConexao, buscarTodasConexao, buscarConexaoByNome };
