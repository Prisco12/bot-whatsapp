import OpenAI from"openai"

const openai = new OpenAI({
  apiKey: "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",
});

export default async function assistent(message) {
  if (message.body.startsWith("!gpt ")) {
    const frase = message.body.replace("!gpt ", "");
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: frase }],
      model: "gpt-3.5-turbo",
    });
    await message.reply(completion.choices[0].message.content);
  }
  
}
