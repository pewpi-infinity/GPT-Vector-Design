# 🎨 GPT-Vector-Design: Theme-Adaptive Vector Graphics Engine

A comprehensive SVG vector graphics generation system with **11 unique themes**, interactive elements, and dynamic animations.

## 🚀 Features

### ✨ Core Capabilities
- **Real-time SVG Generation** - Dynamic vector graphics created on demand
- **11 Unique Themes** - From Mario to Mathematics, Space to Sports
- **Interactive Elements** - Clickable, draggable, and animated components
- **Character System** - Generate characters with multiple actions
- **Token Visualization** - 🧱Kris🔑 token networks and formula flows
- **Export Functions** - Save as SVG or JSON

### 🎨 Available Themes

#### 🍄 Mario Theme
Pixel-art style vector graphics featuring:
- Question blocks and brick blocks
- Power-ups (mushrooms, stars, fire flowers)
- Pipes and platforms
- Classic Mario elements

#### 🔌 Electronics Theme
Circuit board components including:
- Electronic symbols (resistors, capacitors, LEDs)
- IC chips and transistors
- Oscilloscope waveforms
- Breadboard layouts

#### 🧪 Chemistry Theme
Scientific visualizations:
- Molecular structures (H₂O, benzene rings)
- Lab equipment (beakers, flasks, test tubes)
- Electron orbitals
- Chemical apparatus

#### 📐 Mathematics Theme
Mathematical visualizations:
- 3D function graphs
- Geometric constructions
- Sierpinski fractals
- Unit circle with trigonometry

#### 🤖 Robotics Theme
Robotic systems:
- Robot schematics
- Gear systems
- Mechanical linkages
- Assembly lines
- Sensor icons

#### 🏗️ Construction Theme
Blueprint-style graphics:
- Building blueprints
- Construction equipment (cranes, bulldozers)
- Architectural columns
- Construction tools

#### 🎮 Pixel Art Theme
Retro gaming aesthetics:
- Pixel-art sprites
- Retro text rendering
- Gaming elements

#### 🚀 Space Theme
Cosmic visualizations:
- Planets (Earth, Mars, Saturn, Jupiter)
- Rockets and spacecraft
- Star fields
- Asteroids and nebulae

#### 🌿 Nature Theme
Natural elements:
- Trees (deciduous and pine)
- Flowers and butterflies
- Birds and clouds
- Sun and natural scenery

#### 🎵 Music Theme
Musical instruments and notation:
- Guitar and piano keyboard
- Musical notes and staff
- Drum kit
- Audio waveforms

#### ⚽ Sports Theme
Athletic elements:
- Sports balls (soccer, basketball, football)
- Tennis racket
- Trophy
- Sports fields

## 📁 Project Structure

```
gpt-vector-design/
├── .infinity/                    # Configuration directory
├── generators/                   # Theme-specific vector generators
│   ├── mario-vectors.js         # Mario theme
│   ├── electronics-vectors.js   # Electronics theme
│   ├── chemistry-vectors.js     # Chemistry theme
│   ├── mathematics-vectors.js   # Mathematics theme
│   ├── robotics-vectors.js      # Robotics theme
│   ├── construction-vectors.js  # Construction theme
│   ├── pixelart-vectors.js      # Pixel art theme
│   ├── space-vectors.js         # Space theme
│   ├── nature-vectors.js        # Nature theme
│   ├── music-vectors.js         # Music theme
│   ├── sports-vectors.js        # Sports theme
│   └── character-generator.js   # Character generation
├── templates/                    # SVG templates
│   ├── characters/              # Character templates
│   ├── components/              # Component templates
│   └── backgrounds/             # Background templates
├── interactive/                  # Interactive elements
│   ├── clickable-elements.js   # Click interactions
│   ├── draggable-components.js # Drag & drop
│   └── animated-vectors.js     # Animations
├── exports/                      # Export outputs
│   ├── svg/                     # SVG files
│   └── json/                    # JSON representations
├── gpt-vector-design.js         # Main engine
└── vector-gallery.html          # Demo gallery
```

## 🎯 Usage

### Basic Usage

```javascript
import VectorDesignEngine from './gpt-vector-design.js';

// Create engine instance
const engine = new VectorDesignEngine();

// Generate a scene for current theme
const svg = engine.generateScene(800, 600);

// Switch themes
engine.setTheme('space');
const spaceSvg = engine.generateScene(800, 600);

// Get available themes
const themes = engine.getAvailableThemes();
console.log(themes); // ['mario', 'electronics', 'chemistry', ...]
```

### Character Generation

```javascript
// Generate a character with action
const mario = engine.generateCharacter('mario', 'jumping', 100, 200, 120);
const luigi = engine.generateCharacter('luigi', 'waving', 300, 200, 120);
const robot = engine.generateCharacter('robot', 'standing', 500, 200, 120);
```

