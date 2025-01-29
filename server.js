import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post('/generate-poster', async (req, res) => {
    try {
        const { movieTitle, artStyle } = req.body;
        
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: `Create a movie poster for "${movieTitle}" in ${artStyle} style. Make it dramatic and cinematic.`,
            n: 1,
            size: "1024x1024",
        });

        res.json({ imageUrl: response.data[0].url });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to generate image' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 