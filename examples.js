/**
 * Quick Start Examples for GPT-Vector-Design
 * Copy these examples to get started quickly
 */

// ============================================
// Example 1: Basic Scene Generation
// ============================================

import VectorDesignEngine from './gpt-vector-design.js';

const engine = new VectorDesignEngine();

// Generate Mario scene
const marioScene = engine.generateScene(800, 600);
document.getElementById('canvas').innerHTML = marioScene;


// ============================================
// Example 2: Theme Switching
// ============================================

// Switch to different themes
engine.setTheme('space');
const spaceScene = engine.generateScene(800, 600);

engine.setTheme('chemistry');
const chemScene = engine.generateScene(800, 600);

engine.setTheme('robotics');
const robotScene = engine.generateScene(800, 600);


// ============================================
// Example 3: Character Generation
// ============================================

// Generate Mario jumping
const marioJumping = engine.generateCharacter('mario', 'jumping', 200, 300, 100);

// Generate Luigi waving
const luigiWaving = engine.generateCharacter('luigi', 'waving', 400, 300, 100);

// Generate Robot standing
const robotStanding = engine.generateCharacter('robot', 'standing', 600, 300, 120);

// Combine in a scene
const characterScene = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
    <rect width="800" height="600" fill="#87CEEB"/>
    ${marioJumping}
    ${luigiWaving}
    ${robotStanding}
  </svg>
`;


// ============================================
// Example 4: Interactive Elements
// ============================================

// Clickable mushroom
const clickableMushroom = engine.createClickableElement('mushroom', 100, 100, {
  size: 64,
  id: 'mushroom-1'
});

// Draggable resistor
const draggableResistor = engine.createDraggableComponent('resistor', 300, 200, {
  size: 80,
  id: 'resistor-1'
});

// Animated gear
const animatedGear = engine.createAnimatedElement('gear', 500, 300, {
  radius: 50,
  teeth: 16,
  id: 'gear-1'
});

// Combine interactive elements
const interactiveScene = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
    <rect width="800" height="600" fill="#1A1A2E"/>
    ${clickableMushroom}
    ${draggableResistor}
    ${animatedGear}
  </svg>
`;


// ============================================
// Example 5: Token Visualizations
// ============================================

// Generate token network
const tokenNetwork = engine.generateTokenNetwork(600, 400);
document.getElementById('token-viz').innerHTML = tokenNetwork;

// Generate formula flow
const formulaFlow = engine.generateFormulaFlow(700, 500);
document.getElementById('formula-viz').innerHTML = formulaFlow;


// ============================================
// Example 6: Custom Multi-Theme Scene
// ============================================

function generateMultiThemeGallery() {
  const themes = engine.getAvailableThemes();
  let gallery = '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">';
  
  themes.forEach(theme => {
    engine.setTheme(theme);
    const scene = engine.generateScene(300, 200);
    gallery += `
      <div style="border: 2px solid #ddd; border-radius: 10px; padding: 10px;">
        <h3 style="text-align: center;">${theme}</h3>
        ${scene}
      </div>
    `;
  });
  
  gallery += '</div>';
  return gallery;
}

document.getElementById('gallery').innerHTML = generateMultiThemeGallery();


// ============================================
// Example 7: Export Functions
// ============================================

// Export current scene as SVG
engine.setTheme('mario');
const scene = engine.generateScene(800, 600);
const svgExport = engine.exportSVG(scene, 'mario-scene.svg');

// Create download link
const blob = new Blob([svgExport.content], { type: svgExport.mimeType });
const url = URL.createObjectURL(blob);
const link = document.createElement('a');
link.href = url;
link.download = svgExport.filename;
link.click();

// Export as JSON
const jsonExport = engine.exportJSON('mario', 'full');
console.log(jsonExport);


// ============================================
// Example 8: Custom Combined Scene
// ============================================

function createCustomScene() {
  engine.setTheme('nature');
  
  // Combine multiple elements
  const scene = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <!-- Sky background -->
      <rect width="800" height="600" fill="url(#skyGradient)"/>
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#B0E0E6;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Characters -->
      ${engine.generateCharacter('mario', 'running', 100, 400, 80)}
      ${engine.generateCharacter('luigi', 'jumping', 300, 350, 80)}
      
      <!-- Interactive elements -->
      ${engine.createClickableElement('mushroom', 500, 450, { size: 48 })}
      ${engine.createAnimatedElement('star', 650, 200, { size: 60 })}
      
      <!-- Ground -->
      <rect y="500" width="800" height="100" fill="#2ECC71"/>
    </svg>
  `;
  
  return scene;
}


// ============================================
// Example 9: Theme-Specific Element Access
// ============================================

// Access specific generator
engine.setTheme('electronics');
const electronicsGen = engine.getCurrentGenerator();

// Generate specific electronic components
const resistor = electronicsGen.generateResistor(100, 100, 80, '10kΩ');
const capacitor = electronicsGen.generateCapacitor(200, 100, 60, '100μF');
const led = electronicsGen.generateLED(300, 100, 60, '#FF0000');

// Combine into circuit
const circuit = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 300">
    <rect width="500" height="300" fill="#0A4D2E"/>
    ${resistor}
    ${capacitor}
    ${led}
    <!-- Add connection traces -->
    <line x1="180" y1="100" x2="200" y2="100" stroke="#FFD700" stroke-width="3"/>
    <line x1="260" y1="100" x2="300" y2="100" stroke="#FFD700" stroke-width="3"/>
  </svg>
`;


// ============================================
// Example 10: Animation Control
// ============================================

// Create animated scene with controls
function createAnimatedDemo() {
  const animVectors = engine.animatedVectors;
  
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="#1A1A2E"/>
      
      ${animVectors.generateAnimatedGear(200, 200, 60, 16, 'gear1')}
      ${animVectors.generateFloatingMushroom(400, 200, 64, 'mushroom1')}
      ${animVectors.generatePulsingHeart(600, 200, 80, 'heart1')}
      ${animVectors.generateSpinningStar(200, 400, 70, 'star1')}
      ${animVectors.generateColorMolecule(500, 400, 100, 'molecule1')}
      
      <text x="400" y="50" font-size="24" text-anchor="middle" fill="#FFF">
        Animated Vector Gallery
      </text>
    </svg>
  `;
}


// ============================================
// Quick Tips
// ============================================

/*
1. All generators support standard SVG syntax
2. Elements can be combined in any order
3. Use CSS/JS for additional interactivity
4. Export functions work with all themes
5. Custom styling can be applied post-generation
6. Interactive elements include built-in event handlers
7. Animations use native SVG animations
8. All coordinates are in SVG units
9. Themes can be switched at runtime
10. Scale elements by adjusting size parameters
*/
