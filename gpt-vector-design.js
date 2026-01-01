/**
 * GPT Vector Design Engine
 * Main engine that orchestrates all vector generation systems
 */

import MarioVectorGenerator from './generators/mario-vectors.js';
import ElectronicsVectorGenerator from './generators/electronics-vectors.js';
import ChemistryVectorGenerator from './generators/chemistry-vectors.js';
import MathematicsVectorGenerator from './generators/mathematics-vectors.js';
import RoboticsVectorGenerator from './generators/robotics-vectors.js';
import ConstructionVectorGenerator from './generators/construction-vectors.js';
import PixelArtVectorGenerator from './generators/pixelart-vectors.js';
import SpaceVectorGenerator from './generators/space-vectors.js';
import NatureVectorGenerator from './generators/nature-vectors.js';
import MusicVectorGenerator from './generators/music-vectors.js';
import SportsVectorGenerator from './generators/sports-vectors.js';
import CharacterVectorGenerator from './generators/character-generator.js';
import ClickableElements from './interactive/clickable-elements.js';
import DraggableComponents from './interactive/draggable-components.js';
import AnimatedVectors from './interactive/animated-vectors.js';

/**
 * Main Vector Design Engine
 */
export class VectorDesignEngine {
  constructor() {
    this.generators = {
      mario: new MarioVectorGenerator(),
      electronics: new ElectronicsVectorGenerator(),
      chemistry: new ChemistryVectorGenerator(),
      mathematics: new MathematicsVectorGenerator(),
      robotics: new RoboticsVectorGenerator(),
      construction: new ConstructionVectorGenerator(),
      pixelart: new PixelArtVectorGenerator(),
      space: new SpaceVectorGenerator(),
      nature: new NatureVectorGenerator(),
      music: new MusicVectorGenerator(),
      sports: new SportsVectorGenerator(),
    };

    this.characterGenerator = new CharacterVectorGenerator();
    this.clickableElements = new ClickableElements();
    this.draggableComponents = new DraggableComponents();
    this.animatedVectors = new AnimatedVectors();

    this.currentTheme = 'mario';
  }

  /**
   * Get list of available themes
   */
  getAvailableThemes() {
    return Object.keys(this.generators);
  }

  /**
   * Set current theme
   */
  setTheme(themeName) {
    if (this.generators[themeName]) {
      this.currentTheme = themeName;
      return true;
    }
    return false;
  }

  /**
   * Get current theme generator
   */
  getCurrentGenerator() {
    return this.generators[this.currentTheme];
  }

