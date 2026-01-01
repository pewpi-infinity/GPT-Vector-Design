/**
 * 🔌 Electronics Theme Vector Generator
 * Circuit boards, components, and electronic schematics
 */

export class ElectronicsVectorGenerator {
  constructor() {
    this.theme = 'electronics';
  }

  /**
   * Generate a resistor symbol
   */
  generateResistor(x = 0, y = 0, size = 80, value = '1kΩ') {
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Leads -->
        <line x1="0" y1="${size / 2}" x2="${size * 0.2}" y2="${size / 2}" 
              stroke="#666" stroke-width="2"/>
        <line x1="${size * 0.8}" y1="${size / 2}" x2="${size}" y2="${size / 2}" 
              stroke="#666" stroke-width="2"/>
        <!-- Body -->
        <rect x="${size * 0.2}" y="${size * 0.3}" width="${size * 0.6}" height="${size * 0.4}" 
              fill="#E8D4A0" stroke="#000" stroke-width="2"/>
        <!-- Color bands -->
        <rect x="${size * 0.3}" y="${size * 0.25}" width="${size * 0.05}" height="${size * 0.5}" fill="#8B4513"/>
        <rect x="${size * 0.45}" y="${size * 0.25}" width="${size * 0.05}" height="${size * 0.5}" fill="#000"/>
        <rect x="${size * 0.6}" y="${size * 0.25}" width="${size * 0.05}" height="${size * 0.5}" fill="#FF0000"/>
        <!-- Label -->
        <text x="${size / 2}" y="${size * 0.9}" font-size="${size * 0.15}" 
              text-anchor="middle" fill="#000" font-family="monospace">${value}</text>
      </g>
    `;
  }

  /**
   * Generate a capacitor symbol
   */
  generateCapacitor(x = 0, y = 0, size = 60, value = '100μF') {
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Leads -->
        <line x1="0" y1="${size / 2}" x2="${size * 0.4}" y2="${size / 2}" 
              stroke="#666" stroke-width="2"/>
        <line x1="${size * 0.6}" y1="${size / 2}" x2="${size}" y2="${size / 2}" 
              stroke="#666" stroke-width="2"/>
        <!-- Plates -->
        <line x1="${size * 0.4}" y1="${size * 0.2}" x2="${size * 0.4}" y2="${size * 0.8}" 
              stroke="#000" stroke-width="3"/>
        <line x1="${size * 0.6}" y1="${size * 0.2}" x2="${size * 0.6}" y2="${size * 0.8}" 
              stroke="#000" stroke-width="3"/>
        <!-- Label -->
        <text x="${size / 2}" y="${size * 1.1}" font-size="${size * 0.2}" 
              text-anchor="middle" fill="#000" font-family="monospace">${value}</text>
      </g>
    `;
  }

