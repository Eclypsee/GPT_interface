const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pinecone: PineconeClient } = require('@pinecone-database/pinecone');
const OpenAI = require('openai');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize OpenAI with the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Pinecone client
const pinecone = new PineconeClient({
  apiKey: process.env.PINECONE_API_KEY
});
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);

// Route for ChatGPT
app.post('/api/chatgpt', async (req, res) => {
    const userInput = req.body.prompt;

    if (!userInput) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a chatbot that responds with only one word.' },
                { role: 'user', content: userInput }
            ],
            max_tokens: 1, // limit response to one word
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

// Route to create and store embeddings
app.post('/api/embed', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    try {
        // Generate embedding
        const response = await openai.embeddings.create({
            model: 'text-embedding-ada-002',
            input: text,
        });
        const embedding = response.data[0].embedding;

        // Store embedding in Pinecone
        const id = `embed-${Date.now()}`;
        await pineconeIndex.upsert({
            vectors: [
                {
                    id: id,
                    values: embedding,
                }
            ]
        });

        res.json({ message: 'Embedding stored successfully', id });
    } catch (error) {
        console.error('Error during embedding generation/storage:', error);
        res.status(500).json({ error: 'Failed to generate/store embedding' });
    }
});

// Route to query embeddings
app.post('/api/query', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    try {
        // Generate embedding for the query text
        const response = await openai.embeddings.create({
            model: 'text-embedding-ada-002',
            input: text,
        });
        const queryEmbedding = response.data[0].embedding;

        // Query Pinecone for similar embeddings
        const queryResponse = await pineconeIndex.query({
            vector: queryEmbedding,
            topK: 5,
        });

        res.json(queryResponse);
    } catch (error) {
        console.error('Error during embedding query:', error);
        res.status(500).json({ error: 'Failed to query embeddings' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