  /**
   * Generate a scene for the current theme
   */
  generateScene(width = 800, height = 600) {
    const generator = this.getCurrentGenerator();
    
    // Each generator has a method to generate a full scene
    if (typeof generator.generateScene === 'function') {
      return generator.generateScene(width, height);
    } else if (typeof generator.generateMarioScene === 'function') {
      return generator.generateMarioScene(width, height);
    } else if (typeof generator.generateCircuitBoard === 'function') {
      return generator.generateCircuitBoard(width, height);
    } else if (typeof generator.generateLabScene === 'function') {
      return generator.generateLabScene(width, height);
    } else if (typeof generator.generateMathScene === 'function') {
      return generator.generateMathScene(width, height);
    } else if (typeof generator.generateRoboticsScene === 'function') {
      return generator.generateRoboticsScene(width, height);
    } else if (typeof generator.generateConstructionScene === 'function') {
      return generator.generateConstructionScene(width, height);
    } else if (typeof generator.generatePixelScene === 'function') {
      return generator.generatePixelScene(width, height);
    } else if (typeof generator.generateSpaceScene === 'function') {
      return generator.generateSpaceScene(width, height);
    } else if (typeof generator.generateNatureScene === 'function') {
      return generator.generateNatureScene(width, height);
    } else if (typeof generator.generateMusicScene === 'function') {
      return generator.generateMusicScene(width, height);
    } else if (typeof generator.generateSportsScene === 'function') {
      return generator.generateSportsScene(width, height);
    }
    
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
      <rect width="${width}" height="${height}" fill="#f0f0f0"/>
      <text x="${width / 2}" y="${height / 2}" text-anchor="middle" font-size="24">
        Scene generation not available for ${this.currentTheme}
      </text>
    </svg>`;
  }

  /**
   * Generate a character
   */
  generateCharacter(character = 'mario', action = 'standing', x = 0, y = 0, size = 100) {
    return this.characterGenerator.generateCharacter(character, action, x, y, size);
  }

  /**
   * Create an interactive clickable element
   */
  createClickableElement(elementType = 'mushroom', x = 0, y = 0, options = {}) {
    switch (elementType) {
      case 'mushroom':
        return this.clickableElements.generateClickableMushroom(
          x, y, options.size || 64, options.id || 'clickable-mushroom'
        );
      case 'button':
        return this.clickableElements.generateClickableButton(
          x, y, options.width || 150, options.height || 50, 
          options.text || 'Click Me', options.id || 'clickable-btn'
        );
      default:
        return this.clickableElements.generateClickableMushroom(x, y);
    }
  }

  /**
   * Create a draggable component
   */
  createDraggableComponent(componentType = 'resistor', x = 0, y = 0, options = {}) {
    switch (componentType) {
      case 'resistor':
        return this.draggableComponents.generateDraggableResistor(
          x, y, options.size || 80, options.id || 'drag-resistor'
        );
      case 'ic':
        return this.draggableComponents.generateDraggableIC(
          x, y, options.width || 100, options.height || 60, options.id || 'drag-ic'
        );
      case 'molecule':
        return this.draggableComponents.generateDraggableMolecule(
          x, y, options.size || 80, options.id || 'drag-molecule'
        );
      default:
        return this.draggableComponents.generateDraggableResistor(x, y);
    }
  }

  /**
   * Create an animated element
   */
  createAnimatedElement(animType = 'gear', x = 0, y = 0, options = {}) {
    switch (animType) {
      case 'gear':
        return this.animatedVectors.generateAnimatedGear(
          x, y, options.radius || 50, options.teeth || 12, options.id || 'anim-gear'
        );
      case 'mushroom':
        return this.animatedVectors.generateFloatingMushroom(
          x, y, options.size || 64, options.id || 'float-mushroom'
        );
      case 'heart':
        return this.animatedVectors.generatePulsingHeart(
          x, y, options.size || 80, options.id || 'pulse-heart'
        );
      case 'star':
        return this.animatedVectors.generateSpinningStar(
          x, y, options.size || 60, options.id || 'spin-star'
        );
      default:
        return this.animatedVectors.generateAnimatedGear(x, y);
    }
  }

  /**
   * Generate token visualization (🧱Kris🔑 token networks)
   */
  generateTokenNetwork(width = 600, height = 400) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
        <defs>
          <radialGradient id="tokenGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#FFD700;stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:#FFA500;stop-opacity:0" />
          </radialGradient>
        </defs>
        
        <!-- Background -->
        <rect width="${width}" height="${height}" fill="#1A1A2E"/>
        
        <!-- Network connections -->
        ${Array.from({ length: 15 }, (_, i) => {
          const x1 = 100 + Math.random() * (width - 200);
          const y1 = 100 + Math.random() * (height - 200);
          const x2 = 100 + Math.random() * (width - 200);
          const y2 = 100 + Math.random() * (height - 200);
          return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
                        stroke="#42A5F5" stroke-width="1" opacity="0.3"/>`;
        }).join('')}
        
        <!-- Token nodes -->
        ${Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const x = width / 2 + Math.cos(angle) * (width * 0.3);
          const y = height / 2 + Math.sin(angle) * (height * 0.3);
          return `
            <g>
              <circle cx="${x}" cy="${y}" r="30" fill="url(#tokenGlow)"/>
              <circle cx="${x}" cy="${y}" r="25" fill="#FFD700" stroke="#FFA500" stroke-width="2"/>
              <text x="${x}" y="${y + 5}" font-size="20" font-weight="bold" 
                    text-anchor="middle" fill="#000">🧱</text>
            </g>
          `;
        }).join('')}
        
        <!-- Central Kris token -->
        <g>
          <circle cx="${width / 2}" cy="${height / 2}" r="50" fill="url(#tokenGlow)"/>
          <circle cx="${width / 2}" cy="${height / 2}" r="45" 
                  fill="#FF6B6B" stroke="#C0392B" stroke-width="3"/>
          <text x="${width / 2}" y="${height / 2 + 8}" font-size="32" font-weight="bold" 
                text-anchor="middle" fill="#FFF">🔑</text>
        </g>
        
        <!-- Title -->
        <text x="${width / 2}" y="30" font-size="20" font-weight="bold" 
              text-anchor="middle" fill="#FFF">🧱Kris🔑 Token Network</text>
        
        <!-- Animated pulse -->
        <circle cx="${width / 2}" cy="${height / 2}" r="50" 
                fill="none" stroke="#FF6B6B" stroke-width="2" opacity="0.6">
          <animate attributeName="r" values="50; 80; 50" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.6; 0; 0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
      </svg>
    `;
  }

  /**
   * Generate formula flow diagram
   */
  generateFormulaFlow(width = 700, height = 500) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
        <!-- Background -->
        <rect width="${width}" height="${height}" fill="#ECEFF1"/>
        
        <!-- Flow nodes -->
        <g id="input-node">
          <rect x="50" y="100" width="120" height="60" fill="#4CAF50" stroke="#000" stroke-width="2" rx="10"/>
          <text x="110" y="135" font-size="16" font-weight="bold" text-anchor="middle" fill="#FFF">INPUT</text>
        </g>
        
        <g id="process-node-1">
          <rect x="250" y="50" width="140" height="60" fill="#2196F3" stroke="#000" stroke-width="2" rx="10"/>
          <text x="320" y="85" font-size="14" font-weight="bold" text-anchor="middle" fill="#FFF">TOKENIZE</text>
        </g>
        
        <g id="process-node-2">
          <rect x="250" y="150" width="140" height="60" fill="#2196F3" stroke="#000" stroke-width="2" rx="10"/>
          <text x="320" y="185" font-size="14" font-weight="bold" text-anchor="middle" fill="#FFF">ANALYZE</text>
        </g>
        
        <g id="formula-node">
          <rect x="470" y="100" width="140" height="60" fill="#FF9800" stroke="#000" stroke-width="2" rx="10"/>
          <text x="540" y="135" font-size="14" font-weight="bold" text-anchor="middle" fill="#FFF">FORMULA</text>
        </g>
        
        <g id="output-node">
          <rect x="470" y="250" width="140" height="60" fill="#9C27B0" stroke="#000" stroke-width="2" rx="10"/>
          <text x="540" y="285" font-size="16" font-weight="bold" text-anchor="middle" fill="#FFF">OUTPUT</text>
        </g>
        
        <!-- Flow arrows -->
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#333"/>
          </marker>
        </defs>
        
        <line x1="170" y1="130" x2="250" y2="80" stroke="#333" stroke-width="3" marker-end="url(#arrowhead)"/>
        <line x1="170" y1="130" x2="250" y2="180" stroke="#333" stroke-width="3" marker-end="url(#arrowhead)"/>
        <line x1="390" y1="80" x2="470" y2="130" stroke="#333" stroke-width="3" marker-end="url(#arrowhead)"/>
        <line x1="390" y1="180" x2="470" y2="130" stroke="#333" stroke-width="3" marker-end="url(#arrowhead)"/>
        <line x1="540" y1="160" x2="540" y2="250" stroke="#333" stroke-width="3" marker-end="url(#arrowhead)"/>
        
        <!-- Labels on connections -->
        <text x="210" y="100" font-size="12" fill="#666">data</text>
        <text x="210" y="170" font-size="12" fill="#666">context</text>
        <text x="430" y="100" font-size="12" fill="#666">semantic</text>
        <text x="430" y="170" font-size="12" fill="#666">structured</text>
        <text x="550" y="210" font-size="12" fill="#666">result</text>
        
        <!-- Title -->
        <text x="${width / 2}" y="30" font-size="22" font-weight="bold" 
              text-anchor="middle" fill="#333">Formula Flow Diagram</text>
        
        <!-- Legend -->
        <g transform="translate(50, 370)">
          <rect width="200" height="100" fill="#FFF" stroke="#333" stroke-width="1" rx="5"/>
          <text x="10" y="20" font-size="14" font-weight="bold" fill="#333">Legend:</text>
          <rect x="10" y="30" width="30" height="15" fill="#4CAF50" rx="3"/>
          <text x="45" y="42" font-size="12" fill="#333">Input/Output</text>
          <rect x="10" y="50" width="30" height="15" fill="#2196F3" rx="3"/>
          <text x="45" y="62" font-size="12" fill="#333">Processing</text>
          <rect x="10" y="70" width="30" height="15" fill="#FF9800" rx="3"/>
          <text x="45" y="82" font-size="12" fill="#333">Computation</text>
        </g>
      </svg>
    `;
  }

  /**
   * Export SVG to file
   */
  exportSVG(svg, filename = 'vector-graphic.svg') {
    return {
      content: svg,
      filename: filename,
      mimeType: 'image/svg+xml'
    };
  }

  /**
   * Export to JSON representation
   */
  exportJSON(themeName, sceneType = 'full') {
    return {
      theme: themeName,
      sceneType: sceneType,
      timestamp: new Date().toISOString(),
      generator: this.currentTheme,
      availableThemes: this.getAvailableThemes()
    };
  }
}

export default VectorDesignEngine;
