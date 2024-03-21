import pkg from "whatsapp-web.js";
const { MessageMedia } = pkg;
export const sentMessages = new Map();

export async function saving_msg(message) {
  const client = await message.getChat();
  if (message.type == "chat") {
    sentMessages.set(message.timestamp, {
      body: message.body,
      type: message.type,
    });
  }
  if (message.type == "image" && message._data.isViewOnce == false) {
    const mage = await message.downloadMedia();
    sentMessages.set(message.timestamp, {
      body: mage.data,
      type: message.type,
      legenda: message.body,
    });
  }
  if (message.type == "sticker") {
    const mage = await message.downloadMedia();
    sentMessages.set(message.timestamp, {
      body: mage.data,
      type: message.type,
    });
  }
  if (message.type == "ptt" || message.type == "audio") {
    const media = await message.downloadMedia();
    sentMessages.set(message.timestamp, {
      body: media.data,
      type: message.type,
    });
  }
  if (message._data.isViewOnce == true && message.type == "image") {
    const mage = await message.downloadMedia();
    const imageRevoked = new MessageMedia("image/jpeg", mage.data);
    await client.sendMessage(imageRevoked, {
      caption: `"${message.body}"\n\nVer uma vez Jamais\nDeus Está vendo 👀`,
    });
  }
  console.log("antes", sentMessages.size);

  // Função para limpar o mapa
  function limparMapa() {
    sentMessages.clear();
  }

   

   // Verifica se é 14:10:00 e limpa o mapa apenas uma vez
     if (sentMessages.size === 250) {
       limparMapa();
       console.log("dps", sentMessages.size);
     }
  
 

  // // Variável para indicar se o mapa já foi limpo hoje
  // let jaLimpou = false;

  // // Verifica se é 14:10:00 e limpa o mapa apenas uma vez
  // function verificarLimpezaDiaria() {
  //   const agora = new Date();
  //   if (
  //     !jaLimpou &&
  //     agora.getHours() === 0 &&
  //     agora.getMinutes() === 0 &&
  //     agora.getSeconds() === 0
  //   ) {
  //     limparMapa();
  //     console.log("dps", sentMessages.size);
  //     jaLimpou = true;
  //   } else if (
  //     agora.getHours() !== 0 ||
  //     agora.getMinutes() !== 0 ||
  //     agora.getSeconds() !== 0
  //   ) {
  //     // Resetar a flag se não for mais 14:10:00
  //     jaLimpou = false;
  //   }
  // }

  // // Configurar temporizador para verificar a cada segundo
  // setInterval(verificarLimpezaDiaria, 1000); // Verificar a cada segundo
}
