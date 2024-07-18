import pkg from "whatsapp-web.js";
import Funcoes from "../../scripts.js";
const { MessageMedia } = pkg;
const funcoes = Funcoes;

export default async function youtubeToMp3(message) {
  if (message.body.startsWith("!mp3 ")) {
    const url = message.body.replace("!mp3 ", "");
    try {
      const audioPath = await funcoes.youToMp3(url); // Caminho do arquivo de �udioc
      if (audioPath == false){
        await message.reply('Download indisponivel, video maior que 5 minutos')
      } else {
        console.log(audioPath)
        const chat = await message.getChat();
        const audio = MessageMedia.fromFilePath(audioPath);
        await chat.sendMessage(audio, { sendAudioAsVoice: true });
      }
      
    } catch (error) {
      console.error("Erro ao gerar ou enviar o áudio:", error);
    }
  }
}
