/**
 * 🍄 Mario Theme Vector Generator
 * Pixel-art style SVGs with Mario-themed elements
 */

export class MarioVectorGenerator {
  constructor() {
    this.theme = 'mario';
  }

  /**
   * Generate a question block SVG
   */
  generateQuestionBlock(x = 0, y = 0, size = 64) {
    return `
      <g transform="translate(${x}, ${y})">
        <rect width="${size}" height="${size}" fill="#F7B239" stroke="#000" stroke-width="2"/>
        <rect x="${size * 0.125}" y="${size * 0.125}" width="${size * 0.75}" height="${size * 0.75}" 
              fill="#FDD870" stroke="#000" stroke-width="1"/>
        <text x="${size / 2}" y="${size * 0.7}" 
              font-size="${size * 0.6}" font-weight="bold" 
              text-anchor="middle" fill="#000" font-family="Arial, sans-serif">?</text>
      </g>
    `;
  }

  /**
   * Generate a brick block SVG
   */
  generateBrickBlock(x = 0, y = 0, size = 64) {
    return `
      <g transform="translate(${x}, ${y})">
        <rect width="${size}" height="${size}" fill="#C84C0C" stroke="#000" stroke-width="2"/>
        <rect x="${size * 0.05}" y="${size * 0.05}" width="${size * 0.4}" height="${size * 0.4}" 
              fill="#E85C1C" stroke="#000" stroke-width="1"/>
        <rect x="${size * 0.55}" y="${size * 0.05}" width="${size * 0.4}" height="${size * 0.4}" 
              fill="#E85C1C" stroke="#000" stroke-width="1"/>
        <rect x="${size * 0.05}" y="${size * 0.55}" width="${size * 0.4}" height="${size * 0.4}" 
              fill="#E85C1C" stroke="#000" stroke-width="1"/>
        <rect x="${size * 0.55}" y="${size * 0.55}" width="${size * 0.4}" height="${size * 0.4}" 
              fill="#E85C1C" stroke="#000" stroke-width="1"/>
      </g>
    `;
  }

  /**
   * Generate a mushroom power-up SVG
   */
  generateMushroom(x = 0, y = 0, size = 64, type = 'super') {
    const colors = {
      super: { cap: '#FF0000', spots: '#FFF' },
      life: { cap: '#00FF00', spots: '#FFF' }
    };
    const color = colors[type] || colors.super;

    return `
      <g transform="translate(${x}, ${y})">
        <!-- Cap -->
        <ellipse cx="${size / 2}" cy="${size * 0.35}" rx="${size * 0.45}" ry="${size * 0.35}" 
                 fill="${color.cap}" stroke="#000" stroke-width="2"/>
        <!-- Spots -->
        <circle cx="${size * 0.3}" cy="${size * 0.35}" r="${size * 0.12}" fill="${color.spots}"/>
        <circle cx="${size * 0.7}" cy="${size * 0.35}" r="${size * 0.12}" fill="${color.spots}"/>
        <!-- Stem -->
        <rect x="${size * 0.35}" y="${size * 0.5}" width="${size * 0.3}" height="${size * 0.4}" 
              fill="#FFF" stroke="#000" stroke-width="2" rx="${size * 0.05}"/>
        <!-- Eyes -->
        <circle cx="${size * 0.4}" cy="${size * 0.65}" r="${size * 0.05}" fill="#000"/>
        <circle cx="${size * 0.6}" cy="${size * 0.65}" r="${size * 0.05}" fill="#000"/>
      </g>
    `;
  }

  /**
   * Generate a star power-up SVG
   */
  generateStar(x = 0, y = 0, size = 64) {
    const points = [];
    const outerRadius = size * 0.45;
    const innerRadius = size * 0.2;
    
    for (let i = 0; i < 10; i++) {
      const angle = (i * Math.PI) / 5 - Math.PI / 2;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      points.push(`${size / 2 + Math.cos(angle) * radius},${size / 2 + Math.sin(angle) * radius}`);
    }

    return `
      <g transform="translate(${x}, ${y})">
        <polygon points="${points.join(' ')}" fill="#FFD700" stroke="#000" stroke-width="2"/>
        <!-- Eyes -->
        <circle cx="${size * 0.4}" cy="${size * 0.45}" r="${size * 0.05}" fill="#000"/>
        <circle cx="${size * 0.6}" cy="${size * 0.45}" r="${size * 0.05}" fill="#000"/>
        <!-- Smile -->
        <path d="M ${size * 0.35} ${size * 0.55} Q ${size * 0.5} ${size * 0.65} ${size * 0.65} ${size * 0.55}" 
              stroke="#000" stroke-width="2" fill="none"/>
      </g>
    `;
  }

