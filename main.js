const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');


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


const funcoes = new Funcoes()


function main () {

    client.on('qr', (qr) => {
        qrcode.generate(qr, { small: true });
    });

    client.on('ready', () => {
        console.log('Client is ready!');
    });

    funcoes.msghitter('ping','pong')
    funcoes.msghitter('pong','ping')

    client.initialize()
}

main()


