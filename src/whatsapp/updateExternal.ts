import axios from 'axios';
const updateStatusExternal = async (protocolo: string, status: string, link = "nao") => {
  try {
    if(link === "sim"){ 
      return await axios.get(`http://ftgsmserver.com/php/wp.php?protocolo=${protocolo}&status=${status}&link=${link}`)
  
    }
    return await axios.get(`http://ftgsmserver.com/php/wp.php?protocolo=${protocolo}&status=${status}&link=`)
  
  } catch (error) {
    console.log(error)
  }
}

export default updateStatusExternal;