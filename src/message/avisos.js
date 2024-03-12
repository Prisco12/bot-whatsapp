export default async function avisos(message) {
  if (message.body.startsWith("!avisos ")) {
    const frase = message.body.replace("!avisos ", "");
    const chat = await message.getChat();

    let mentions = [];

    for (let participant of chat.participants) {
      mentions.push(`${participant.id.user}@c.us`);
    }

    await chat.sendMessage(`Avisos: "${frase}"`, { mentions });
  }
}
