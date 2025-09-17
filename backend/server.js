const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('frontend')); // Serve static files from frontend directory

// Game Master prompts
const GAME_MASTER_PROMPT = {
    en: `You are an expert RPG Game Master running a fantasy adventure game. You should:
- Create immersive, detailed descriptions of environments, NPCs, and situations
- Respond to player actions with consequences and narrative progression
- Ask for dice rolls when appropriate for actions with uncertain outcomes
- Maintain story consistency and remember previous events
- Be creative but fair in your responses
- Keep responses engaging but not overly long (2-4 sentences usually)
- When combat occurs, describe it cinematically

Current scenario: The player is exploring an ancient dungeon filled with mysteries and dangers.
Respond to their actions as a skilled Game Master would.

Player action: `,
    
    fr: `Tu es un Maître de Jeu expert dirigeant une aventure de jeu de rôle fantastique. Tu dois :
- Créer des descriptions immersives et détaillées des environnements, PNJ et situations
- Répondre aux actions du joueur avec des conséquences et une progression narrative
- Demander des jets de dés quand approprié pour des actions au résultat incertain
- Maintenir la cohérence de l'histoire et te souvenir des événements précédents
- Être créatif mais équitable dans tes réponses
- Garder les réponses engageantes mais pas trop longues (2-4 phrases généralement)
- Lors de combats, les décrire de manière cinématographique

Scénario actuel : Le joueur explore un donjon ancien rempli de mystères et de dangers.
Réponds à ses actions comme le ferait un Maître de Jeu expérimenté.

Action du joueur : `
};

// Store conversation history
let conversationHistory = new Map();

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Test Ollama connection
app.get('/api/test-ollama', async (req, res) => {
    try {
        const response = await axios.get(`${OLLAMA_URL}/api/tags`);
        res.json({ 
            status: 'Ollama connected', 
            models: response.data.models || [],
            timestamp: new Date().toISOString() 
        });
    } catch (error) {
        console.error('Ollama connection error:', error.message);
        res.status(500).json({ 
            error: 'Cannot connect to Ollama', 
            details: error.message,
            suggestion: 'Make sure Ollama is running with: ollama serve'
        });
    }
});

// Chat endpoint - main AI interaction
app.post('/api/chat', async (req, res) => {
    try {
        const { message, language = 'en', sessionId = 'default' } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Get or create conversation history for this session
        if (!conversationHistory.has(sessionId)) {
            conversationHistory.set(sessionId, []);
        }
        const history = conversationHistory.get(sessionId);

        // Build context from conversation history
        let contextMessages = '';
        if (history.length > 0) {
            contextMessages = '\n\nPrevious conversation:\n' + 
                history.slice(-6).map(entry => 
                    `Player: ${entry.player}\nGM: ${entry.ai}`
                ).join('\n') + '\n\nCurrent action:\n';
        }

        // Prepare the full prompt
        const fullPrompt = GAME_MASTER_PROMPT[language] + contextMessages + message;

        console.log(`[${sessionId}] Player (${language}):`, message);

        // Call Ollama API
        const ollamaResponse = await axios.post(`${OLLAMA_URL}/api/generate`, {
            model: 'llama3.1:8b', // Change this to your preferred model
            prompt: fullPrompt,
            stream: false,
            options: {
                temperature: 0.8,     // Creative but not too random
                top_p: 0.9,          // Focus on likely responses
                top_k: 40,           // Limit vocabulary choices
                max_tokens: 200      // Keep responses reasonably short
            }
        }, {
            timeout: 30000 // 30 second timeout
        });

        const aiResponse = ollamaResponse.data.response.trim();
        console.log(`[${sessionId}] AI Response:`, aiResponse);

        // Store in conversation history
        history.push({ player: message, ai: aiResponse });
        
        // Keep only last 10 exchanges to prevent memory buildup
        if (history.length > 10) {
            history.splice(0, history.length - 10);
        }

        res.json({ 
            response: aiResponse,
            timestamp: new Date().toISOString(),
            sessionId: sessionId
        });

    } catch (error) {
        console.error('Chat API error:', error.message);
        
        if (error.code === 'ECONNREFUSED') {
            res.status(503).json({ 
                error: 'AI service unavailable', 
                details: 'Cannot connect to Ollama. Make sure it\'s running.',
                suggestion: 'Run: ollama serve'
            });
        } else if (error.code === 'ENOTFOUND') {
            res.status(503).json({ 
                error: 'AI model not found', 
                details: 'The requested model may not be installed.',
                suggestion: 'Run: ollama pull llama3.1:8b'
            });
        } else {
            res.status(500).json({ 
                error: 'Internal server error', 
                details: error.message 
            });
        }
    }
});

