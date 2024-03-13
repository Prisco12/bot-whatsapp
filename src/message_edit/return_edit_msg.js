import { sentMessages } from "../message/saving_msg.js";
console.log(sentMessages);
export default async function return_edit_msg(messageEdit) {
  const messageEditID = messageEdit.timestamp;

  if (sentMessages.has(messageEditID)) {
    const originalMsg = sentMessages.get(messageEditID);
    // Reenvia a mensagem revogada
    if (originalMsg.type == "chat") {
      await messageEdit.reply(
        `Deus Está vendo 👀\n\nMensagem Editada: " ${originalMsg.body} "`
      );
    }
  }
}
