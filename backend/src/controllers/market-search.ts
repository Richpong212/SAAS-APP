import { Request, Response } from 'express';
import axios from 'axios';

export const marketSearch = async (req: Request, res: Response) => {
    const {  description } = req.body;
    
    // Construct the content based on the input provided
    const content = `Perform market research on the following description using cents model from unscripted: ${description}`;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: content,
                },
            ],
            max_tokens: 150,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            }
        });

        return res.json({
            message: 'Market research result',
            data: response.data.choices[0].message.content
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