// Dice rolling endpoint
app.post('/api/dice', (req, res) => {
    try {
        const { sides, count = 1, modifier = 0 } = req.body;

        if (!sides || sides < 2) {
            return res.status(400).json({ error: 'Invalid dice sides' });
        }

        if (count < 1 || count > 10) {
            return res.status(400).json({ error: 'Count must be between 1 and 10' });
        }

        const rolls = [];
        let total = 0;

        for (let i = 0; i < count; i++) {
            const roll = Math.floor(Math.random() * sides) + 1;
            rolls.push(roll);
            total += roll;
        }

        const finalTotal = total + modifier;

        res.json({
            rolls,
            total,
            modifier,
            finalTotal,
            formula: `${count}d${sides}${modifier >= 0 ? '+' : ''}${modifier !== 0 ? modifier : ''}`,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Dice API error:', error.message);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Character management endpoints
app.get('/api/character/:sessionId?', (req, res) => {
    const sessionId = req.params.sessionId || 'default';
    
    // For now, return default character data
    // Later this will be stored in a database
    const defaultCharacter = {
        name: 'Adventurer',
        level: 1,
        hitPoints: { current: 28, maximum: 35 },
        stats: {
            strength: 14,
            dexterity: 16,
            constitution: 13,
            intelligence: 15,
            wisdom: 12,
            charisma: 11
        },
        inventory: [
            { id: 1, name: 'Longsword', type: 'weapon', emoji: '⚔️' },
            { id: 2, name: 'Wooden shield', type: 'armor', emoji: '🛡️' },
            { id: 3, name: 'Healing potion', type: 'consumable', quantity: 3, emoji: '🧪' },
            { id: 4, name: 'Gold coins', type: 'currency', quantity: 50, emoji: '💰' },
            { id: 5, name: 'Mysterious key', type: 'quest', emoji: '🗝️' }
        ],
        quests: [
            { id: 1, name: 'Explore the cursed dungeon', status: 'active', emoji: '🎯' },
            { id: 2, name: 'Find the mysterious key', status: 'completed', emoji: '✅' }
        ],
        sessionId
    };

    res.json(defaultCharacter);
});

// Clear conversation history endpoint (useful for testing)
app.delete('/api/conversation/:sessionId', (req, res) => {
    const sessionId = req.params.sessionId;
    conversationHistory.delete(sessionId);
    res.json({ message: 'Conversation history cleared', sessionId });
});

// Get conversation history
app.get('/api/conversation/:sessionId', (req, res) => {
    const sessionId = req.params.sessionId;
    const history = conversationHistory.get(sessionId) || [];
    res.json({ history, sessionId });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🎲 RPG AI Server running on http://localhost:${PORT}`);
    console.log(`📡 Frontend available at http://localhost:${PORT}`);
    console.log(`🤖 Ollama connection: ${OLLAMA_URL}`);
    console.log('\n🔍 Available endpoints:');
    console.log('   GET  /api/health - Server health check');
    console.log('   GET  /api/test-ollama - Test AI connection');
    console.log('   POST /api/chat - Chat with AI Game Master');
    console.log('   POST /api/dice - Roll dice');
    console.log('   GET  /api/character/:sessionId - Get character data');
    console.log('   GET  /api/conversation/:sessionId - Get chat history');
    console.log('   DELETE /api/conversation/:sessionId - Clear chat history');
    console.log('\n🚀 Ready to play! Open your browser to get started.');
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down RPG AI Server...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down RPG AI Server...');
    process.exit(0);
});