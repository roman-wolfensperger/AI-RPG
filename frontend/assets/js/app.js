// API Configuration
const API_BASE = window.location.origin + '/api';
let sessionId = 'session_' + Date.now(); // Unique session ID

// Translations object with English as default
const translations = {
    en: {
        'title': '🎲 AI Game Master',
        'adventure-story': '📖 Adventure Story',
        'welcome-message': 'Welcome, adventurer! Your quest begins now...',
        'initial-scenario': 'You stand before the imposing gates of an ancient dungeon. Moss covers the stones and a strange glow emanates from within. What would you like to do?',
        'describe-action': 'Describe your action...',
        'send': 'Send',
        'quick-actions': '🎯 Quick Actions',
        'dice-roller': '🎲 Dice Roller',
        'click-dice': 'Click on a die to roll',
        'examine-surroundings': '🔍 Examine surroundings',
        'check-inventory': '🎒 Check inventory',
        'take-rest': '😴 Take a rest',
        'view-stats': '📊 View statistics',
        'character': '👤 Character',
        'strength': 'STRENGTH',
        'dexterity': 'DEXTERITY',
        'constitution': 'CONSTITUTION',
        'intelligence': 'INTELLIGENCE',
        'wisdom': 'WISDOM',
        'charisma': 'CHARISMA',
        'hit-points': 'HIT POINTS',
        'current-scene': '🖼️ Current Scene',
        'scene-image': 'Scene image',
        'ai-generated': '(will be AI generated)',
        'inventory': '🎒 Inventory',
        'longsword': '⚔️ Longsword',
        'wooden-shield': '🛡️ Wooden shield',
        'healing-potion': '🧪 Healing potion (x3)',
        'gold-coins': '💰 50 gold coins',
        'mysterious-key': '🗝️ Mysterious key',
        'quests': '📜 Quests',
        'explore-dungeon': '🎯 Explore the cursed dungeon',
        'find-key': '✅ Find the mysterious key',
        'examine-action': 'I carefully examine the surroundings',
        'inventory-action': 'I check my inventory',
        'rest-action': 'I take a moment to rest',
        'stats-action': 'I check my current statistics',
        'dice-roll': 'Roll of',
        'ai-thinking': 'AI is thinking...',
        'connection-error': 'Connection error. Please try again.',
        'server-error': 'Server error. Please check your connection.',
    },
    fr: {
        'title': '🎲 Maître de Jeu IA',
        'adventure-story': '📖 Récit de l\'Aventure',
        'welcome-message': 'Bienvenue, aventurier ! Votre quête commence maintenant...',
        'initial-scenario': 'Vous vous trouvez devant les portes imposantes d\'un ancien donjon. La mousse recouvre les pierres et une lueur étrange émane de l\'intérieur. Que souhaitez-vous faire ?',
        'describe-action': 'Décrivez votre action...',
        'send': 'Envoyer',
        'quick-actions': '🎯 Actions Rapides',
        'dice-roller': '🎲 Lanceur de Dés',
        'click-dice': 'Cliquez sur un dé pour lancer',
        'examine-surroundings': '🔍 Examiner les environs',
        'check-inventory': '🎒 Consulter l\'inventaire',
        'take-rest': '😴 Se reposer',
        'view-stats': '📊 Voir les caractéristiques',
        'character': '👤 Personnage',
        'strength': 'FORCE',
        'dexterity': 'DEXTÉRITÉ',
        'constitution': 'CONSTITUTION',
        'intelligence': 'INTELLIGENCE',
        'wisdom': 'SAGESSE',
        'charisma': 'CHARISME',
        'hit-points': 'POINTS DE VIE',
        'current-scene': '🖼️ Scène Actuelle',
        'scene-image': 'Image de la scène',
        'ai-generated': '(sera générée par l\'IA)',
        'inventory': '🎒 Inventaire',
        'longsword': '⚔️ Épée longue',
        'wooden-shield': '🛡️ Bouclier de bois',
        'healing-potion': '🧪 Potion de soin (x3)',
        'gold-coins': '💰 50 pièces d\'or',
        'mysterious-key': '🗝️ Clé mystérieuse',
        'quests': '📜 Quêtes',
        'explore-dungeon': '🎯 Explorer le donjon maudit',
        'find-key': '✅ Trouver la clé mystérieuse',
        'examine-action': 'J\'examine attentivement les environs',
        'inventory-action': 'Je consulte mon inventaire',
        'rest-action': 'Je prends un moment pour me reposer',
        'stats-action': 'Je vérifie mes caractéristiques actuelles',
        'dice-roll': 'Lancer de',
        'ai-thinking': 'L\'IA réfléchit...',
        'connection-error': 'Erreur de connexion. Veuillez réessayer.',
        'server-error': 'Erreur serveur. Vérifiez votre connexion.',
    }
};