### Interactive Elements

```javascript
// Create clickable element
const clickableMushroom = engine.createClickableElement('mushroom', 100, 100, {
  size: 64,
  id: 'mushroom-1'
});

// Create draggable component
const draggableResistor = engine.createDraggableComponent('resistor', 200, 200, {
  size: 80,
  id: 'resistor-1'
});

// Create animated element
const animatedGear = engine.createAnimatedElement('gear', 300, 300, {
  radius: 50,
  teeth: 16,
  id: 'gear-1'
});
```

### Token Visualization

```javascript
// Generate token network visualization
const tokenNetwork = engine.generateTokenNetwork(600, 400);

// Generate formula flow diagram
const formulaFlow = engine.generateFormulaFlow(700, 500);
```

### Export Functions

```javascript
// Export as SVG
const svgExport = engine.exportSVG(svg, 'my-vector.svg');
// { content: '...', filename: 'my-vector.svg', mimeType: 'image/svg+xml' }

// Export as JSON
const jsonExport = engine.exportJSON('mario', 'full');
// { theme: 'mario', sceneType: 'full', timestamp: '...', ... }
```

## 🎮 Interactive Features

### Clickable Elements
- **Bounce Animation** - Elements bounce when clicked
- **Pulse Animation** - Pulsing opacity effect
- **Spin Animation** - 360° rotation
- **Grow Animation** - Scale up and down

### Draggable Components
- **Electronics** - Drag resistors, ICs, and other components
- **Chemistry** - Move molecules around
- **Circuit Building** - Create circuits by dragging components

### Animated Vectors
- **Rotating Gears** - Continuous rotation animations
- **Floating Elements** - Smooth up-and-down motion
- **Pulsing Hearts** - Rhythmic scaling
- **Color Morphing** - Smooth color transitions
- **Waveforms** - Animated sine waves

## 🧱 Token System

### Token Network Visualization
Displays **🧱Kris🔑 token networks** with:
- Interconnected token nodes
- Central Kris token (🔑)
- Animated pulse effects
- Network connections

### Formula Flow Diagrams
Shows semantic processing flow:
- Input → Tokenization → Analysis → Formula → Output
- Color-coded processing stages
- Connection labels
- Interactive flow paths

## 🎨 Theme Features

Each theme includes:
- **Scene Generation** - Complete themed scenes
- **Individual Elements** - Specific components
- **Color Schemes** - Theme-appropriate palettes
- **Stylistic Consistency** - Unified design language

## 🔧 Development

### Adding New Themes

1. Create a new generator in `generators/`:
```javascript
export class NewThemeVectorGenerator {
  constructor() {
    this.theme = 'newtheme';
  }
  
  generateScene(width, height) {
    return `<svg>...</svg>`;
  }
}
```

2. Register in main engine:
```javascript
import NewThemeVectorGenerator from './generators/newtheme-vectors.js';

this.generators = {
  // ... existing themes
  newtheme: new NewThemeVectorGenerator(),
};
```

### Creating Custom Elements

```javascript
// Add to appropriate generator
generateCustomElement(x, y, size, options) {
  return `
    <g transform="translate(${x}, ${y})">
      <!-- SVG content -->
    </g>
  `;
}
```

## 📋 Requirements

- Modern browser with ES6 module support
- SVG rendering capability
- JavaScript enabled

## 🎯 Use Cases

- **Educational** - Teaching science, math, and programming concepts
- **Gaming** - Retro game assets and sprites
- **Technical** - Circuit diagrams and schematics
- **Presentations** - Dynamic visual content
- **Web Design** - Scalable vector graphics
- **Data Visualization** - Charts and diagrams

## 🔮 Future Enhancements

- More themes (Fantasy, Underwater, Cyberpunk)
- Advanced animations (physics-based)
- 3D transformations
- SVG filter effects
- Real-time collaboration
- Theme morphing transitions

## 📜 License

This project is part of the Infinity ecosystem.

## 🤝 Contributing

Contributions welcome! Areas of interest:
- New theme generators
- Enhanced animations
- Additional interactive elements
- Performance optimizations
- Documentation improvements

## 📞 Contact

- Repository: GPT-Vector-Design
- Organization: pewpi-infinity
- Ecosystem: Infinity / Octave

---

**✅ ADDITIVE ONLY** - All features are additions to the existing system  
**🎨 All 11 Themes Supported** - Mario, Electronics, Chemistry, Mathematics, Robotics, Construction, Pixel Art, Space, Nature, Music, Sports  
**🧱 Token Visualization** - 🧱Kris🔑 networks and formula flows included
