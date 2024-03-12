import pkg from "whatsapp-web.js";
const { MessageMedia } = pkg;

export default async function image_to_sticker(message) {
  const client = await message.getChat();
  if (message.type == "image") {
    const imagem = await message.downloadMedia();
    if (message.body.startsWith("!sticker")) {
      const stickerMedia = new MessageMedia(
        "image/jpeg",
        imagem.data,
        "image.jpeg"
      );
      client.sendMessage(stickerMedia, {
        sendMediaAsSticker: true,
      });
    }
  }
}
