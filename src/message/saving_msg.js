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
}
