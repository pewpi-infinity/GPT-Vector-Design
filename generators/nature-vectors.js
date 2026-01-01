/**
 * 🌿 Nature Theme Vector Generator
 * Trees, flowers, animals, and natural elements
 */

export class NatureVectorGenerator {
  constructor() {
    this.theme = 'nature';
  }

  /**
   * Generate a tree
   */
  generateTree(x = 0, y = 0, size = 150, type = 'deciduous') {
    let tree = `<g transform="translate(${x}, ${y})">`;
    
    if (type === 'deciduous') {
      // Trunk
      tree += `<rect x="${-size * 0.1}" y="${size * 0.3}" width="${size * 0.2}" height="${size * 0.7}" 
                    fill="#8B4513" stroke="#000" stroke-width="2" rx="5"/>`;
      
      // Foliage circles
      tree += `<circle cx="0" cy="${size * 0.35}" r="${size * 0.25}" fill="#2ECC71" stroke="#000" stroke-width="2"/>`;
      tree += `<circle cx="${-size * 0.15}" cy="${size * 0.2}" r="${size * 0.22}" fill="#27AE60" stroke="#000" stroke-width="2"/>`;
      tree += `<circle cx="${size * 0.15}" cy="${size * 0.2}" r="${size * 0.22}" fill="#27AE60" stroke="#000" stroke-width="2"/>`;
      tree += `<circle cx="0" cy="${size * 0.05}" r="${size * 0.25}" fill="#229954" stroke="#000" stroke-width="2"/>`;
    } else {
      // Pine tree
      tree += `<rect x="${-size * 0.08}" y="${size * 0.5}" width="${size * 0.16}" height="${size * 0.5}" 
                    fill="#654321" stroke="#000" stroke-width="2"/>`;
      
      // Triangular foliage
      tree += `<polygon points="0,${-size * 0.2} ${-size * 0.35},${size * 0.3} ${size * 0.35},${size * 0.3}" 
                       fill="#1E8449" stroke="#000" stroke-width="2"/>`;
      tree += `<polygon points="0,${size * 0.05} ${-size * 0.3},${size * 0.45} ${size * 0.3},${size * 0.45}" 
                       fill="#229954" stroke="#000" stroke-width="2"/>`;
    }
    
    tree += `</g>`;
    return tree;
  }

