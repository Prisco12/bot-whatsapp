const aviso = `🤖 *Bot para WhatsApp - Funcionalidades:*

*Comandos*

*!audio:* Este comando permite transformar texto em áudio. Basta digitar !audio seguido do texto desejado, e o bot irá gerar um arquivo de áudio correspondente.
Ex: \`!audio\` aqui você escreve sua mensagem

*!avisos:* Com o comando !avisos, você pode mencionar todos os membros do grupo e exibir uma mensagem para todos. Basta digitar !avisos seguido da mensagem que deseja compartilhar com o grupo.
Ex: \`!avisos\` aqui você escreve sua mensagem

*!sticker:* Ao enviar uma imagem com a mensagem !sticker, o bot transformará automaticamente essa imagem em um sticker. Isso facilita o compartilhamento de adesivos personalizados no grupo.
Ex: *Img com a legenda* \`!sticker\`

*!ajuda:* Este comando fornece informações sobre as funcionalidades do bot. Ao digitar !ajuda, o bot exibirá uma lista de comandos disponíveis e uma breve descrição de cada um.
Ex: \`!ajuda\`

*!gpt:* Este comando permite que você converse com um assistente virtual, baseado no ChatGPT. Ele está disponível para responder a perguntas, fornecer informações e realizar tarefas dentro do grupo do WhatsApp.
Ex: \`!avisos\` aqui você escreve sua mensagem

‼️ *Informações sobre o Bot:* ‼️

*Transcrição Automática de Áudio:* O bot é capaz de transcrever automaticamente todo áudio recebido em texto. Isso garante que os membros do grupo possam facilmente entender o conteúdo dos áudios, mesmo sem ouvi-los.

*Verificação de Fotos de Visualização Única:* O bot verifica todas as fotos que são de visualização única e as envia de volta ao grupo.

*Recuperação de Mensagens Apagadas:* Sempre que uma mensagem de texto, imagem ou sticker é apagada no grupo, o bot consegue recuperar o conteúdo da mensagem excluída e exibi-la novamente. Isso proporciona uma experiência mais completa aos membros do grupo.

*Registro de Mensagens Editadas:* Quando uma mensagem é editada, o bot registra o conteúdo original da mensagem antes da edição, permitindo que os membros do grupo saibam o que foi alterado.`;

export default function avisos(message) {
  if (message.body.startsWith("!ajuda")) {
    message.reply(aviso)
  }
}
