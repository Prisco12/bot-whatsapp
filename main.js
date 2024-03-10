import qrcode from 'qrcode-terminal';
import pkg from 'whatsapp-web.js';
const { Client, LocalAuth, MessageMedia, Events, Globals} = pkg;


import Funcoes from './scripts.js';
process.env.GOOGLE_APPLICATION_CREDENTIALS = 'composed-region-416600-af6bc7913fdc.json'; // Set the path to your Google Cloud service account key.


const funcoes = Funcoes

const client = new Client({
  authStrategy: new LocalAuth({
      dataPath: 'yourFolderName'
  }),
  puppeteer: {
		args: ['--no-sandbox'],
	}
});

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
        if (message.type == 'ptt' || message.type == 'audio') {
          const media = await message.downloadMedia()
          const data = await funcoes.trans(media)
          await message.reply(data)
         
         }
     });

    client.on('message', async (message) => {
        if (message.body.startsWith('!audio ')){
            const frase = message.body.replace('!audio ', '')
            try {    
                const audioPath = await funcoes.viraAudio(frase, message) // Caminho do arquivo de �udio
                const chat = await message.getChat();
                const audio = MessageMedia.fromFilePath(audioPath);
                await chat.sendMessage(audio, { sendAudioAsVoice: true })
             } catch (error) {
                 console.error('Erro ao gerar ou enviar o áudio:', error);
             }
        }
    });


    client.on('message', async (message) => {
        if(message.type == 'image'){
        const imagem = await message.downloadMedia()
        if (message.body.startsWith('!sticker')) {
            const stickerMedia = new MessageMedia('image/jpeg', imagem.data, 'image.jpeg' );
            client.sendMessage(message.from, stickerMedia, {sendMediaAsSticker: true});
        }
        }
    })

    const sentMessages = new Map();

    client.on('message', async (msg) => {
         // Armazena a mensagem enviada no mapa 
         sentMessages.set(msg.timestamp, {body: msg.body});
    });
     
    client.on('message_revoke_everyone', async (revokedMsg) => {
         const revokedMsgId = revokedMsg.timestamp;
         // Verifica se a mensagem revogada está no mapa
         if (sentMessages.has(revokedMsgId)) {
             const originalMsg = sentMessages.get(revokedMsgId);
             // Reenvia a mensagem revogada
             await revokedMsg.reply(`Deus Está vendo 👀\n\nMensagem Apagada: " ${originalMsg.body} "`);
         }
    });

    


   
    funcoes.msghitter('ping','pong')
    
    funcoes.msghitter('pong','ping')

    client.initialize()
}

main()