  /**
   * Generate a flower
   */
  generateFlower(x = 0, y = 0, size = 60, color = '#FF69B4') {
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Stem -->
        <line x1="0" y1="${size * 0.3}" x2="0" y2="${size}" 
              stroke="#2ECC71" stroke-width="3"/>
        
        <!-- Leaves -->
        <ellipse cx="${-size * 0.15}" cy="${size * 0.6}" rx="${size * 0.12}" ry="${size * 0.2}" 
                 fill="#27AE60" stroke="#000" stroke-width="1" 
                 transform="rotate(-30 ${-size * 0.15} ${size * 0.6})"/>
        <ellipse cx="${size * 0.15}" cy="${size * 0.7}" rx="${size * 0.12}" ry="${size * 0.2}" 
                 fill="#27AE60" stroke="#000" stroke-width="1" 
                 transform="rotate(30 ${size * 0.15} ${size * 0.7})"/>
        
        <!-- Petals -->
        ${Array.from({ length: 5 }, (_, i) => {
          const angle = (i * 72 - 90) * Math.PI / 180;
          const petalX = Math.cos(angle) * size * 0.25;
          const petalY = Math.sin(angle) * size * 0.25 + size * 0.3;
          return `<ellipse cx="${petalX}" cy="${petalY}" rx="${size * 0.15}" ry="${size * 0.25}" 
                          fill="${color}" stroke="#000" stroke-width="2" 
                          transform="rotate(${i * 72} ${petalX} ${petalY})"/>`;
        }).join('')}
        
        <!-- Center -->
        <circle cy="${size * 0.3}" r="${size * 0.15}" fill="#FFD700" stroke="#000" stroke-width="2"/>
      </g>
    `;
  }

  /**
   * Generate a butterfly
   */
  generateButterfly(x = 0, y = 0, size = 60) {
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Body -->
        <ellipse cy="0" rx="${size * 0.08}" ry="${size * 0.4}" fill="#000" stroke="#000" stroke-width="1"/>
        
        <!-- Antennae -->
        <path d="M ${-size * 0.05} ${-size * 0.35} Q ${-size * 0.15} ${-size * 0.5} ${-size * 0.12} ${-size * 0.55}" 
              stroke="#000" stroke-width="2" fill="none"/>
        <circle cx="${-size * 0.12}" cy="${-size * 0.55}" r="${size * 0.03}" fill="#000"/>
        <path d="M ${size * 0.05} ${-size * 0.35} Q ${size * 0.15} ${-size * 0.5} ${size * 0.12} ${-size * 0.55}" 
              stroke="#000" stroke-width="2" fill="none"/>
        <circle cx="${size * 0.12}" cy="${-size * 0.55}" r="${size * 0.03}" fill="#000"/>
        
        <!-- Upper wings -->
        <ellipse cx="${-size * 0.3}" cy="${-size * 0.15}" rx="${size * 0.3}" ry="${size * 0.35}" 
                 fill="#FF6B6B" stroke="#000" stroke-width="2"/>
        <ellipse cx="${-size * 0.28}" cy="${-size * 0.18}" rx="${size * 0.15}" ry="${size * 0.2}" 
                 fill="#FFE66D" opacity="0.7"/>
        
        <ellipse cx="${size * 0.3}" cy="${-size * 0.15}" rx="${size * 0.3}" ry="${size * 0.35}" 
                 fill="#FF6B6B" stroke="#000" stroke-width="2"/>
        <ellipse cx="${size * 0.28}" cy="${-size * 0.18}" rx="${size * 0.15}" ry="${size * 0.2}" 
                 fill="#FFE66D" opacity="0.7"/>
        
        <!-- Lower wings -->
        <ellipse cx="${-size * 0.25}" cy="${size * 0.25}" rx="${size * 0.25}" ry="${size * 0.3}" 
                 fill="#4ECDC4" stroke="#000" stroke-width="2"/>
        <circle cx="${-size * 0.25}" cy="${size * 0.25}" r="${size * 0.1}" fill="#95E1D3" opacity="0.7"/>
        
        <ellipse cx="${size * 0.25}" cy="${size * 0.25}" rx="${size * 0.25}" ry="${size * 0.3}" 
                 fill="#4ECDC4" stroke="#000" stroke-width="2"/>
        <circle cx="${size * 0.25}" cy="${size * 0.25}" r="${size * 0.1}" fill="#95E1D3" opacity="0.7"/>
      </g>
    `;
  }

