/**
 * 🏗️ Construction Theme Vector Generator
 * Blueprint drawings, architectural elements, and construction equipment
 */

export class ConstructionVectorGenerator {
  constructor() {
    this.theme = 'construction';
  }

  /**
   * Generate a blueprint grid background
   */
  generateBlueprintGrid(x = 0, y = 0, width = 800, height = 600, gridSize = 20) {
    const lines = [];
    
    // Vertical lines
    for (let i = 0; i <= width; i += gridSize) {
      const isMainLine = i % (gridSize * 5) === 0;
      lines.push(`<line x1="${x + i}" y1="${y}" x2="${x + i}" y2="${y + height}" 
                        stroke="${isMainLine ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)'}" 
                        stroke-width="${isMainLine ? 1 : 0.5}"/>`);
    }
    
    // Horizontal lines
    for (let i = 0; i <= height; i += gridSize) {
      const isMainLine = i % (gridSize * 5) === 0;
      lines.push(`<line x1="${x}" y1="${y + i}" x2="${x + width}" y2="${y + i}" 
                        stroke="${isMainLine ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)'}" 
                        stroke-width="${isMainLine ? 1 : 0.5}"/>`);
    }
    
    return `
      <g>
        <rect x="${x}" y="${y}" width="${width}" height="${height}" fill="#0A4C8C"/>
        ${lines.join('')}
      </g>
    `;
  }

