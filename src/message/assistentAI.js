import OpenAI from"openai"
import fs from "fs";
import path from "path";

import { fileURLToPath } from 'url';

// Resolve o caminho atual corretamente em um módulo ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Define o tamanho máximo permitido para cada parte (25 MB)
const MAX_SIZE = 4 * 1024 * 1024; // 25 MB
const WHATSAPP_CHAR_LIMIT = 4096; // Limite de caracteres do WhatsApp

// Função para converter base64 para arquivo temporário
function base64ToTempFile(base64String, tempFilePath) {
  const audioBuffer = Buffer.from(base64String, 'base64');
  fs.writeFileSync(tempFilePath, audioBuffer);
  return tempFilePath;
}

// Função para dividir um arquivo grande em partes menores
function splitAudio(filePath, outputDir) {
  const audioBuffer = fs.readFileSync(filePath); // Lê o arquivo inteiro na memória
  const totalSize = audioBuffer.length;

  let part = 0;
  let start = 0;

  while (start < totalSize) {
    const end = Math.min(start + MAX_SIZE, totalSize);
    const chunk = audioBuffer.slice(start, end); // Divide em partes menores

    const partPath = path.join(outputDir, `audio_part_${part}.mp3`);
    fs.writeFileSync(partPath, chunk); // Salva cada parte como um novo arquivo
    console.log(`Parte ${part} salva em: ${partPath}`);

    part++;
    start = end;
  }
}

const openai = new OpenAI({
  apiKey: "",
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

// Função para enviar o texto completo dividido em partes corretamente e sequencialmente
async function enviarTextoEmPartes(textoCompleto, message) {
  const partes = [];
  let inicio = 0;

  // Divide o texto completo em partes de até 4096 caracteres, evitando cortar palavras no meio
  while (inicio < textoCompleto.length) {
    let fim = Math.min(inicio + WHATSAPP_CHAR_LIMIT, textoCompleto.length);

    // Garante que não corte no meio de uma palavra
    if (fim < textoCompleto.length && textoCompleto[fim] !== ' ') {
      fim = textoCompleto.lastIndexOf(' ', fim);
    }

    if (fim === -1) fim = inicio + WHATSAPP_CHAR_LIMIT;

    partes.push(textoCompleto.slice(inicio, fim).trim());
    inicio = fim;
  }

  // Envia cada parte de forma sequencial para evitar que a ordem seja quebrada
  for (const parte of partes) {
    try {
      await message.reply(parte); // Espera o envio desta parte antes de enviar a próxima
    } catch (error) {
      console.error("Erro ao enviar a mensagem:", error);
    }
  }
}

// Função principal para processar áudio e enviar resposta
export async function spechAI(message) {
  if (["ptt", "audio", "document"].includes(message.type)) {
    const media = await message.downloadMedia();

    if (!media || !media.data || !media.mimetype.includes("audio")) {
      console.log("Erro: mídia não disponível ou não é um áudio.");
      return;
    }

    const tempFilePath = path.join(__dirname, "temp_audio.mp3");
    base64ToTempFile(media.data, tempFilePath);

    const outputDir = path.join(__dirname, "audio_parts");
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    splitAudio(tempFilePath, outputDir);

    const files = fs.readdirSync(outputDir);
    let textoCompleto = "";

    for (const file of files) {
      const partPath = path.join(outputDir, file);

      try {
        const transcription = await openai.audio.transcriptions.create({
          file: fs.createReadStream(partPath),
          model: 'whisper-1',
        });

        // console.log(`Transcrição da parte ${file}:`, transcription.text);
        textoCompleto += transcription.text + "\n"; // Concatena as partes
      } catch (error) {
        console.error(`Erro ao transcrever a parte ${file}:`, error);
      } finally {
        fs.unlinkSync(partPath); // Remove a parte após o uso
      }
    }

    fs.unlinkSync(tempFilePath); // Remove o arquivo temporário original

    // Envia o texto completo dividido em partes de até 4096 caracteres
    enviarTextoEmPartes(textoCompleto, message);
  }
}