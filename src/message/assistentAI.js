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

