import pkg from "whatsapp-web.js";
import Funcoes from "../../scripts.js";
const { MessageMedia } = pkg;
const funcoes = Funcoes;

export default async function text_to_spech(message) {
  if (message.body.startsWith("!audio ")) {
    const frase = message.body.replace("!audio ", "");
    try {
      const audioPath = await funcoes.viraAudio(frase, message); // Caminho do arquivo de �udio
      const chat = await message.getChat();
      const audio = MessageMedia.fromFilePath(audioPath);
      await chat.sendMessage(audio, { sendAudioAsVoice: true });
    } catch (error) {
      console.error("Erro ao gerar ou enviar o áudio:", error);
    }
  }
}
