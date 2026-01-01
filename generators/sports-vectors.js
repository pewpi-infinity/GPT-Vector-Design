/**
 * ⚽ Sports Theme Vector Generator
 * Sports equipment, fields, and athletic elements
 */

export class SportsVectorGenerator {
  constructor() {
    this.theme = 'sports';
  }

  /**
   * Generate a soccer ball
   */
  generateSoccerBall(x = 0, y = 0, radius = 60) {
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Ball body -->
        <circle r="${radius}" fill="#FFF" stroke="#000" stroke-width="3"/>
        
        <!-- Pentagon pattern -->
        <polygon points="0,${-radius * 0.3} ${-radius * 0.28},${-radius * 0.1} ${-radius * 0.17},${radius * 0.25} ${radius * 0.17},${radius * 0.25} ${radius * 0.28},${-radius * 0.1}" 
                 fill="#000" stroke="#000" stroke-width="2"/>
        
        <!-- Surrounding hexagons (simplified) -->
        ${Array.from({ length: 5 }, (_, i) => {
          const angle = (i * 72 - 90) * Math.PI / 180;
          const hexX = Math.cos(angle) * radius * 0.5;
          const hexY = Math.sin(angle) * radius * 0.5;
          return `<circle cx="${hexX}" cy="${hexY}" r="${radius * 0.2}" 
                         fill="none" stroke="#000" stroke-width="2"/>`;
        }).join('')}
      </g>
    `;
  }

  /**
   * Generate a basketball
   */
  generateBasketball(x = 0, y = 0, radius = 60) {
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Ball body -->
        <circle r="${radius}" fill="#FF8C00" stroke="#000" stroke-width="3"/>
        
        <!-- Center lines -->
        <circle r="${radius * 0.8}" fill="none" stroke="#000" stroke-width="2.5"/>
        
        <!-- Vertical lines -->
        <path d="M ${-radius * 0.4} ${-radius * 0.92} Q 0 ${-radius * 0.5} ${radius * 0.4} ${-radius * 0.92}" 
              stroke="#000" stroke-width="2.5" fill="none"/>
        <path d="M ${-radius * 0.4} ${radius * 0.92} Q 0 ${radius * 0.5} ${radius * 0.4} ${radius * 0.92}" 
              stroke="#000" stroke-width="2.5" fill="none"/>
        
        <!-- Horizontal line -->
        <line x1="${-radius}" y1="0" x2="${radius}" y2="0" stroke="#000" stroke-width="2.5"/>
      </g>
    `;
  }

