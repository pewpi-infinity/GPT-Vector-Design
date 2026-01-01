/**
 * 🎮 Pixel Art Theme Vector Generator
 * Retro gaming style pixel graphics
 */

export class PixelArtVectorGenerator {
  constructor() {
    this.theme = 'pixelart';
  }

  /**
   * Generate a pixel-art style sprite
   */
  generatePixelSprite(x = 0, y = 0, pixelSize = 8, pattern = 'heart') {
    const patterns = {
      heart: [
        [0, 1, 1, 0, 0, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ],
      coin: [
        [0, 0, 1, 1, 1, 1, 0, 0],
        [0, 1, 2, 2, 2, 2, 1, 0],
        [1, 2, 2, 3, 3, 2, 2, 1],
        [1, 2, 3, 3, 3, 3, 2, 1],
        [1, 2, 2, 3, 3, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 1],
        [0, 1, 2, 2, 2, 2, 1, 0],
        [0, 0, 1, 1, 1, 1, 0, 0],
      ],
      gem: [
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 1, 2, 2, 1, 0, 0],
        [0, 1, 2, 3, 3, 2, 1, 0],
        [1, 2, 3, 3, 3, 3, 2, 1],
        [0, 1, 2, 3, 3, 2, 1, 0],
        [0, 0, 1, 2, 2, 1, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ]
    };
    
    const colors = {
      0: 'transparent',
      1: '#000000',
      2: '#FFD700',
      3: '#FFF700',
    };
    
    const grid = patterns[pattern] || patterns.heart;
    let pixels = '';
    
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell !== 0) {
          pixels += `<rect x="${x + colIndex * pixelSize}" y="${y + rowIndex * pixelSize}" 
                           width="${pixelSize}" height="${pixelSize}" 
                           fill="${colors[cell]}" stroke="none"/>`;
        }
      });
    });
    
    return `<g>${pixels}</g>`;
  }

  /**
   * Generate retro-style text
   */
  generatePixelText(x = 0, y = 0, text = 'GAME', pixelSize = 6) {
    // Simplified 5x7 pixel font (A-Z only)
    const font = {
      'G': [[1,1,1,1,1],[1,0,0,0,0],[1,0,1,1,1],[1,0,0,0,1],[1,1,1,1,1]],
      'A': [[0,1,1,1,0],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1]],
      'M': [[1,0,0,0,1],[1,1,0,1,1],[1,0,1,0,1],[1,0,0,0,1],[1,0,0,0,1]],
      'E': [[1,1,1,1,1],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,1,1,1,1]],
    };
    
    let pixels = '<g>';
    let offsetX = 0;
    
    for (const char of text.toUpperCase()) {
      const charMap = font[char];
      if (charMap) {
        charMap.forEach((row, rowIndex) => {
          row.forEach((cell, colIndex) => {
            if (cell === 1) {
              pixels += `<rect x="${x + offsetX + colIndex * pixelSize}" 
                              y="${y + rowIndex * pixelSize}" 
                              width="${pixelSize}" height="${pixelSize}" 
                              fill="#FFF" stroke="none"/>`;
            }
          });
        });
        offsetX += (5 + 1) * pixelSize; // 5 pixels wide + 1 space
      }
    }
    
    pixels += '</g>';
    return pixels;
  }

  /**
   * Generate a pixel art scene
   */
  generatePixelScene(width = 800, height = 600) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
        <!-- Background -->
        <rect width="${width}" height="${height}" fill="#1A1A2E"/>
        
        <!-- Grid overlay -->
        ${Array.from({ length: width / 32 }, (_, i) => 
          `<line x1="${i * 32}" y1="0" x2="${i * 32}" y2="${height}" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>`
        ).join('')}
        ${Array.from({ length: height / 32 }, (_, i) => 
          `<line x1="0" y1="${i * 32}" x2="${width}" y2="${i * 32}" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>`
        ).join('')}
        
        <!-- Pixel sprites -->
        ${this.generatePixelSprite(100, 150, 10, 'heart')}
        ${this.generatePixelSprite(250, 150, 10, 'coin')}
        ${this.generatePixelSprite(400, 150, 10, 'gem')}
        ${this.generatePixelSprite(100, 300, 12, 'heart')}
        ${this.generatePixelSprite(250, 300, 12, 'coin')}
        ${this.generatePixelSprite(400, 300, 12, 'gem')}
        
        <!-- Pixel text -->
        ${this.generatePixelText(150, 50, 'GAME', 8)}
        
        <!-- Decorative pixels -->
        ${Array.from({ length: 50 }, () => {
          const px = Math.random() * width;
          const py = Math.random() * height;
          const psize = 4 + Math.random() * 8;
          const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
          const color = colors[Math.floor(Math.random() * colors.length)];
          return `<rect x="${px}" y="${py}" width="${psize}" height="${psize}" fill="${color}" opacity="0.3"/>`;
        }).join('')}
        
        <!-- Title -->
        <text x="${width / 2}" y="${height - 30}" font-size="24" font-weight="bold" 
              text-anchor="middle" fill="#FFF" font-family="monospace">PIXEL ART GALLERY</text>
      </svg>
    `;
  }
}

export default PixelArtVectorGenerator;
