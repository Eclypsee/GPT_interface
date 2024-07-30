const express = require('express');
var cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
app.use(express.static('public'));

// Initialize OpenAI with the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/chatgpt', async (req, res) => {
    const userInput = req.body.prompt;

    if (!userInput) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: 'API key is missing' });
    }

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // Updated model name
            messages: [{ role: 'user', content: userInput }],
            max_tokens: 150,
        });

        const data = response.choices;
        if (data && data.length > 0) {
            res.json({ text: data[0].message.content.trim() });
        } else {
            res.status(500).json({ error: 'Invalid response from API' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