  /**
   * Generate a simple building blueprint
   */
  generateBuildingBlueprint(x = 0, y = 0, width = 300, height = 400) {
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Outer walls -->
        <rect x="0" y="0" width="${width}" height="${height}" 
              fill="none" stroke="#FFF" stroke-width="3"/>
        
        <!-- Interior walls -->
        <line x1="0" y1="${height * 0.5}" x2="${width}" y2="${height * 0.5}" 
              stroke="#FFF" stroke-width="2"/>
        <line x1="${width * 0.5}" y1="0" x2="${width * 0.5}" y2="${height * 0.5}" 
              stroke="#FFF" stroke-width="2"/>
        
        <!-- Doors -->
        <g>
          <!-- Door 1 -->
          <rect x="${width * 0.45}" y="${height * 0.5 - 5}" width="${width * 0.1}" height="5" 
                fill="none" stroke="#FFF" stroke-width="1"/>
          <path d="M ${width * 0.5} ${height * 0.5} Q ${width * 0.5 + 30} ${height * 0.5 - 15} ${width * 0.5} ${height * 0.5 - 30}" 
                stroke="#FFF" stroke-width="1" fill="none" stroke-dasharray="2,2"/>
          
          <!-- Door 2 -->
          <rect x="${width * 0.45}" y="${height - 5}" width="${width * 0.1}" height="5" 
                fill="none" stroke="#FFF" stroke-width="1"/>
          <path d="M ${width * 0.5} ${height} Q ${width * 0.5 + 30} ${height - 15} ${width * 0.5} ${height - 30}" 
                stroke="#FFF" stroke-width="1" fill="none" stroke-dasharray="2,2"/>
        </g>
        
        <!-- Windows -->
        <rect x="${width * 0.1}" y="${height * 0.15}" width="${width * 0.3}" height="${height * 0.2}" 
              fill="none" stroke="#FFF" stroke-width="2"/>
        <line x1="${width * 0.25}" y1="${height * 0.15}" x2="${width * 0.25}" y2="${height * 0.35}" 
              stroke="#FFF" stroke-width="1"/>
        
        <rect x="${width * 0.6}" y="${height * 0.15}" width="${width * 0.3}" height="${height * 0.2}" 
              fill="none" stroke="#FFF" stroke-width="2"/>
        <line x1="${width * 0.75}" y1="${height * 0.15}" x2="${width * 0.75}" y2="${height * 0.35}" 
              stroke="#FFF" stroke-width="1"/>
        
        <!-- Dimensions -->
        <g stroke="#FFD700" stroke-width="1" fill="#FFD700" font-size="12" font-family="monospace">
          <line x1="${-20}" y1="0" x2="${-20}" y2="${height}" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
          <text x="${-35}" y="${height / 2}" transform="rotate(-90, ${-35}, ${height / 2})" 
                text-anchor="middle">${height}mm</text>
          
          <line x1="0" y1="${height + 20}" x2="${width}" y2="${height + 20}" 
                marker-start="url(#arrow)" marker-end="url(#arrow)"/>
          <text x="${width / 2}" y="${height + 35}" text-anchor="middle">${width}mm</text>
        </g>
      </g>
    `;
  }

  /**
   * Generate a crane
   */
  generateCrane(x = 0, y = 0, height = 300, armLength = 250) {
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Base -->
        <rect x="-30" y="${height - 40}" width="60" height="40" fill="#FF9800" stroke="#000" stroke-width="2"/>
        <polygon points="-40,${height - 40} 40,${height - 40} 30,${height - 60} -30,${height - 60}" 
                 fill="#F57C00" stroke="#000" stroke-width="2"/>
        
        <!-- Tower -->
        <rect x="-15" y="0" width="30" height="${height - 40}" fill="#FFB74D" stroke="#000" stroke-width="2"/>
        
        <!-- Cabin -->
        <rect x="-25" y="${height - 120}" width="50" height="40" fill="#1976D2" stroke="#000" stroke-width="2" rx="3"/>
        <rect x="-20" y="${height - 115}" width="15" height="15" fill="#64B5F6" stroke="#000" stroke-width="1"/>
        <rect x="5" y="${height - 115}" width="15" height="15" fill="#64B5F6" stroke="#000" stroke-width="1"/>
        
        <!-- Arm -->
        <rect x="-15" y="${-20}" width="${armLength}" height="15" fill="#FFA726" stroke="#000" stroke-width="2"/>
        
        <!-- Counter weight -->
        <rect x="${-60}" y="${-20}" width="45" height="40" fill="#E65100" stroke="#000" stroke-width="2"/>
        
        <!-- Cable -->
        <line x1="${armLength * 0.7}" y1="${-5}" x2="${armLength * 0.7}" y2="80" 
              stroke="#333" stroke-width="2" stroke-dasharray="5,5"/>
        
        <!-- Hook -->
        <g transform="translate(${armLength * 0.7}, 80)">
          <rect x="-8" y="0" width="16" height="20" fill="#757575" stroke="#000" stroke-width="1" rx="2"/>
          <path d="M -5 20 Q 0 25 5 20" stroke="#000" stroke-width="2" fill="none"/>
        </g>
        
        <!-- Support cables -->
        <line x1="0" y1="0" x2="${armLength * 0.3}" y2="${-20}" stroke="#666" stroke-width="2"/>
        <line x1="0" y1="0" x2="${armLength * 0.6}" y2="${-20}" stroke="#666" stroke-width="2"/>
      </g>
    `;
  }

