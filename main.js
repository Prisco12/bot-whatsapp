import qrcode from "qrcode-terminal";
import pkg from "whatsapp-web.js";
const { Client, LocalAuth, MessageMedia, Events, Globals } = pkg;

import Funcoes from "./scripts.js";
process.env.GOOGLE_APPLICATION_CREDENTIALS =
  "composed-region-416600-af6bc7913fdc.json"; // Set the path to your Google Cloud service account key.

const funcoes = Funcoes;

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: "yourFolderName",
  }),
  puppeteer: {
    args: ["--no-sandbox"],
  },
});

function main() {
  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    console.log("Client is ready!");
  });

  client.on("message", async (message) => {
    console.log(message.body);

    if (message.type == "ptt" || message.type == "audio") {
      const media = await message.downloadMedia();
      const data = await funcoes.trans(media);
      await message.reply(data);
    }

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

    if (message.type == "image") {
      const imagem = await message.downloadMedia();
      if (message.body.startsWith("!sticker")) {
        const stickerMedia = new MessageMedia(
          "image/jpeg",
          imagem.data,
          "image.jpeg"
        );
        client.sendMessage(message.from, stickerMedia, {
          sendMediaAsSticker: true,
        });
      }
    }

    // console.log(message);
    // if (message.type == "chat") {
    //   sentMessages.set(message.timestamp, {
    //     body: message.body,
    //     type: message.type,
    //   });
    // }
    // if (message.type == "image" && message._data.isViewOnce == false) {
    //   const mage = await message.downloadMedia();
    //   sentMessages.set(message.timestamp, {
    //     body: mage.data,
    //     type: message.type,
    //     legenda: message.body,
    //   });
    // }
    // if (message.type == "sticker") {
    //   const mage = await message.downloadMedia();
    //   sentMessages.set(message.timestamp, {
    //     body: mage.data,
    //     type: message.type,
    //   });
    // }
    // if (message.type == "ptt" || message.type == "audio") {
    //   const media = await message.downloadMedia();
    //   sentMessages.set(message.timestamp, {
    //     body: media.data,
    //     type: message.type,
    //   });
    // }
    if (message._data.isViewOnce == true && message.type == "image") {
      const mage = await message.downloadMedia();
      const imageRevoked = new MessageMedia("image/jpeg", mage.data);
      await client.sendMessage(message.from, imageRevoked, {
        caption: `"${message.body}"\n\nVer uma vez Jamais\nDeus Está vendo 👀`,
      });
    }

    console.log("meme", message)
  });

  client.on("message_revoke_everyone", async (message, revokedMsg) => {
    if (revokedMsg.hasMedia && revokedMsg.mediaStage) {
        // Continue com a operação de download da mídia
    } else {
        console.log('A mensagem revogada não contém mídia ou a mídia não está disponível.');
    }
    // console.log(test)
    // console.log("aqui1")
    // const imageRevoked = new MessageMedia("image/jpeg", test);
    // console.log("aqui")
    // await revokedMsg.reply(imageRevoked);



    // if (revokedMsg.type == "chat") {
    //     await revokedMsg.reply(
    //       `Deus Está vendo 👀\n\nMensagem Apagada: " ${revokedMsg.body} "`
    //     );
    //   }

    //   if (revokedMsg.type == "image" && revokedMsg._data.isViewOnce == false) {
    //     console.log('etrei')
    //         const mage = await revokedMsg.downloadMedia();
    //         console.log("MEIDA ", mage)
    //         const imageRevoked = new MessageMedia("image/jpeg", revokedMsg.body);
    //         await client.sendMessage(revokedMsg.from, imageRevoked, {
    //            caption: `"${revokedMsg.body}"\n\nDeus Está vendo 👀`,
    //          });
    //        }

    // const revokedMsgId = revokedMsg.timestamp;

    // if (sentMessages.has(revokedMsgId)) {
    //   const originalMsg = sentMessages.get(revokedMsgId);
    //   // Reenvia a mensagem revogada
    //   if (originalMsg.type == "image") {
    //     const imageRevoked = new MessageMedia("image/jpeg", originalMsg.body);
    //     await client.sendMessage(revokedMsg.from, imageRevoked, {
    //       caption: `"${originalMsg.legenda}"\n\nDeus Está vendo 👀`,
    //     });
    //   }
    //   if (originalMsg.type == "sticker") {
    //     const imageRevoked = new MessageMedia("image/jpeg", originalMsg.body);
    //     await client.sendMessage(revokedMsg.from, imageRevoked, {
    //       sendMediaAsSticker: true,
    //     });
    //   }
    //   if (originalMsg.type == "chat") {
    //     await revokedMsg.reply(
    //       `Deus Está vendo 👀\n\nMensagem Apagada: " ${originalMsg.body} "`
    //     );
    //   }
    //   if (originalMsg.type == "ptt" || originalMsg.type == "audio") {
    //     const mediaRkd = new MessageMedia("audio/ogg", originalMsg.body);
    //     await client.sendMessage(revokedMsg.from, mediaRkd);
    //   }
    // }
  });

  client.on("message_edit", async (messageEdit) => {
    const messageEditID = messageEdit.timestamp;

    if (sentMessages.has(messageEditID)) {
      const originalMsg = sentMessages.get(messageEditID);
      // Reenvia a mensagem revogada
      if (originalMsg.type == "chat") {
        await messageEdit.reply(
          `Deus Está vendo 👀\n\nMensagem Editada: " ${originalMsg.body} "`
        );
      }
    }
  });

  client.initialize();
}

main();
