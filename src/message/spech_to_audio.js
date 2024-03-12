import Funcoes from "../../scripts.js";
const funcoes = Funcoes;

export default async function spech_to_audio(message) {
  if (message.type == "ptt" || message.type == "audio") {
    const media = await message.downloadMedia();
    const data = await funcoes.trans(media);
    await message.reply(data);
  }
}
