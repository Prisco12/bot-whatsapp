import OpenAI from"openai"
import fs from "fs";




const openai = new OpenAI({
    apiKey: "sk-None-7CQ4TJ3j0qq8xjmaev8DT3BlbkFJrpy4Vlq4DbpEMx9rJEc1",
});


export default async function newSpeech(message) {
    if (message.type == "ptt" || message.type == "audio") {
        const media = await message.downloadMedia();
        const data = await funcoes.trans(media);
        await message.reply(data);

        const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream("/path/to/file/speech.mp3"),
            model: "whisper-1",
            response_format: "text",
          });
      }
  
}

