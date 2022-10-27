import { buscarTodasConexao } from "../services/whatsapp";
import {initWbot} from "./baileys"

const startAllConexao = async (io: any) => {

  const whatsapp = await buscarTodasConexao();

  whatsapp.forEach(async (con: any) => {
    await initWbot(con, io);
   });
 }


 export default startAllConexao;