  /**
   * Generate an LED symbol
   */
  generateLED(x = 0, y = 0, size = 60, color = '#FF0000') {
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Leads -->
        <line x1="${size * 0.5}" y1="0" x2="${size * 0.5}" y2="${size * 0.3}" 
              stroke="#666" stroke-width="2"/>
        <line x1="${size * 0.5}" y1="${size * 0.7}" x2="${size * 0.5}" y2="${size}" 
              stroke="#666" stroke-width="2"/>
        <!-- Diode triangle -->
        <polygon points="${size * 0.5},${size * 0.3} ${size * 0.3},${size * 0.7} ${size * 0.7},${size * 0.7}" 
                 fill="${color}" stroke="#000" stroke-width="2" opacity="0.7"/>
        <!-- Bar -->
        <line x1="${size * 0.3}" y1="${size * 0.3}" x2="${size * 0.7}" y2="${size * 0.3}" 
              stroke="#000" stroke-width="3"/>
        <!-- Light rays -->
        <line x1="${size * 0.7}" y1="${size * 0.4}" x2="${size * 0.85}" y2="${size * 0.25}" 
              stroke="${color}" stroke-width="2" opacity="0.6"/>
        <line x1="${size * 0.7}" y1="${size * 0.5}" x2="${size * 0.9}" y2="${size * 0.35}" 
              stroke="${color}" stroke-width="2" opacity="0.6"/>
      </g>
    `;
  }

  /**
   * Generate an IC chip
   */
  generateIC(x = 0, y = 0, width = 100, height = 60, pins = 8, label = '555') {
    const pinsPerSide = pins / 2;
    const pinSpacing = height / (pinsPerSide + 1);
    
    let icSvg = `<g transform="translate(${x}, ${y})">`;
    
    // Chip body
    icSvg += `<rect width="${width}" height="${height}" fill="#1a1a1a" stroke="#000" stroke-width="2" rx="5"/>`;
    
    // Notch at top
    icSvg += `<circle cx="${width / 2}" cy="0" r="8" fill="#1a1a1a" stroke="#000" stroke-width="2"/>`;
    
    // Pins - left side
    for (let i = 0; i < pinsPerSide; i++) {
      const y = pinSpacing * (i + 1);
      icSvg += `<rect x="-10" y="${y - 3}" width="10" height="6" fill="#C0C0C0" stroke="#666" stroke-width="1"/>`;
    }
    
    // Pins - right side
    for (let i = 0; i < pinsPerSide; i++) {
      const y = pinSpacing * (i + 1);
      icSvg += `<rect x="${width}" y="${y - 3}" width="10" height="6" fill="#C0C0C0" stroke="#666" stroke-width="1"/>`;
    }
    
    // Label
    icSvg += `<text x="${width / 2}" y="${height / 2 + 6}" font-size="14" font-weight="bold"
                   text-anchor="middle" fill="#FFF" font-family="monospace">${label}</text>`;
    
    icSvg += `</g>`;
    return icSvg;
  }

  /**
   * Generate a transistor symbol
   */
  generateTransistor(x = 0, y = 0, size = 80) {
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Base -->
        <line x1="0" y1="${size / 2}" x2="${size * 0.3}" y2="${size / 2}" 
              stroke="#666" stroke-width="2"/>
        <line x1="${size * 0.3}" y1="${size * 0.2}" x2="${size * 0.3}" y2="${size * 0.8}" 
              stroke="#000" stroke-width="3"/>
        <!-- Collector -->
        <line x1="${size * 0.3}" y1="${size * 0.3}" x2="${size * 0.7}" y2="${size * 0.1}" 
              stroke="#666" stroke-width="2"/>
        <line x1="${size * 0.7}" y1="${size * 0.1}" x2="${size * 0.7}" y2="0" 
              stroke="#666" stroke-width="2"/>
        <!-- Emitter -->
        <line x1="${size * 0.3}" y1="${size * 0.7}" x2="${size * 0.7}" y2="${size * 0.9}" 
              stroke="#666" stroke-width="2"/>
        <line x1="${size * 0.7}" y1="${size * 0.9}" x2="${size * 0.7}" y2="${size}" 
              stroke="#666" stroke-width="2"/>
        <!-- Arrow -->
        <polygon points="${size * 0.65},${size * 0.85} ${size * 0.7},${size * 0.9} ${size * 0.6},${size * 0.92}" 
                 fill="#666"/>
        <!-- Circle -->
        <circle cx="${size * 0.5}" cy="${size / 2}" r="${size * 0.35}" 
                fill="none" stroke="#000" stroke-width="2"/>
      </g>
    `;
  }

