import { SpeechClient } from '@google-cloud/speech'
import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import gTTS from 'gtts'

const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: 'yourFolderName'
    })
  });

class Funcoes {
    msghitter(msgR, msgH){
        client.on('message', async (message) => {
            if (message.body === `!${msgR}`) {
                await client.sendMessage(message.from, msgH);
            }
        });
        
    }

    async trans(audioName) {
        
        const client2 = new SpeechClient();
        // Creates a client
        const audioBytes = audioName.data
    
        // The audio file's encoding, sample rate in hertz, and BCP-47 language code
        const audio = {
          content: audioBytes
        };
        const config = {
          encoding: 'OGG_OPUS',
          sampleRateHertz: 16000,
          languageCode: 'pt-BR',
        };
        const request = {
          audio: audio,
          config: config,
        };
    
        // Detects speech in the audio file
        const [response] = await client2.recognize(request);
        const transcription = response.results
          .map(result => result.alternatives[0].transcript)
          .join('\n');
    
        return transcription
        
    }

    async viraAudio(frase, message){
      return new Promise((resolve, reject) => {
        const gtts = new gTTS(frase, 'pt-br');
        const audioPath = './voz.mp3';
    
        gtts.save(audioPath, function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(audioPath);
          }
        });
      });
      
    }
 
}

export default new Funcoes()