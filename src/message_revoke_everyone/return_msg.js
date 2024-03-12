import { sentMessages } from "../message/saving_msg.js";
import pkg from "whatsapp-web.js";
const { MessageMedia, Client } = pkg;

export default async function return_msg(revokedMsg, client) {
  const revokedMsgId = revokedMsg.timestamp;

  if (sentMessages.has(revokedMsgId)) {
    const originalMsg = sentMessages.get(revokedMsgId);
    // Reenvia a mensagem revogada
    if (originalMsg.type == "image") {
      const imageRevoked = new MessageMedia("image/jpeg", originalMsg.body);
      await client.sendMessage(revokedMsg.from, imageRevoked, {
        caption: `"${originalMsg.legenda}"\n\nDeus Está vendo 👀`,
      });
    }
    if (originalMsg.type == "sticker") {
      const imageRevoked = new MessageMedia("image/jpeg", originalMsg.body);
      await client.sendMessage(revokedMsg.from, imageRevoked, {
        sendMediaAsSticker: true,
      });
    }
    if (originalMsg.type == "chat") {
      await revokedMsg.reply(
        `Deus Está vendo 👀\n\nMensagem Apagada: " ${originalMsg.body} "`
      );
    }
    if (originalMsg.type == "ptt" || originalMsg.type == "audio") {
      const mediaRkd = new MessageMedia("audio/ogg", originalMsg.body);
      await client.sendMessage(revokedMsg.from, mediaRkd);
    }
  }
}