  /**
   * Generate a fire flower SVG
   */
  generateFireFlower(x = 0, y = 0, size = 64) {
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Stem -->
        <rect x="${size * 0.45}" y="${size * 0.4}" width="${size * 0.1}" height="${size * 0.5}" 
              fill="#00AA00" stroke="#000" stroke-width="1"/>
        <!-- Flower center -->
        <circle cx="${size / 2}" cy="${size * 0.3}" r="${size * 0.2}" fill="#FFF" stroke="#000" stroke-width="2"/>
        <!-- Petals -->
        <circle cx="${size * 0.3}" cy="${size * 0.15}" r="${size * 0.12}" fill="#FF0000" stroke="#000" stroke-width="1"/>
        <circle cx="${size * 0.7}" cy="${size * 0.15}" r="${size * 0.12}" fill="#FF0000" stroke="#000" stroke-width="1"/>
        <circle cx="${size * 0.3}" cy="${size * 0.45}" r="${size * 0.12}" fill="#FF0000" stroke="#000" stroke-width="1"/>
        <circle cx="${size * 0.7}" cy="${size * 0.45}" r="${size * 0.12}" fill="#FF0000" stroke="#000" stroke-width="1"/>
        <!-- Eyes -->
        <circle cx="${size * 0.45}" cy="${size * 0.28}" r="${size * 0.04}" fill="#000"/>
        <circle cx="${size * 0.55}" cy="${size * 0.28}" r="${size * 0.04}" fill="#000"/>
      </g>
    `;
  }

  /**
   * Generate a pipe SVG
   */
  generatePipe(x = 0, y = 0, width = 80, height = 120, color = '#00AA00') {
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Pipe body -->
        <rect x="0" y="${height * 0.2}" width="${width}" height="${height * 0.8}" 
              fill="${color}" stroke="#000" stroke-width="2"/>
        <!-- Pipe rim -->
        <ellipse cx="${width / 2}" cy="${height * 0.2}" rx="${width * 0.5}" ry="${height * 0.1}" 
                 fill="#00CC00" stroke="#000" stroke-width="2"/>
        <!-- Highlights -->
        <rect x="${width * 0.1}" y="${height * 0.3}" width="${width * 0.15}" height="${height * 0.6}" 
              fill="rgba(255,255,255,0.2)"/>
      </g>
    `;
  }

  /**
   * Generate a complete Mario scene
   */
  generateScene(width = 800, height = 600) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#5C94FC;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#92CDFF;stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <!-- Sky background -->
        <rect width="${width}" height="${height}" fill="url(#skyGradient)"/>
        
        <!-- Ground -->
        <rect y="${height * 0.8}" width="${width}" height="${height * 0.2}" fill="#C84C0C"/>
        
        <!-- Scene elements -->
        ${this.generateQuestionBlock(100, height * 0.5, 64)}
        ${this.generateBrickBlock(200, height * 0.5, 64)}
        ${this.generateBrickBlock(264, height * 0.5, 64)}
        ${this.generateBrickBlock(328, height * 0.5, 64)}
        ${this.generateMushroom(150, height * 0.7, 48, 'super')}
        ${this.generateStar(250, height * 0.7, 48)}
        ${this.generateFireFlower(350, height * 0.7, 48)}
        ${this.generatePipe(500, height * 0.55, 80, 200)}
        
        <!-- Clouds -->
        <g opacity="0.8">
          <ellipse cx="100" cy="100" rx="40" ry="25" fill="#FFF"/>
          <ellipse cx="130" cy="100" rx="30" ry="20" fill="#FFF"/>
          <ellipse cx="500" cy="80" rx="50" ry="30" fill="#FFF"/>
          <ellipse cx="540" cy="80" rx="40" ry="25" fill="#FFF"/>
        </g>
      </svg>
    `;
  }
}

export default MarioVectorGenerator;