  /**
   * Generate a bulldozer
   */
  generateBulldozer(x = 0, y = 0, size = 150) {
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Blade -->
        <rect x="${-size * 0.1}" y="${size * 0.4}" width="${size * 0.15}" height="${size * 0.4}" 
              fill="#FFD54F" stroke="#000" stroke-width="2"/>
        <rect x="${size * 0.05}" y="${size * 0.3}" width="${size * 0.1}" height="${size * 0.5}" 
              fill="#FBC02D" stroke="#000" stroke-width="2"/>
        
        <!-- Body -->
        <rect x="${size * 0.2}" y="${size * 0.4}" width="${size * 0.6}" height="${size * 0.3}" 
              fill="#FFA000" stroke="#000" stroke-width="2" rx="5"/>
        
        <!-- Cabin -->
        <rect x="${size * 0.5}" y="${size * 0.15}" width="${size * 0.3}" height="${size * 0.25}" 
              fill="#FF6F00" stroke="#000" stroke-width="2" rx="3"/>
        <rect x="${size * 0.55}" y="${size * 0.2}" width="${size * 0.08}" height="${size * 0.12}" 
              fill="#B3E5FC" stroke="#000" stroke-width="1"/>
        <rect x="${size * 0.67}" y="${size * 0.2}" width="${size * 0.08}" height="${size * 0.12}" 
              fill="#B3E5FC" stroke="#000" stroke-width="1"/>
        
        <!-- Tracks -->
        <ellipse cx="${size * 0.3}" cy="${size * 0.75}" rx="${size * 0.15}" ry="${size * 0.12}" 
                 fill="#424242" stroke="#000" stroke-width="2"/>
        <ellipse cx="${size * 0.7}" cy="${size * 0.75}" rx="${size * 0.15}" ry="${size * 0.12}" 
                 fill="#424242" stroke="#000" stroke-width="2"/>
        <rect x="${size * 0.3}" y="${size * 0.7}" width="${size * 0.4}" height="${size * 0.1}" 
              fill="#424242" stroke="#000" stroke-width="2"/>
        
        <!-- Track wheels -->
        <circle cx="${size * 0.35}" cy="${size * 0.75}" r="${size * 0.05}" fill="#616161"/>
        <circle cx="${size * 0.5}" cy="${size * 0.75}" r="${size * 0.05}" fill="#616161"/>
        <circle cx="${size * 0.65}" cy="${size * 0.75}" r="${size * 0.05}" fill="#616161"/>
        
        <!-- Exhaust -->
        <rect x="${size * 0.75}" y="${size * 0.25}" width="${size * 0.05}" height="${size * 0.15}" 
              fill="#212121" stroke="#000" stroke-width="1" rx="2"/>
      </g>
    `;
  }

  /**
   * Generate construction tools
   */
  generateTool(x = 0, y = 0, size = 80, type = 'hammer') {
    let toolSvg = `<g transform="translate(${x}, ${y})">`;
    
    switch (type) {
      case 'hammer':
        toolSvg += `
          <!-- Handle -->
          <rect x="${size * 0.4}" y="${size * 0.3}" width="${size * 0.15}" height="${size * 0.6}" 
                fill="#8D6E63" stroke="#000" stroke-width="2" rx="5"/>
          <!-- Head -->
          <rect x="${size * 0.2}" y="${size * 0.15}" width="${size * 0.5}" height="${size * 0.25}" 
                fill="#757575" stroke="#000" stroke-width="2" rx="3"/>
          <!-- Claw -->
          <path d="M ${size * 0.7} ${size * 0.2} L ${size * 0.85} ${size * 0.05} L ${size * 0.9} ${size * 0.15} L ${size * 0.7} ${size * 0.3} Z" 
                fill="#757575" stroke="#000" stroke-width="2"/>
        `;
        break;
      case 'wrench':
        toolSvg += `
          <!-- Handle -->
          <rect x="${size * 0.55}" y="${size * 0.1}" width="${size * 0.12}" height="${size * 0.7}" 
                fill="#9E9E9E" stroke="#000" stroke-width="2" rx="5"/>
          <!-- Head -->
          <ellipse cx="${size * 0.61}" cy="${size * 0.15}" rx="${size * 0.2}" ry="${size * 0.15}" 
                   fill="none" stroke="#9E9E9E" stroke-width="${size * 0.12}"/>
          <ellipse cx="${size * 0.61}" cy="${size * 0.15}" rx="${size * 0.12}" ry="${size * 0.08}" 
                   fill="#FFF" stroke="#000" stroke-width="1"/>
        `;
        break;
      case 'screwdriver':
        toolSvg += `
          <!-- Handle -->
          <rect x="${size * 0.4}" y="${size * 0.5}" width="${size * 0.2}" height="${size * 0.4}" 
                fill="#F44336" stroke="#000" stroke-width="2" rx="8"/>
          <ellipse cx="${size * 0.5}" cy="${size * 0.5}" rx="${size * 0.1}" ry="${size * 0.05}" 
                   fill="#C62828" stroke="#000" stroke-width="1"/>
          <!-- Shaft -->
          <rect x="${size * 0.47}" y="${size * 0.1}" width="${size * 0.06}" height="${size * 0.4}" 
                fill="#BDBDBD" stroke="#000" stroke-width="1"/>
          <!-- Tip -->
          <polygon points="${size * 0.47},${size * 0.1} ${size * 0.53},${size * 0.1} ${size * 0.5},${size * 0.05}" 
                   fill="#757575" stroke="#000" stroke-width="1"/>
        `;
        break;
    }
    
    toolSvg += `</g>`;
    return toolSvg;
  }

  /**
   * Generate architectural column
   */
  generateColumn(x = 0, y = 0, height = 200, width = 60) {
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Capital (top) -->
        <rect x="${-width * 0.6}" y="0" width="${width * 1.2}" height="${height * 0.1}" 
              fill="#D7CCC8" stroke="#000" stroke-width="2"/>
        <rect x="${-width * 0.5}" y="${height * 0.1}" width="${width}" height="${height * 0.05}" 
              fill="#BCAAA4" stroke="#000" stroke-width="1"/>
        
        <!-- Shaft -->
        <rect x="${-width * 0.4}" y="${height * 0.15}" width="${width * 0.8}" height="${height * 0.7}" 
              fill="#EFEBE9" stroke="#000" stroke-width="2"/>
        
        <!-- Flutes (vertical lines) -->
        ${Array.from({ length: 5 }, (_, i) => {
          const xPos = -width * 0.3 + (i * width * 0.15);
          return `<line x1="${xPos}" y1="${height * 0.15}" x2="${xPos}" y2="${height * 0.85}" 
                        stroke="#D7CCC8" stroke-width="2"/>`;
        }).join('')}
        
        <!-- Base -->
        <rect x="${-width * 0.5}" y="${height * 0.85}" width="${width}" height="${height * 0.05}" 
              fill="#BCAAA4" stroke="#000" stroke-width="1"/>
        <rect x="${-width * 0.6}" y="${height * 0.9}" width="${width * 1.2}" height="${height * 0.1}" 
              fill="#D7CCC8" stroke="#000" stroke-width="2"/>
      </g>
    `;
  }

