/**
 * 🧪 Chemistry Theme Vector Generator
 * Molecular structures, chemical apparatus, and reaction diagrams
 */

export class ChemistryVectorGenerator {
  constructor() {
    this.theme = 'chemistry';
  }

  /**
   * Generate a simple molecule (H2O example)
   */
  generateMolecule(x = 0, y = 0, size = 200, formula = 'H2O') {
    // Water molecule structure
    const oxygenX = x + size / 2;
    const oxygenY = y + size / 2;
    const bondLength = size * 0.35;
    const bondAngle = 104.5 * Math.PI / 180 / 2; // Water bond angle
    
    return `
      <g transform="translate(0, 0)">
        <!-- Bonds -->
        <line x1="${oxygenX}" y1="${oxygenY}" 
              x2="${oxygenX - bondLength * Math.sin(bondAngle)}" 
              y2="${oxygenY + bondLength * Math.cos(bondAngle)}" 
              stroke="#555" stroke-width="3"/>
        <line x1="${oxygenX}" y1="${oxygenY}" 
              x2="${oxygenX + bondLength * Math.sin(bondAngle)}" 
              y2="${oxygenY + bondLength * Math.cos(bondAngle)}" 
              stroke="#555" stroke-width="3"/>
        
        <!-- Oxygen atom -->
        <circle cx="${oxygenX}" cy="${oxygenY}" r="${size * 0.15}" 
                fill="#FF0000" stroke="#000" stroke-width="2"/>
        <text x="${oxygenX}" y="${oxygenY + 5}" font-size="${size * 0.1}" 
              text-anchor="middle" fill="#FFF" font-weight="bold">O</text>
        
        <!-- Hydrogen atoms -->
        <circle cx="${oxygenX - bondLength * Math.sin(bondAngle)}" 
                cy="${oxygenY + bondLength * Math.cos(bondAngle)}" 
                r="${size * 0.1}" fill="#FFFFFF" stroke="#000" stroke-width="2"/>
        <text x="${oxygenX - bondLength * Math.sin(bondAngle)}" 
              y="${oxygenY + bondLength * Math.cos(bondAngle) + 4}" 
              font-size="${size * 0.08}" text-anchor="middle" fill="#000" font-weight="bold">H</text>
        
        <circle cx="${oxygenX + bondLength * Math.sin(bondAngle)}" 
                cy="${oxygenY + bondLength * Math.cos(bondAngle)}" 
                r="${size * 0.1}" fill="#FFFFFF" stroke="#000" stroke-width="2"/>
        <text x="${oxygenX + bondLength * Math.sin(bondAngle)}" 
              y="${oxygenY + bondLength * Math.cos(bondAngle) + 4}" 
              font-size="${size * 0.08}" text-anchor="middle" fill="#000" font-weight="bold">H</text>
      </g>
    `;
  }

