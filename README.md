# 🎲 AI RPG - Virtual Game Master

An AI-powered tabletop RPG system that allows you to play solo adventures with an intelligent Game Master running entirely on your local machine.

## 🌟 Features

- **Solo RPG Experience**: Play tabletop RPGs by yourself with an AI Game Master
- **Local AI**: Runs completely offline using local AI models (Ollama)
- **Multilingual**: English and French interface with instant switching
- **Interactive Interface**: Modern web-based UI with chat, dice rolling, and character management
- **Rule Integration**: AI trained on RPG manuals, rules, and scenarios
- **Visual Elements**: Support for scene images and character artwork

## 🎯 Current Status

**Phase 1 - Prototype (In Progress)**
- ✅ Complete multilingual web interface
- ✅ Chat system with AI simulation
- ✅ Dice roller (d4, d6, d8, d10, d12, d20, d100)
- ✅ Character stats display
- ✅ Inventory and quest management
- 🔄 Backend server integration (Next)
- 🔄 Ollama AI integration (Next)

## 📁 Project Structure

```
jdr-ai/
├── frontend/
│   └── index.html          # Main interface
├── backend/                # Node.js server (Coming soon)
├── docs/                   # RPG manuals and extracted content
├── README.md
└── package.json
```

## 🚀 Quick Start

### Prerequisites

- Modern web browser
- Python 3.x or Node.js (for local server)
- 16GB+ RAM recommended for AI models

### Running the Interface

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd ai-rpg
   ```

2. **Open the interface**
   ```bash
   cd frontend
   # Option 1: Simple HTTP server with Python
   python -m http.server 8000
   
   # Option 2: Using Node.js
   npx serve .
   
   # Option 3: Direct file opening (limited functionality)
   # Just open frontend/index.html in your browser
   ```

3. **Access the application**
   - Open your browser and go to `http://localhost:8000`
   - Start interacting with the simulated AI Game Master!

## 🎮 How to Use

### Basic Gameplay
1. **Language Selection**: Choose between English (EN) and French (FR) using the buttons in the header
2. **Chat Interface**: Type your actions in the text input and press Send or Enter
3. **Dice Rolling**: Click on any die (d4-d100) to roll and see results
4. **Quick Actions**: Use preset buttons for common actions like examining surroundings
5. **Character Management**: View your character stats, inventory, and quests in the sidebar

### Current Limitations
- AI responses are currently simulated (basic context-aware responses)
- No persistent save system yet
- Limited to predefined character stats and inventory items

## 🛠️ Development Roadmap

### Phase 1: Basic Prototype (Current)
- [x] Complete web interface
- [x] Multilingual support
- [x] Node.js backend server
- [x] Ollama integration
- [x] Basic AI conversation

### Phase 2: Content Integration
- [ ] RPG manual processing (PDF extraction)
- [ ] Rule database creation
- [ ] Enhanced AI prompts with game knowledge
- [ ] Image management system

### Phase 3: Advanced Features  
- [ ] Character creation system
- [ ] Save/load game sessions
- [ ] Enhanced visual interface
- [ ] Combat system integration
- [ ] Multiple RPG system support

## 🧠 AI Integration (Planned)

The system will use **Ollama** to run local AI models such as:
- **Llama 3.1 8B**: Primary Game Master AI
- **Mistral 7B**: Alternative lightweight option
- **Custom fine-tuned models**: Specialized for specific RPG systems

## 🎨 Interface Features

### Responsive Design
- Works on desktop, tablet, and mobile devices
- Modern glassmorphism UI with dark theme
- Smooth animations and transitions

### Multilingual Support
- Instant language switching (EN/FR)
- All interface elements translated
- AI responses adapt to selected language

### Gaming Features
- **Chat System**: Conversation with AI Game Master
- **Dice Roller**: Full set of RPG dice with animation
- **Character Sheet**: Stats, HP, inventory management  
- **Scene Display**: Visual representation of current location
- **Quest Tracker**: Active and completed objectives

## 🔧 Technical Details

### Frontend
- **HTML5/CSS3/JavaScript**: Vanilla implementation, no frameworks
- **Responsive Grid Layout**: Modern CSS Grid and Flexbox
- **Local Storage**: Browser-based settings (future implementation)

### Backend (Planned)
- **Node.js/Express**: REST API server
- **Ollama Integration**: Local AI model management
- **SQLite Database**: Game data and character storage
- **PDF Processing**: Automatic RPG manual extraction

## 🤝 Contributing

This is currently a personal learning project, but suggestions and feedback are welcome!

### Areas for Contribution
- RPG rule system integration
- Additional language translations
- UI/UX improvements
- AI prompt engineering
- Testing and bug reports

## 📋 System Requirements

### Minimum
- 8GB RAM
- Modern web browser
- 10GB free disk space

### Recommended
- 16-32GB RAM (for AI models)
- NVIDIA GPU (optional, for faster AI inference)
- 50GB free disk space
- Fast SSD storage

## 📚 Supported RPG Systems (Planned)

- **D&D 5e**: Dungeons & Dragons Fifth Edition
- **Pathfinder**: 1e and 2e support
- **Call of Cthulhu**: Horror investigation RPG
- **Generic Systems**: Adaptable to custom rule sets

## 🐛 Known Issues

- Dice results may not display properly on very old browsers
- Mobile interface may have minor layout issues in landscape mode
- AI responses are currently simulated and not contextually deep

## 📝 License

This project is for educational and personal use. Please respect the intellectual property rights of RPG publishers when using their content.

## 📞 Support

For questions, suggestions, or bug reports:
- Create an issue in the project repository
- Check the project documentation
- Review the development roadmap for planned features

---

**Last Updated**: September 2025 
**Version**: 0.1.0 (Alpha)  
**Status**: Active Development