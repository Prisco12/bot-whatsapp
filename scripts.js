import { SpeechClient } from "@google-cloud/speech";
import pkg from "whatsapp-web.js";
const { Client, LocalAuth } = pkg;

import gTTS from "gtts";

import poji_ytmp3 from 'youtube-to-mp3-poji'
import https from 'https';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: "yourFolderName",
  }),
});

class Funcoes {
  msghitter(msgR, msgH) {
    client.on("message", async (message) => {
      if (message.body === `!${msgR}`) {
        await client.sendMessage(message.from, msgH);
      }
    });
  }

  async trans(audioName) {
    const client2 = new SpeechClient();
    // Creates a client
    const audioBytes = audioName.data;

    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    const audio = {
      content: audioBytes,
    };
    const config = {
      encoding: "OGG_OPUS",
      sampleRateHertz: 16000,
      languageCode: "pt-BR",
    };
    const request = {
      audio: audio,
      config: config,
    };

    // Detects speech in the audio file
    const [response] = await client2.recognize(request);
    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join("\n");

    return transcription;
  }

  async viraAudio(frase, message) {
    return new Promise((resolve, reject) => {
      const gtts = new gTTS(frase, "pt-br");
      const audioPath = "./voz.mp3";

      gtts.save(audioPath, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(audioPath);
        }
      });
    });
  }

  async youToMp3(url) {
    try {
      console
      const data = await poji_ytmp3(url); // link do YouTube
      console.log(data);
      // Obter o caminho do diretório atual
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);

      const fileUrl = data.data.link;
      const fileName = `modao.mp3`;
      const filePath = path.resolve(__dirname, fileName);

      return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filePath);
  
        https.get(fileUrl, (response) => {
          response.pipe(file);
  
          file.on('finish', () => {
            file.close();
            console.log(`Download completed: ${filePath}`);
            resolve(filePath); // Resolva a Promise com o caminho do arquivo
          });
        }).on('error', (error) => {
          fs.unlink(filePath, () => {}); // Remove the file on error
          console.error("Error occurred while downloading the file:", error.message);
          reject(error); // Rejeite a Promise em caso de erro
        });
      });
    } catch (error) {
      console.error("Error occurred:", error.message);
      throw error; // Rejeite a Promise se ocorrer um erro
    }
  }
}

export default new Funcoes();
