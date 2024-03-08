const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');
const speech = require('@google-cloud/speech');
const client2 = new speech.SpeechClient();

process.env.GOOGLE_APPLICATION_CREDENTIALS = 'composed-region-416600-af6bc7913fdc.json'; // Set the path to your Google Cloud service account key.



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
 
}

async function trans(audioName) {
    // Creates a client
  const client2 = new speech.SpeechClient();
  // The path to the remote LINEAR16 file
  const filename = audioName;
  const file = fs.readFileSync(filename)
  const audioBytes = file.toString('base64')

  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
  const audio = {
    content: audioBytes
  };
  const config = {
    encoding: 'MP3',
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
  console.log(`Transcription: ${transcription}`);
  client.on('message', async (message) => {
        await client.sendMessage(message.from, transcription);
});
}


const funcoes = new Funcoes()


function main () {

    client.on('qr', (qr) => {
        qrcode.generate(qr, { small: true });
    });

    client.on('ready', () => {
        console.log('Client is ready!');
    });

    client.on('message', (message) => {
        console.log(message.body);
    });

    client.on('message', async (message) => {
        if (message.hasMedia) {
          const media = await message.downloadMedia()
  
          const audioBytes = media.data

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
          console.log(`Transcription: ${transcription}`);
        
          await message.reply(transcription)
        
            
         }
     });

    funcoes.msghitter('ping','pong')
    
    funcoes.msghitter('pong','ping')

    client.initialize()
}

main()