  /**
   * Generate a complete construction scene
   */
  generateConstructionScene(width = 800, height = 600) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <polygon points="0,0 0,8 8,4" fill="#FFD700"/>
          </marker>
        </defs>
        
        <!-- Blueprint background -->
        ${this.generateBlueprintGrid(0, 0, width, height, 20)}
        
        <!-- Building blueprint -->
        ${this.generateBuildingBlueprint(50, 50, 280, 350)}
        
        <!-- Crane -->
        ${this.generateCrane(500, 250, 250, 200)}
        
        <!-- Bulldozer -->
        ${this.generateBulldozer(50, 450, 140)}
        
        <!-- Architectural columns -->
        ${this.generateColumn(400, 380, 180, 50)}
        ${this.generateColumn(500, 380, 180, 50)}
        
        <!-- Tools -->
        ${this.generateTool(620, 480, 60, 'hammer')}
        ${this.generateTool(700, 480, 60, 'wrench')}
        ${this.generateTool(620, 540, 60, 'screwdriver')}
        
        <!-- Title -->
        <text x="${width / 2}" y="35" font-size="24" font-weight="bold" 
              text-anchor="middle" fill="#FFF">Construction Blueprint</text>
        
        <!-- Legend -->
        <g transform="translate(${width - 180}, ${height - 120})">
          <rect x="0" y="0" width="170" height="110" fill="rgba(0,0,0,0.3)" stroke="#FFF" stroke-width="1" rx="5"/>
          <text x="85" y="20" font-size="14" font-weight="bold" fill="#FFF" text-anchor="middle">LEGEND</text>
          <line x1="10" y1="35" x2="40" y2="35" stroke="#FFF" stroke-width="3"/>
          <text x="50" y="40" font-size="12" fill="#FFF">Walls</text>
          <line x1="10" y1="55" x2="40" y2="55" stroke="#FFF" stroke-width="1" stroke-dasharray="2,2"/>
          <text x="50" y="60" font-size="12" fill="#FFF">Doors</text>
          <line x1="10" y1="75" x2="40" y2="75" stroke="#FFD700" stroke-width="2"/>
          <text x="50" y="80" font-size="12" fill="#FFF">Dimensions</text>
          <text x="10" y="100" font-size="10" fill="#CCC">Scale: 1:100</text>
        </g>
      </svg>
    `;
  }
}

export default ConstructionVectorGenerator;
