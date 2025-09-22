import { CohereClientV2 } from 'cohere-ai';

const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY!,
});

export async function queryCohere(prompt: string) {
  const fallbackResponse = `
1. Learn the basics of the field.
2. Build small projects to practice.
3. Contribute to open source or community projects.
4. Apply for internships or freelance work.
`;

  try {
    const response = await cohere.chat({
      model: 'command-a-03-2025',
      messages: [{ role: 'user', content: prompt }],
    });

    // Safely extract text
    const message = response.message;
    if (message?.content && message.content.length > 0) {
      const textItem = message.content.find(item => 'text' in item);
      if (textItem && 'text' in textItem) {
        return textItem.text;
      }
    }

    return fallbackResponse;
  } catch (err) {
    console.error('Cohere API error:', err);
    return fallbackResponse;
  }
}