  /**
   * Generate an oscilloscope waveform
   */
  generateWaveform(x = 0, y = 0, width = 400, height = 200, waveType = 'sine') {
    const centerY = height / 2;
    const amplitude = height * 0.4;
    const points = [];
    
    for (let i = 0; i <= width; i += 2) {
      let yPos;
      const phase = (i / width) * Math.PI * 4;
      
      switch (waveType) {
        case 'sine':
          yPos = centerY + Math.sin(phase) * amplitude;
          break;
        case 'square':
          yPos = centerY + (Math.sin(phase) > 0 ? amplitude : -amplitude);
          break;
        case 'sawtooth':
          yPos = centerY + ((phase % (Math.PI * 2)) / (Math.PI * 2) - 0.5) * amplitude * 2;
          break;
        default:
          yPos = centerY;
      }
      
      points.push(`${i},${yPos}`);
    }
    
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Grid background -->
        <rect width="${width}" height="${height}" fill="#0a0a0a" stroke="#00FF00" stroke-width="2"/>
        
        <!-- Grid lines -->
        ${Array.from({ length: 9 }, (_, i) => {
          const gridX = (width / 8) * i;
          return `<line x1="${gridX}" y1="0" x2="${gridX}" y2="${height}" stroke="#00FF00" stroke-width="0.5" opacity="0.3"/>`;
        }).join('')}
        ${Array.from({ length: 5 }, (_, i) => {
          const gridY = (height / 4) * i;
          return `<line x1="0" y1="${gridY}" x2="${width}" y2="${gridY}" stroke="#00FF00" stroke-width="0.5" opacity="0.3"/>`;
        }).join('')}
        
        <!-- Center line -->
        <line x1="0" y1="${centerY}" x2="${width}" y2="${centerY}" stroke="#00FF00" stroke-width="1" opacity="0.5"/>
        
        <!-- Waveform -->
        <polyline points="${points.join(' ')}" fill="none" stroke="#00FF00" stroke-width="2"/>
      </g>
    `;
  }

  /**
   * Generate a breadboard layout
   */
  generateBreadboard(x = 0, y = 0, rows = 10, cols = 30) {
    const holeSize = 8;
    const spacing = 12;
    const width = cols * spacing + spacing;
    const height = rows * spacing + spacing * 3;
    
    let breadboard = `<g transform="translate(${x}, ${y})">`;
    
    // Board background
    breadboard += `<rect width="${width}" height="${height}" fill="#F5E6D3" stroke="#8B7355" stroke-width="3" rx="5"/>`;
    
    // Power rails (top)
    breadboard += `<line x1="${spacing}" y1="${spacing * 0.7}" x2="${width - spacing}" y2="${spacing * 0.7}" 
                         stroke="#FF0000" stroke-width="2"/>`;
    breadboard += `<line x1="${spacing}" y1="${spacing * 1.3}" x2="${width - spacing}" y2="${spacing * 1.3}" 
                         stroke="#0000FF" stroke-width="2"/>`;
    
    // Holes
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const holeX = spacing + col * spacing;
        const holeY = spacing * 2.5 + row * spacing;
        breadboard += `<circle cx="${holeX}" cy="${holeY}" r="${holeSize / 2}" fill="#000" opacity="0.3"/>`;
      }
    }
    
    breadboard += `</g>`;
    return breadboard;
  }

  /**
   * Generate a complete circuit board scene
   */
  generateCircuitBoard(width = 800, height = 600) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
        <!-- PCB background -->
        <rect width="${width}" height="${height}" fill="#0A4D2E"/>
        
        <!-- Circuit traces -->
        <line x1="100" y1="150" x2="300" y2="150" stroke="#FFD700" stroke-width="3"/>
        <line x1="300" y1="150" x2="300" y2="300" stroke="#FFD700" stroke-width="3"/>
        <line x1="300" y1="300" x2="500" y2="300" stroke="#FFD700" stroke-width="3"/>
        
        <!-- Components -->
        ${this.generateResistor(120, 120, 80, '10kΩ')}
        ${this.generateCapacitor(320, 130, 60, '100μF')}
        ${this.generateLED(420, 270, 60, '#FF0000')}
        ${this.generateIC(550, 250, 100, 80, 8, '555')}
        ${this.generateTransistor(200, 320, 80)}
        
        <!-- Oscilloscope waveform -->
        ${this.generateWaveform(50, 400, 300, 150, 'sine')}
        
        <!-- Via holes -->
        ${Array.from({ length: 20 }, (_, i) => {
          const viaX = 100 + Math.random() * (width - 200);
          const viaY = 50 + Math.random() * (height - 100);
          return `<circle cx="${viaX}" cy="${viaY}" r="4" fill="#FFD700" stroke="#000" stroke-width="1"/>`;
        }).join('')}
      </svg>
    `;
  }
}

export default ElectronicsVectorGenerator;
