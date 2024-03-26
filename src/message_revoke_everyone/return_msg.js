import { sentMessages } from "../message/saving_msg.js";
import pkg from "whatsapp-web.js";
const { MessageMedia, Client } = pkg;

export default async function return_msg(message, revokedMsg ,client) {
  const revokedMsgId = message.timestamp;
  const mensageRtrn = revokedMsg
  console.log(mensageRtrn.body)
  console.log(mensageRtrn)
  if (mensageRtrn.type == "chat") {
    await message.reply(
      `Deus Está vendo 👀\n\nMensagem Apagada:" ${mensageRtrn.body} "`
    );
  }
  if (sentMessages.has(revokedMsgId)) {
    const originalMsg = sentMessages.get(revokedMsgId);
    // Reenvia a mensagem revogada
    if (originalMsg.type == "image") {
      const imageRevoked = new MessageMedia("image/jpeg", originalMsg.body);
      await client.sendMessage(message.from, imageRevoked, {
        caption: `"${originalMsg.legenda}"\n\nDeus Está vendo 👀`,
      });
    }
    if (originalMsg.type == "sticker") {
      const imageRevoked = new MessageMedia("image/jpeg", originalMsg.body);
      await client.sendMessage(message.from, imageRevoked, {
        sendMediaAsSticker: true,
      });
    }
    if (originalMsg.type == "ptt" || originalMsg.type == "audio") {
      const mediaRkd = new MessageMedia("audio/ogg", originalMsg.body);
      await client.sendMessage(message.from, mediaRkd);
    }
  }
}
