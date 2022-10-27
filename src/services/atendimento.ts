import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const criarAtendimento = async (data: any) => {
  return prisma.atendimento.create({ data });
};

const deleteAtendimento = async (id: any) => {
  return prisma.atendimento.delete({ where: { id } });
};

const buscarAtendimento = async (number: string) => {
  const parserNumber = number.replace(/\D/g, "");
  return prisma.atendimento.findFirst({
    where: { number: parserNumber, status: "aberto" },
  });
};

const buscarAtendimentoAll = async (number: string) => {
  const parserNumber = number.replace(/\D/g, "");
  return prisma.atendimento.findFirst({
    where: { number: parserNumber },
  });
};

const buscarAtendimentoProtocolo = async (number: string) => {
  return prisma.atendimento.findFirst({
    where: { number: number },
  });
};

const atualizarAtendimento = async (id: any, data: any) => {
  const updateWhatsapp = await prisma.atendimento.update({
    where: {
      id: id,
    },
    data: data,
  });

  return updateWhatsapp;
};

export { criarAtendimento, buscarAtendimento, atualizarAtendimento, buscarAtendimentoProtocolo, deleteAtendimento , buscarAtendimentoAll};
