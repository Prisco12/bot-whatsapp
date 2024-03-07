const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

class Funcoes {
    msghitter(msgR, msgH){
        client.on('message', async (message) => {
            if (message.body === `!${msgR}`) {
                await client.sendMessage(message.from, msgH);
            }
        });
        
    }

 
}

const client = new Client();

const funcoes = new Funcoes()


function main () {

    client.on('qr', (qr) => {
        qrcode.generate(qr, { small: true });
    });

    client.on('ready', () => {
        console.log('Client is ready!');
    });

    funcoes.msghitter('ping','pong')

    client.initialize()
}

main()