// Current language - defaults to English
let currentLanguage = 'en';

// Global variables
let chatMessages = document.getElementById('chatMessages');
let chatInput = document.getElementById('chatInput');
let sendBtn = document.getElementById('sendBtn');
let diceResult = document.getElementById('diceResult');
let isAiResponding = false;

// API Helper Functions
async function apiCall(endpoint, method = 'GET', data = null) {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(API_BASE + endpoint, options);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `HTTP ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}

// Language switching function
function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update placeholder
    const chatInput = document.getElementById('chatInput');
    const placeholderKey = chatInput.getAttribute('data-i18n-placeholder');
    if (placeholderKey && translations[lang][placeholderKey]) {
        chatInput.placeholder = translations[lang][placeholderKey];
    }
    
    // Update document language
    document.documentElement.lang = lang;
    
    // Update dice result if it shows the default message
    const diceResult = document.getElementById('diceResult');
    if (diceResult.textContent.includes('Click') || diceResult.textContent.includes('Cliquez')) {
        diceResult.textContent = translations[lang]['click-dice'];
    }
}

// Function to add message to chat
function addMessage(text, sender = 'player') {
    const message = document.createElement('div');
    message.className = `message ${sender}`;
    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return message;
}

// Function to show AI thinking indicator
function showAiThinking() {
    const thinkingMsg = addMessage(translations[currentLanguage]['ai-thinking'], 'system');
    thinkingMsg.style.opacity = '0.7';
    return thinkingMsg;
}

// Function to call real AI
async function callAI(playerMessage) {
    if (isAiResponding) return;
    
    isAiResponding = true;
    const thinkingMsg = showAiThinking();

    try {
        const response = await apiCall('/chat', 'POST', {
            message: playerMessage,
            language: currentLanguage,
            sessionId: sessionId
        });

        // Remove thinking message
        thinkingMsg.remove();
        
        // Add AI response
        addMessage(response.response, 'ai');
        
    } catch (error) {
        console.error('AI call failed:', error);
        
        // Remove thinking message
        thinkingMsg.remove();
        
        // Show error message
        let errorMessage = translations[currentLanguage]['connection-error'];
        if (error.message.includes('AI service unavailable')) {
            errorMessage = 'AI service unavailable. Please make sure Ollama is running.';
        }
        
        addMessage(errorMessage, 'system');
    } finally {
        isAiResponding = false;
    }
}

// Message sending
async function sendMessage() {
    const text = chatInput.value.trim();
    if (text && !isAiResponding) {
        addMessage(text, 'player');
        chatInput.value = '';
        await callAI(text);
    }
}

// Event listeners for sending messages
sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Dice rolling function with API integration
async function rollDice(sides) {
    try {
        // Disable dice buttons during roll
        document.querySelectorAll('.dice-btn').forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.5';
        });

        const response = await apiCall('/dice', 'POST', {
            sides: sides,
            count: 1,
            modifier: 0
        });

        const result = response.rolls[0];
        diceResult.innerHTML = `<strong>d${sides}: ${result}</strong>`;
        
        // Add result to chat
        addMessage(`🎲 ${translations[currentLanguage]['dice-roll']} d${sides}: ${result}`, 'system');
        
        // Result animation
        diceResult.style.transform = 'scale(1.1)';
        setTimeout(() => {
            diceResult.style.transform = 'scale(1)';
        }, 200);

    } catch (error) {
        console.error('Dice roll failed:', error);
        diceResult.innerHTML = `<strong>Error rolling dice</strong>`;
    } finally {
        // Re-enable dice buttons
        setTimeout(() => {
            document.querySelectorAll('.dice-btn').forEach(btn => {
                btn.disabled = false;
                btn.style.opacity = '1';
            });
        }, 500);
    }
}

// Quick actions function
async function quickAction(action) {
    if (isAiResponding) return;
    
    let actionText = '';
    switch(action) {
        case 'examine':
            actionText = translations[currentLanguage]['examine-action'];
            break;
        case 'inventory':
            actionText = translations[currentLanguage]['inventory-action'];
            break;
        case 'rest':
            actionText = translations[currentLanguage]['rest-action'];
            break;
        case 'stats':
            actionText = translations[currentLanguage]['stats-action'];
            break;
    }
    
    if (actionText) {
        addMessage(actionText, 'player');
        await callAI(actionText);
    }
}

// Load character data from API
async function loadCharacterData() {
    try {
        const character = await apiCall(`/character/${sessionId}`);
        
        // Update character stats in the UI
        document.querySelector('[data-i18n="strength"]').nextElementSibling.textContent = character.stats.strength;
        document.querySelector('[data-i18n="dexterity"]').nextElementSibling.textContent = character.stats.dexterity;
        document.querySelector('[data-i18n="constitution"]').nextElementSibling.textContent = character.stats.constitution;
        document.querySelector('[data-i18n="intelligence"]').nextElementSibling.textContent = character.stats.intelligence;
        document.querySelector('[data-i18n="wisdom"]').nextElementSibling.textContent = character.stats.wisdom;
        document.querySelector('[data-i18n="charisma"]').nextElementSibling.textContent = character.stats.charisma;
        
        // Update hit points
        const hpElement = document.querySelector('[data-i18n="hit-points"]').nextElementSibling;
        hpElement.textContent = `${character.hitPoints.current}/${character.hitPoints.maximum}`;
        
    } catch (error) {
        console.error('Failed to load character data:', error);
    }
}

// Check server connection on load
async function checkServerConnection() {
    try {
        await apiCall('/health');
        console.log('✅ Server connection established');
        
        // Test Ollama connection
        try {
            await apiCall('/test-ollama');
            console.log('✅ Ollama AI connection established');
        } catch (ollamaError) {
            console.warn('⚠️ Ollama connection issue:', ollamaError.message);
            addMessage('⚠️ AI service not available. Please make sure Ollama is running.', 'system');
        }
        
    } catch (error) {
        console.error('❌ Server connection failed:', error);
        addMessage('❌ Server connection failed. Please check if the backend is running.', 'system');
    }
}

// Initialize application
async function initializeApp() {
    console.log('🎲 Initializing RPG AI Client...');
    console.log('📡 Session ID:', sessionId);
    
    // Check connections
    await checkServerConnection();
    
    // Load character data
    await loadCharacterData();
    
    // Auto-focus on input
    chatInput.focus();
    
    console.log('🚀 RPG AI Client ready!');
}

// Auto-focus on input when loading
window.addEventListener('load', () => {
    chatInput.focus();
});

// Entry animation
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
        initializeApp();
    }, 100);
});

// Prevent form submission on Enter (handled by keypress event)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target === chatInput) {
        e.preventDefault();
    }
});

// Handle browser refresh - warn user about losing session
window.addEventListener('beforeunload', (e) => {
    if (chatMessages.children.length > 2) { // More than initial messages
        e.preventDefault();
        e.returnValue = 'You will lose your current game session. Are you sure?';
    }
});

// Connection status indicator (optional enhancement)
function updateConnectionStatus(isConnected) {
    const header = document.querySelector('.header h1');
    if (isConnected) {
        header.style.color = '#4fc3f7';
        header.title = 'Connected to AI Game Master';
    } else {
        header.style.color = '#ff6b6b';
        header.title = 'Disconnected from AI Game Master';
    }
}

// Utility function to format dice notation (for future complex rolls)
function parseDiceNotation(notation) {
    // Parse strings like "2d6+3", "1d20", "3d8-1"
    const match = notation.match(/(\d+)?d(\d+)([+-]\d+)?/i);
    if (!match) return null;
    
    return {
        count: parseInt(match[1] || '1'),
        sides: parseInt(match[2]),
        modifier: parseInt(match[3] || '0')
    };
}

// Advanced dice rolling with notation support
async function rollDiceNotation(notation) {
    const diceData = parseDiceNotation(notation);
    if (!diceData) {
        console.error('Invalid dice notation:', notation);
        return;
    }
    
    try {
        const response = await apiCall('/dice', 'POST', diceData);
        
        diceResult.innerHTML = `<strong>${response.formula}: ${response.finalTotal}</strong>`;
        
        let rollDetails = '';
        if (response.rolls.length > 1) {
            rollDetails = ` (${response.rolls.join(', ')})`;
        }
        
        addMessage(`🎲 ${response.formula}: ${response.finalTotal}${rollDetails}`, 'system');
        
    } catch (error) {
        console.error('Advanced dice roll failed:', error);
        addMessage('❌ Dice roll failed', 'system');
    }
}

console.log('🎲 RPG AI Frontend loaded successfully!');