  /**
   * Generate a tennis racket
   */
  generateTennisRacket(x = 0, y = 0, size = 150) {
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Handle -->
        <rect x="${-size * 0.08}" y="${size * 0.4}" width="${size * 0.16}" height="${size * 0.5}" 
              fill="#8B4513" stroke="#000" stroke-width="2" rx="5"/>
        <rect x="${-size * 0.06}" y="${size * 0.45}" width="${size * 0.04}" height="${size * 0.4}" 
              fill="#654321"/>
        <rect x="${size * 0.02}" y="${size * 0.45}" width="${size * 0.04}" height="${size * 0.4}" 
              fill="#654321"/>
        
        <!-- Frame -->
        <ellipse cy="${size * 0.15}" rx="${size * 0.25}" ry="${size * 0.35}" 
                 fill="none" stroke="#FF4500" stroke-width="8"/>
        
        <!-- Strings (vertical) -->
        ${Array.from({ length: 7 }, (_, i) => {
          const stringX = -size * 0.18 + (i * size * 0.06);
          return `<line x1="${stringX}" y1="${size * 0.15 - size * 0.3}" 
                        x2="${stringX}" y2="${size * 0.15 + size * 0.3}" 
                        stroke="#FFF" stroke-width="1"/>`;
        }).join('')}
        
        <!-- Strings (horizontal) -->
        ${Array.from({ length: 9 }, (_, i) => {
          const stringY = size * 0.15 - size * 0.28 + (i * size * 0.07);
          return `<line x1="${-size * 0.2}" y1="${stringY}" 
                        x2="${size * 0.2}" y2="${stringY}" 
                        stroke="#FFF" stroke-width="1"/>`;
        }).join('')}
        
        <!-- Grip tape -->
        ${Array.from({ length: 8 }, (_, i) => 
          `<line x1="${-size * 0.08}" y1="${size * 0.5 + i * size * 0.05}" 
                 x2="${size * 0.08}" y2="${size * 0.5 + i * size * 0.05}" 
                 stroke="#000" stroke-width="1" opacity="0.3"/>`
        ).join('')}
      </g>
    `;
  }

  /**
   * Generate a football (American)
   */
  generateFootball(x = 0, y = 0, width = 100, height = 60) {
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Ball body -->
        <ellipse rx="${width / 2}" ry="${height / 2}" fill="#8B4513" stroke="#000" stroke-width="3"/>
        
        <!-- Laces -->
        <line x1="0" y1="${-height * 0.4}" x2="0" y2="${height * 0.4}" 
              stroke="#FFF" stroke-width="3"/>
        ${Array.from({ length: 5 }, (_, i) => {
          const laceY = -height * 0.3 + (i * height * 0.15);
          return `<line x1="${-width * 0.08}" y1="${laceY}" x2="${width * 0.08}" y2="${laceY}" 
                        stroke="#FFF" stroke-width="2.5"/>`;
        }).join('')}
        
        <!-- Stitching -->
        <path d="M ${-width * 0.45} 0 Q ${-width * 0.3} ${-height * 0.1} 0 ${-height * 0.15}" 
              stroke="#000" stroke-width="2" stroke-dasharray="3,3" fill="none"/>
        <path d="M ${width * 0.45} 0 Q ${width * 0.3} ${height * 0.1} 0 ${height * 0.15}" 
              stroke="#000" stroke-width="2" stroke-dasharray="3,3" fill="none"/>
      </g>
    `;
  }

