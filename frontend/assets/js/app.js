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
        // Action responses
        'examine-action': 'I carefully examine the surroundings',
        'inventory-action': 'I check my inventory',
        'rest-action': 'I take a moment to rest',
        'stats-action': 'I check my current statistics',
        'dice-roll': 'Roll of',
        // AI responses
        'ai-door-response': 'You approach the door. It seems ancient and heavy, with strange engravings. You hear a slight creaking...',
        'ai-examine-response': 'Examining carefully, you notice interesting details...',
        'ai-enter-response': 'You push the door which opens with an ominous creak. Cold air envelops you...',
        'ai-random-responses': [
            'Your action has unexpected consequences...',
            'The environment reacts to your presence...',
            'Something catches your attention in the distance...',
            'You sense that the adventure is just beginning...'
        ]
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
        // Action responses
        'examine-action': 'J\'examine attentivement les environs',
        'inventory-action': 'Je consulte mon inventaire',
        'rest-action': 'Je prends un moment pour me reposer',
        'stats-action': 'Je vérifie mes caractéristiques actuelles',
        'dice-roll': 'Lancer de',
        // AI responses
        'ai-door-response': 'Vous vous approchez de la porte. Elle semble ancienne et lourde, avec des gravures étranges. Vous entendez un léger grincement...',
        'ai-examine-response': 'En examinant attentivement, vous remarquez des détails intéressants...',
        'ai-enter-response': 'Vous poussez la porte qui s\'ouvre dans un grincement sinistre. L\'air froid vous enveloppe...',
        'ai-random-responses': [
            'Votre action a des conséquences inattendues...',
            'L\'environnement réagit à votre présence...',
            'Quelque chose attire votre attention au loin...',
            'Vous sentez que l\'aventure ne fait que commencer...'
        ]
    }
};

// Current language - defaults to English
let currentLanguage = 'en';

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
    if (diceResult.textContent === translations[currentLanguage === 'en' ? 'fr' : 'en']['click-dice']) {
        diceResult.textContent = translations[lang]['click-dice'];
    }
}

// Global variables
let chatMessages = document.getElementById('chatMessages');
let chatInput = document.getElementById('chatInput');
let sendBtn = document.getElementById('sendBtn');
let diceResult = document.getElementById('diceResult');

// Function to add message to chat
function addMessage(text, sender = 'player') {
    const message = document.createElement('div');
    message.className = `message ${sender}`;
    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to simulate AI response
function simulateAIResponse(playerMessage) {
    setTimeout(() => {
        let response = "I'm processing your action...";
        
        if (playerMessage.toLowerCase().includes('door') || playerMessage.toLowerCase().includes('porte')) {
            response = translations[currentLanguage]['ai-door-response'];
        } else if (playerMessage.toLowerCase().includes('examine') || playerMessage.toLowerCase().includes('examiner')) {
            response = translations[currentLanguage]['ai-examine-response'];
        } else if (playerMessage.toLowerCase().includes('enter') || playerMessage.toLowerCase().includes('entrer')) {
            response = translations[currentLanguage]['ai-enter-response'];
        } else {
            const responses = translations[currentLanguage]['ai-random-responses'];
            response = responses[Math.floor(Math.random() * responses.length)];
        }
        
        addMessage(response, 'ai');
    }, 1000 + Math.random() * 2000);
}

// Message sending
function sendMessage() {
    const text = chatInput.value.trim();
    if (text) {
        addMessage(text, 'player');
        chatInput.value = '';
        simulateAIResponse(text);
    }
}

// Event listeners for sending messages
sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Dice rolling function
function rollDice(sides) {
    const result = Math.floor(Math.random() * sides) + 1;
    diceResult.innerHTML = `<strong>d${sides}: ${result}</strong>`;
    
    // Add result to chat
    addMessage(`🎲 ${translations[currentLanguage]['dice-roll']} d${sides}: ${result}`, 'system');
    
    // Result animation
    diceResult.style.transform = 'scale(1.1)';
    setTimeout(() => {
        diceResult.style.transform = 'scale(1)';
    }, 200);
}

// Quick actions function
function quickAction(action) {
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
        simulateAIResponse(actionText);
    }
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
    }, 100);
});