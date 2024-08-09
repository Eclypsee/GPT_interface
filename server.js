const express = require('express');
const OpenAI = require('openai');
const axios = require('axios');
const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
var cors = require('cors');

app.use(cors());
app.use(express.json());

// Specify where the static frontend files are locateds
app.use(express.static(path.join(__dirname, 'client/build')));
//app.use('/', express.static(path.join(__dirname, 'public')))

// Initialize OpenAI with the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Endpoint to download and cache a codebase
app.post('/api/download', async (req, res) => {
    const { url } = req.body;
  
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
  
    try {
      const response = await axios({
        url,
        method: 'GET',
        responseType: 'arraybuffer'
      });
  
      const zip = new AdmZip(response.data);
      const extractPath = path.join(__dirname, 'codebases', path.basename(url, '.zip'));
      zip.extractAllTo(extractPath, true);
  
      res.json({ message: 'Codebase downloaded and extracted', path: extractPath });
    } catch (error) {
      console.error('Error downloading codebase:', error);
      res.status(500).json({ error: 'Failed to download codebase' });
    }
});

// Send a request to the ChatGPT API
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

module.exports = app;