  /**
   * Generate a benzene ring
   */
  generateBenzeneRing(x = 0, y = 0, radius = 60) {
    const points = [];
    const innerRadius = radius * 0.6;
    
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI / 3) - Math.PI / 2;
      points.push([
        x + Math.cos(angle) * radius,
        y + Math.sin(angle) * radius
      ]);
    }
    
    return `
      <g>
        <!-- Outer hexagon (single bonds) -->
        ${points.map((point, i) => {
          const nextPoint = points[(i + 1) % 6];
          return `<line x1="${point[0]}" y1="${point[1]}" x2="${nextPoint[0]}" y2="${nextPoint[1]}" 
                        stroke="#000" stroke-width="3"/>`;
        }).join('')}
        
        <!-- Inner circle (representing delocalized electrons) -->
        <circle cx="${x}" cy="${y}" r="${innerRadius}" 
                fill="none" stroke="#000" stroke-width="2" stroke-dasharray="5,5"/>
        
        <!-- Carbon atoms -->
        ${points.map(point => 
          `<circle cx="${point[0]}" cy="${point[1]}" r="8" fill="#333" stroke="#000" stroke-width="1"/>`
        ).join('')}
      </g>
    `;
  }

  /**
   * Generate a beaker
   */
  generateBeaker(x = 0, y = 0, width = 100, height = 150, fillLevel = 0.6, liquidColor = '#4A90E2') {
    const topWidth = width * 0.9;
    const bottomWidth = width * 0.7;
    const fillHeight = height * fillLevel;
    
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Beaker body -->
        <path d="M ${(width - topWidth) / 2} 0 
                 L ${(width - bottomWidth) / 2} ${height} 
                 L ${(width + bottomWidth) / 2} ${height} 
                 L ${(width + topWidth) / 2} 0 Z" 
              fill="none" stroke="#000" stroke-width="3"/>
        
        <!-- Liquid -->
        <path d="M ${(width - topWidth) / 2 + 3} ${height - fillHeight} 
                 L ${(width - bottomWidth) / 2 + 3} ${height - 3} 
                 L ${(width + bottomWidth) / 2 - 3} ${height - 3} 
                 L ${(width + topWidth) / 2 - 3} ${height - fillHeight} Z" 
              fill="${liquidColor}" opacity="0.7" stroke="none"/>
        
        <!-- Volume markings -->
        ${Array.from({ length: 5 }, (_, i) => {
          const markY = height * (0.2 + i * 0.15);
          const markWidth = topWidth * 0.1;
          return `<line x1="${(width - topWidth) / 2}" y1="${markY}" 
                        x2="${(width - topWidth) / 2 + markWidth}" y2="${markY}" 
                        stroke="#000" stroke-width="1"/>`;
        }).join('')}
        
        <!-- Shine effect -->
        <ellipse cx="${width * 0.3}" cy="${height * 0.3}" rx="8" ry="15" 
                 fill="#FFF" opacity="0.4"/>
      </g>
    `;
  }

  /**
   * Generate a test tube
   */
  generateTestTube(x = 0, y = 0, width = 40, height = 120, fillLevel = 0.5, liquidColor = '#FF6B6B') {
    const fillHeight = height * fillLevel;
    
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Tube body -->
        <rect x="${width * 0.2}" y="0" width="${width * 0.6}" height="${height * 0.8}" 
              fill="none" stroke="#000" stroke-width="2" rx="5"/>
        
        <!-- Rounded bottom -->
        <ellipse cx="${width / 2}" cy="${height * 0.8}" rx="${width * 0.3}" ry="${width * 0.4}" 
                 fill="none" stroke="#000" stroke-width="2"/>
        
        <!-- Liquid -->
        <rect x="${width * 0.22}" y="${height * 0.8 - fillHeight}" 
              width="${width * 0.56}" height="${fillHeight}" 
              fill="${liquidColor}" opacity="0.7"/>
        
        <!-- Liquid bottom (rounded) -->
        <ellipse cx="${width / 2}" cy="${height * 0.8}" 
                 rx="${width * 0.28}" ry="${width * 0.38}" 
                 fill="${liquidColor}" opacity="0.7"/>
        
        <!-- Rim -->
        <ellipse cx="${width / 2}" cy="0" rx="${width * 0.3}" ry="${width * 0.15}" 
                 fill="none" stroke="#000" stroke-width="2"/>
      </g>
    `;
  }

  /**
   * Generate a flask (Erlenmeyer)
   */
  generateFlask(x = 0, y = 0, size = 120, fillLevel = 0.4, liquidColor = '#9B59B6') {
    const neckWidth = size * 0.2;
    const bodyWidth = size * 0.8;
    const neckHeight = size * 0.3;
    const bodyHeight = size * 0.7;
    
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Flask body -->
        <path d="M ${(bodyWidth - neckWidth) / 2} 0 
                 L ${(bodyWidth - neckWidth) / 2} ${neckHeight}
                 L 0 ${size}
                 L ${bodyWidth} ${size}
                 L ${(bodyWidth + neckWidth) / 2} ${neckHeight}
                 L ${(bodyWidth + neckWidth) / 2} 0" 
              fill="none" stroke="#000" stroke-width="3"/>
        
        <!-- Liquid -->
        <path d="M ${(bodyWidth - neckWidth) / 2 + 2} ${size - fillLevel * bodyHeight}
                 L ${fillLevel * bodyWidth * 0.15} ${size - 2}
                 L ${bodyWidth - fillLevel * bodyWidth * 0.15} ${size - 2}
                 L ${(bodyWidth + neckWidth) / 2 - 2} ${size - fillLevel * bodyHeight} Z" 
              fill="${liquidColor}" opacity="0.7"/>
        
        <!-- Neck rim -->
        <ellipse cx="${bodyWidth / 2}" cy="0" rx="${neckWidth / 2}" ry="${neckWidth * 0.3}" 
                 fill="none" stroke="#000" stroke-width="2"/>
        
        <!-- Highlight -->
        <ellipse cx="${bodyWidth * 0.3}" cy="${size * 0.5}" rx="10" ry="20" 
                 fill="#FFF" opacity="0.5"/>
      </g>
    `;
  }

  /**
   * Generate electron orbitals
   */
  generateOrbital(x = 0, y = 0, radius = 80, type = 's') {
    const centerX = x + radius;
    const centerY = y + radius;
    
    let orbitalSvg = `<g>`;
    
    // Nucleus
    orbitalSvg += `<circle cx="${centerX}" cy="${centerY}" r="10" fill="#FFD700" stroke="#000" stroke-width="2"/>`;
    
    switch (type) {
      case 's':
        // Spherical orbital
        orbitalSvg += `<circle cx="${centerX}" cy="${centerY}" r="${radius}" 
                              fill="none" stroke="#4A90E2" stroke-width="2" stroke-dasharray="5,5"/>`;
        break;
      case 'p':
        // Dumbbell shaped (simplified)
        orbitalSvg += `<ellipse cx="${centerX}" cy="${centerY - radius * 0.4}" 
                                rx="${radius * 0.4}" ry="${radius * 0.6}" 
                                fill="#4A90E2" opacity="0.3" stroke="#4A90E2" stroke-width="2"/>`;
        orbitalSvg += `<ellipse cx="${centerX}" cy="${centerY + radius * 0.4}" 
                                rx="${radius * 0.4}" ry="${radius * 0.6}" 
                                fill="#4A90E2" opacity="0.3" stroke="#4A90E2" stroke-width="2"/>`;
        break;
      case 'd':
        // Four-lobed (simplified)
        for (let i = 0; i < 4; i++) {
          const angle = (i * Math.PI / 2) + Math.PI / 4;
          const lobeX = centerX + Math.cos(angle) * radius * 0.5;
          const lobeY = centerY + Math.sin(angle) * radius * 0.5;
          orbitalSvg += `<ellipse cx="${lobeX}" cy="${lobeY}" 
                                  rx="${radius * 0.35}" ry="${radius * 0.25}" 
                                  transform="rotate(${angle * 180 / Math.PI} ${lobeX} ${lobeY})"
                                  fill="#9B59B6" opacity="0.3" stroke="#9B59B6" stroke-width="2"/>`;
        }
        break;
    }
    
    orbitalSvg += `</g>`;
    return orbitalSvg;
  }

  /**
   * Generate a complete chemistry lab scene
   */
  generateLabScene(width = 800, height = 600) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
        <!-- Background -->
        <rect width="${width}" height="${height}" fill="#F5F5F5"/>
        
        <!-- Lab bench -->
        <rect y="${height * 0.7}" width="${width}" height="${height * 0.3}" fill="#8B7355"/>
        
        <!-- Equipment -->
        ${this.generateBeaker(100, height * 0.4, 100, 180, 0.6, '#4A90E2')}
        ${this.generateTestTube(250, height * 0.45, 40, 150, 0.7, '#FF6B6B')}
        ${this.generateTestTube(310, height * 0.45, 40, 150, 0.5, '#00D084')}
        ${this.generateFlask(400, height * 0.35, 150, 0.4, '#9B59B6')}
        
        <!-- Molecular structure -->
        ${this.generateMolecule(580, height * 0.2, 150)}
        
        <!-- Benzene ring -->
        ${this.generateBenzeneRing(150, 120, 50)}
        
        <!-- Electron orbitals -->
        ${this.generateOrbital(580, 50, 60, 's')}
        
        <!-- Title -->
        <text x="${width / 2}" y="40" font-size="24" font-weight="bold" 
              text-anchor="middle" fill="#333">Chemistry Lab</text>
      </svg>
    `;
  }
}

export default ChemistryVectorGenerator;
