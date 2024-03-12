const aviso = `🤖 *Bot para WhatsApp - Funcionalidades:*

*Comandos*

*!audio:* Este comando permite transformar texto em áudio. Basta digitar !audio seguido do texto desejado, e o bot irá gerar um arquivo de áudio correspondente.

*!avisos:* Com o comando !avisos, você pode mencionar todos os membros do grupo e exibir uma mensagem para todos. Basta digitar !avisos seguido da mensagem que deseja compartilhar com o grupo.

*!sticker:* Ao enviar uma imagem com a mensagem !sticker, o bot transformará automaticamente essa imagem em um sticker. Isso facilita o compartilhamento de adesivos personalizados no grupo.

*!ajuda:* Este comando fornece informações sobre as funcionalidades do bot. Ao digitar !ajuda, o bot exibirá uma lista de comandos disponíveis e uma breve descrição de cada um.

‼️ *Informações sobre o Bot:* ‼️

*Transcrição Automática de Áudio:* O bot é capaz de transcrever automaticamente todo áudio recebido em texto. Isso garante que os membros do grupo possam facilmente entender o conteúdo dos áudios, mesmo sem ouvi-los.

*Recuperação de Mensagens Apagadas:* Sempre que uma mensagem de texto, imagem ou sticker é apagada no grupo, o bot consegue recuperar o conteúdo da mensagem excluída e exibi-la novamente. Isso proporciona uma experiência mais completa aos membros do grupo.

*Registro de Mensagens Editadas:* Quando uma mensagem é editada, o bot registra o conteúdo original da mensagem antes da edição, permitindo que os membros do grupo saibam o que foi alterado.`;

export default function avisos(message) {
  if (message.body.startsWith("!ajuda")) {
    message.reply(aviso)
  }
}