  /**
   * Generate a trophy
   */
  generateTrophy(x = 0, y = 0, size = 120) {
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Base -->
        <rect x="${-size * 0.3}" y="${size * 0.7}" width="${size * 0.6}" height="${size * 0.1}" 
              fill="#8B7355" stroke="#000" stroke-width="2" rx="3"/>
        <rect x="${-size * 0.25}" y="${size * 0.8}" width="${size * 0.5}" height="${size * 0.15}" 
              fill="#654321" stroke="#000" stroke-width="2" rx="2"/>
        
        <!-- Stem -->
        <rect x="${-size * 0.08}" y="${size * 0.5}" width="${size * 0.16}" height="${size * 0.2}" 
              fill="#FFD700" stroke="#000" stroke-width="2"/>
        
        <!-- Cup body -->
        <path d="M ${-size * 0.25} ${size * 0.5} L ${-size * 0.15} 0 L ${size * 0.15} 0 L ${size * 0.25} ${size * 0.5} Z" 
              fill="#FFD700" stroke="#000" stroke-width="3"/>
        
        <!-- Cup rim -->
        <ellipse cy="0" rx="${size * 0.15}" ry="${size * 0.05}" 
                 fill="#FDB813" stroke="#000" stroke-width="2"/>
        
        <!-- Handles -->
        <path d="M ${-size * 0.25} ${size * 0.15} Q ${-size * 0.45} ${size * 0.25} ${-size * 0.35} ${size * 0.4}" 
              stroke="#FFD700" stroke-width="8" fill="none" stroke-linecap="round"/>
        <path d="M ${size * 0.25} ${size * 0.15} Q ${size * 0.45} ${size * 0.25} ${size * 0.35} ${size * 0.4}" 
              stroke="#FFD700" stroke-width="8" fill="none" stroke-linecap="round"/>
        
        <!-- Decorative star -->
        <polygon points="0,${size * 0.2} ${-size * 0.05},${size * 0.3} ${-size * 0.12},${size * 0.3} ${-size * 0.03},${size * 0.35} ${-size * 0.07},${size * 0.42} 0,${size * 0.38} ${size * 0.07},${size * 0.42} ${size * 0.03},${size * 0.35} ${size * 0.12},${size * 0.3} ${size * 0.05},${size * 0.3}" 
                 fill="#C0392B" stroke="#000" stroke-width="1"/>
      </g>
    `;
  }

  /**
   * Generate a sports field/court
   */
  generateSoccerField(x = 0, y = 0, width = 600, height = 400) {
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Field -->
        <rect width="${width}" height="${height}" fill="#2ECC71" stroke="#FFF" stroke-width="4"/>
        
        <!-- Center line -->
        <line x1="${width / 2}" y1="0" x2="${width / 2}" y2="${height}" stroke="#FFF" stroke-width="3"/>
        
        <!-- Center circle -->
        <circle cx="${width / 2}" cy="${height / 2}" r="${height * 0.15}" 
                fill="none" stroke="#FFF" stroke-width="3"/>
        <circle cx="${width / 2}" cy="${height / 2}" r="5" fill="#FFF"/>
        
        <!-- Penalty areas -->
        <rect x="0" y="${height * 0.25}" width="${width * 0.15}" height="${height * 0.5}" 
              fill="none" stroke="#FFF" stroke-width="3"/>
        <rect x="${width * 0.85}" y="${height * 0.25}" width="${width * 0.15}" height="${height * 0.5}" 
              fill="none" stroke="#FFF" stroke-width="3"/>
        
        <!-- Goal areas -->
        <rect x="0" y="${height * 0.375}" width="${width * 0.08}" height="${height * 0.25}" 
              fill="none" stroke="#FFF" stroke-width="3"/>
        <rect x="${width * 0.92}" y="${height * 0.375}" width="${width * 0.08}" height="${height * 0.25}" 
              fill="none" stroke="#FFF" stroke-width="3"/>
        
        <!-- Corner arcs -->
        <path d="M 0 0 Q ${width * 0.03} 0 ${width * 0.03} ${height * 0.03} L 0 ${height * 0.03} Z" 
              fill="none" stroke="#FFF" stroke-width="2"/>
        <path d="M ${width} 0 Q ${width * 0.97} 0 ${width * 0.97} ${height * 0.03} L ${width} ${height * 0.03} Z" 
              fill="none" stroke="#FFF" stroke-width="2"/>
        <path d="M 0 ${height} Q ${width * 0.03} ${height} ${width * 0.03} ${height * 0.97} L 0 ${height * 0.97} Z" 
              fill="none" stroke="#FFF" stroke-width="2"/>
        <path d="M ${width} ${height} Q ${width * 0.97} ${height} ${width * 0.97} ${height * 0.97} L ${width} ${height * 0.97} Z" 
              fill="none" stroke="#FFF" stroke-width="2"/>
      </g>
    `;
  }

  /**
   * Generate a complete sports scene
   */
  generateSportsScene(width = 800, height = 600) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
        <!-- Background -->
        <rect width="${width}" height="${height}" fill="#34495E"/>
        
        <!-- Soccer field -->
        ${this.generateSoccerField(100, 50, 600, 300)}
        
        <!-- Equipment -->
        ${this.generateSoccerBall(150, 450, 50)}
        ${this.generateBasketball(280, 450, 50)}
        ${this.generateFootball(420, 450, 80, 50)}
        ${this.generateTennisRacket(570, 400, 120)}
        
        <!-- Trophy -->
        ${this.generateTrophy(width - 120, 420, 100)}
        
        <!-- Title -->
        <text x="${width / 2}" y="35" font-size="28" font-weight="bold" 
              text-anchor="middle" fill="#FFF" font-family="sans-serif">SPORTS ARENA</text>
        
        <!-- Scoreboard -->
        <g transform="translate(${width / 2 - 100}, ${height - 80})">
          <rect width="200" height="60" fill="#000" stroke="#FFD700" stroke-width="3" rx="5"/>
          <text x="100" y="25" font-size="16" font-weight="bold" 
                text-anchor="middle" fill="#FFD700">SCOREBOARD</text>
          <text x="60" y="48" font-size="24" font-weight="bold" 
                text-anchor="middle" fill="#00FF00">HOME 3</text>
          <text x="140" y="48" font-size="24" font-weight="bold" 
                text-anchor="middle" fill="#FF0000">AWAY 2</text>
        </g>
      </svg>
    `;
  }
}

export default SportsVectorGenerator;
