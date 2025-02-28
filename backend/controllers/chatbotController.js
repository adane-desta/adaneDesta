import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  
});

const chatWithAI = async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", 
      messages: [
        { role: 'user', content: `You are a veterinary expert. Here is the question: ${message}` }
      ],
    });

    const botResponse = completion.choices[0].message.content;
    res.json({ message: botResponse });
  } catch (error) {
    console.error('Error generating completion:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
};

export default { chatWithAI };