  /**
   * Generate a bird
   */
  generateBird(x = 0, y = 0, size = 50) {
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Body -->
        <ellipse rx="${size * 0.3}" ry="${size * 0.25}" fill="#F39C12" stroke="#000" stroke-width="2"/>
        
        <!-- Head -->
        <circle cx="${size * 0.25}" cy="${-size * 0.15}" r="${size * 0.18}" 
                fill="#F39C12" stroke="#000" stroke-width="2"/>
        
        <!-- Eye -->
        <circle cx="${size * 0.32}" cy="${-size * 0.15}" r="${size * 0.05}" fill="#000"/>
        
        <!-- Beak -->
        <polygon points="${size * 0.4},${-size * 0.15} ${size * 0.5},${-size * 0.12} ${size * 0.4},${-size * 0.09}" 
                 fill="#E67E22" stroke="#000" stroke-width="1"/>
        
        <!-- Wings -->
        <ellipse cx="${-size * 0.15}" cy="0" rx="${size * 0.35}" ry="${size * 0.2}" 
                 fill="#E67E22" stroke="#000" stroke-width="2" 
                 transform="rotate(-20 ${-size * 0.15} 0)"/>
        
        <!-- Tail -->
        <ellipse cx="${-size * 0.35}" cy="${size * 0.05}" rx="${size * 0.25}" ry="${size * 0.15}" 
                 fill="#D68910" stroke="#000" stroke-width="2" 
                 transform="rotate(-30 ${-size * 0.35} ${size * 0.05})"/>
      </g>
    `;
  }

  /**
   * Generate a sun
   */
  generateSun(x = 0, y = 0, radius = 50) {
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Rays -->
        ${Array.from({ length: 12 }, (_, i) => {
          const angle = (i * 30) * Math.PI / 180;
          const x1 = Math.cos(angle) * radius;
          const y1 = Math.sin(angle) * radius;
          const x2 = Math.cos(angle) * (radius + 20);
          const y2 = Math.sin(angle) * (radius + 20);
          return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
                        stroke="#FDB813" stroke-width="4" stroke-linecap="round"/>`;
        }).join('')}
        
        <!-- Sun body -->
        <circle r="${radius}" fill="#FFD93D" stroke="#F5A623" stroke-width="3"/>
        
        <!-- Face -->
        <circle cx="${-radius * 0.25}" cy="${-radius * 0.15}" r="${radius * 0.1}" fill="#000"/>
        <circle cx="${radius * 0.25}" cy="${-radius * 0.15}" r="${radius * 0.1}" fill="#000"/>
        <path d="M ${-radius * 0.3} ${radius * 0.15} Q 0 ${radius * 0.35} ${radius * 0.3} ${radius * 0.15}" 
              stroke="#000" stroke-width="3" fill="none"/>
      </g>
    `;
  }

  /**
   * Generate clouds
   */
  generateCloud(x = 0, y = 0, size = 100) {
    return `
      <g transform="translate(${x}, ${y})">
        <ellipse cx="${-size * 0.3}" cy="0" rx="${size * 0.3}" ry="${size * 0.25}" 
                 fill="#FFF" stroke="#E5E5E5" stroke-width="2"/>
        <ellipse cx="0" cy="${-size * 0.1}" rx="${size * 0.35}" ry="${size * 0.3}" 
                 fill="#FFF" stroke="#E5E5E5" stroke-width="2"/>
        <ellipse cx="${size * 0.3}" cy="0" rx="${size * 0.3}" ry="${size * 0.25}" 
                 fill="#FFF" stroke="#E5E5E5" stroke-width="2"/>
      </g>
    `;
  }

  /**
   * Generate a complete nature scene
   */
  generateNatureScene(width = 800, height = 600) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
        <!-- Sky gradient -->
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#B0E0E6;stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <rect width="${width}" height="${height}" fill="url(#skyGradient)"/>
        
        <!-- Sun -->
        ${this.generateSun(width - 100, 80, 40)}
        
        <!-- Clouds -->
        ${this.generateCloud(150, 100, 80)}
        ${this.generateCloud(500, 80, 100)}
        ${this.generateCloud(width - 200, 120, 70)}
        
        <!-- Ground -->
        <ellipse cx="${width / 2}" cy="${height}" rx="${width * 0.8}" ry="${height * 0.4}" 
                 fill="#7CB342"/>
        <rect y="${height * 0.7}" width="${width}" height="${height * 0.3}" fill="#558B2F"/>
        
        <!-- Trees -->
        ${this.generateTree(100, 200, 120, 'deciduous')}
        ${this.generateTree(250, 220, 100, 'deciduous')}
        ${this.generateTree(600, 210, 110, 'pine')}
        ${this.generateTree(700, 200, 130, 'pine')}
        
        <!-- Flowers -->
        ${this.generateFlower(150, 450, 50, '#FF69B4')}
        ${this.generateFlower(220, 470, 45, '#FF1493')}
        ${this.generateFlower(400, 460, 55, '#FFB6C1')}
        ${this.generateFlower(500, 450, 50, '#FF69B4')}
        ${this.generateFlower(650, 470, 48, '#FFC0CB')}
        
        <!-- Butterflies -->
        ${this.generateButterfly(350, 200, 50)}
        ${this.generateButterfly(550, 250, 45)}
        
        <!-- Birds -->
        ${this.generateBird(width - 150, 150, 40)}
        ${this.generateBird(width - 250, 180, 35)}
        
        <!-- Title -->
        <text x="${width / 2}" y="40" font-size="28" font-weight="bold" 
              text-anchor="middle" fill="#2C3E50" font-family="sans-serif">NATURE SCENE</text>
      </svg>
    `;
  }
}

export default NatureVectorGenerator;
