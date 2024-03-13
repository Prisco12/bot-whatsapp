import qrcode from "qrcode-terminal";
import pkg from "whatsapp-web.js";
const { Client, LocalAuth, MessageMedia, Events, Globals } = pkg;

import text_to_spech from "./src/message/text_to_spech.js";
import spech_to_audio from "./src/message/spech_to_audio.js";
import image_to_sticker from "./src/message/image_to_sticker.js";
import { saving_msg } from "./src/message/saving_msg.js";
import avisos from "./src/message/avisos.js";
import ajuda from "./src/message/ajuda.js";
import return_msg from "./src/message_revoke_everyone/return_msg.js";
import return_edit_msg from "./src/message_edit/return_edit_msg.js";

process.env.GOOGLE_APPLICATION_CREDENTIALS =
  "composed-region-416600-af6bc7913fdc.json"; // Set the path to your Google Cloud service account key.

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: "BOT",
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
    spech_to_audio(message);
    text_to_spech(message);
    image_to_sticker(message);
    saving_msg(message);
    avisos(message);
    ajuda(message);
  });

  client.on("message_revoke_everyone", async (revokedMsg) => {
    return_msg(revokedMsg, client);
  });

  client.on("message_edit", async (messageEdit) => {
    return_edit_msg(messageEdit);
  });

  client.initialize();
}

main();
