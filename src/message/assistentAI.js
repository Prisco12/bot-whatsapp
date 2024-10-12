import OpenAI from"openai"
import { Readable } from "stream"; // Para criar um stream do Buffer
import FormData from "form-data";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

// Resolve o caminho atual corretamente em um módulo ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Função para converter base64 para arquivo temporário
function base64ToTempFile(base64String, tempFilePath) {
  const audioBuffer = Buffer.from(base64String, 'base64');
  fs.writeFileSync(tempFilePath, audioBuffer);
  return tempFilePath;
}

const openai = new OpenAI({
  apiKey: "sk-swcJGMEUnkrhSOWpl0tVbIi6YZjhhXur7-elNzEX46T3BlbkFJAQpw9FCPBurAuLwp-1DOblF_EIray1ZNTe_8i4bB8A",
});

export async function assistent(message) {
  if (message.body.startsWith("!gpt ")) {
    const frase = message.body.replace("!gpt ", "");
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: frase }],
      model: "gpt-3.5-turbo",
    });
    await message.reply(completion.choices[0].message.content);
  }
  
}

export async function spechAI(message) {
  if (message.type == "ptt" || message.type == "audio") {
    const media = await message.downloadMedia();
    
    // Verifica se a mídia foi baixada corretamente
    if (!media || !media.data) {
      console.log("Erro: mídia não disponível.");
      return;
    }
    console.log(media.data);

   // Cria um caminho para o arquivo temporário
   const tempFilePath = path.join(__dirname, "temp_audio.mp3");

   // Converte o base64 para arquivo temporário
   base64ToTempFile(media.data, tempFilePath);

    try {
      // Envia o stream para o OpenAI Whisper
      const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(tempFilePath),
        model: "whisper-1",
      });

      console.log(transcription);
      await message.reply(transcription.text);
       // Remove o arquivo temporário após o uso
      fs.unlinkSync(tempFilePath);
    } catch (error) {
      console.error("Erro ao transcrever o áudio:", error);
    }
  }
  
}
