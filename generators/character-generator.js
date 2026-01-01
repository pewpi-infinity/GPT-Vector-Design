/**
 * Character Vector Generator
 * Generate dynamic character SVGs with various actions
 */

export class CharacterVectorGenerator {
  constructor() {
    this.characters = {
      mario: this.createMario.bind(this),
      luigi: this.createLuigi.bind(this),
      robot: this.createRobot.bind(this),
      scientist: this.createScientist.bind(this),
    };
  }

  /**
   * Main entry point for character generation
   */
  generateCharacter(character = 'mario', action = 'standing', x = 0, y = 0, size = 100) {
    const charFunc = this.characters[character] || this.characters.mario;
    return charFunc(action, x, y, size);
  }

  /**
   * Create Mario character
   */
  createMario(action, x, y, size) {
    const animations = {
      standing: this.marioStanding(x, y, size),
      jumping: this.marioJumping(x, y, size),
      running: this.marioRunning(x, y, size),
      waving: this.marioWaving(x, y, size),
    };
    
    return animations[action] || animations.standing;
  }

  marioStanding(x, y, size) {
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Cap -->
        <ellipse cx="0" cy="${-size * 0.7}" rx="${size * 0.35}" ry="${size * 0.15}" 
                 fill="#FF0000" stroke="#000" stroke-width="2"/>
        <circle cx="0" cy="${-size * 0.68}" r="${size * 0.08}" fill="#FFF"/>
        <text x="0" y="${-size * 0.65}" font-size="${size * 0.12}" font-weight="bold" 
              text-anchor="middle" fill="#FF0000">M</text>
        
        <!-- Head -->
        <circle cy="${-size * 0.5}" r="${size * 0.25}" fill="#FFD7B5" stroke="#000" stroke-width="2"/>
        
        <!-- Eyes -->
        <circle cx="${-size * 0.1}" cy="${-size * 0.52}" r="${size * 0.05}" fill="#000"/>
        <circle cx="${size * 0.1}" cy="${-size * 0.52}" r="${size * 0.05}" fill="#000"/>
        
        <!-- Mustache -->
        <ellipse cy="${-size * 0.42}" rx="${size * 0.15}" ry="${size * 0.08}" fill="#000"/>
        
        <!-- Body (overalls) -->
        <rect x="${-size * 0.2}" y="${-size * 0.25}" width="${size * 0.4}" height="${size * 0.35}" 
              fill="#0000FF" stroke="#000" stroke-width="2" rx="5"/>
        
        <!-- Arms -->
        <rect x="${-size * 0.35}" y="${-size * 0.2}" width="${size * 0.12}" height="${size * 0.3}" 
              fill="#FFD7B5" stroke="#000" stroke-width="2" rx="5"/>
        <rect x="${size * 0.23}" y="${-size * 0.2}" width="${size * 0.12}" height="${size * 0.3}" 
              fill="#FFD7B5" stroke="#000" stroke-width="2" rx="5"/>
        
        <!-- Legs -->
        <rect x="${-size * 0.15}" y="${size * 0.1}" width="${size * 0.12}" height="${size * 0.35}" 
              fill="#0000FF" stroke="#000" stroke-width="2" rx="3"/>
        <rect x="${size * 0.03}" y="${size * 0.1}" width="${size * 0.12}" height="${size * 0.35}" 
              fill="#0000FF" stroke="#000" stroke-width="2" rx="3"/>
        
        <!-- Shoes -->
        <ellipse cx="${-size * 0.09}" cy="${size * 0.48}" rx="${size * 0.12}" ry="${size * 0.08}" 
                 fill="#8B4513" stroke="#000" stroke-width="2"/>
        <ellipse cx="${size * 0.09}" cy="${size * 0.48}" rx="${size * 0.12}" ry="${size * 0.08}" 
                 fill="#8B4513" stroke="#000" stroke-width="2"/>
      </g>
    `;
  }

  marioJumping(x, y, size) {
    return `
      <g transform="translate(${x}, ${y - size * 0.3})">
        ${this.marioStanding(0, 0, size).replace(
          '<g transform="translate(0, 0)">',
          '<g transform="translate(0, 0) rotate(-15)">'
        )}
        <!-- Jump effect lines -->
        <line x1="${-size * 0.4}" y1="${size * 0.6}" x2="${-size * 0.5}" y2="${size * 0.7}" 
              stroke="#FFA500" stroke-width="3" opacity="0.6"/>
        <line x1="${size * 0.4}" y1="${size * 0.6}" x2="${size * 0.5}" y2="${size * 0.7}" 
              stroke="#FFA500" stroke-width="3" opacity="0.6"/>
      </g>
    `;
  }

  marioRunning(x, y, size) {
    return `
      <g transform="translate(${x}, ${y})">
        ${this.marioStanding(0, 0, size).replace(
          'y="${size * 0.1}"',
          'y="${size * 0.05}" transform="rotate(20)"'
        )}
        <!-- Motion lines -->
        ${Array.from({ length: 3 }, (_, i) => 
          `<line x1="${-size * 0.6 - i * 10}" y1="${-size * 0.3 + i * 15}" 
                 x2="${-size * 0.5 - i * 10}" y2="${-size * 0.3 + i * 15}" 
                 stroke="#888" stroke-width="2" opacity="${0.6 - i * 0.2}"/>`
        ).join('')}
      </g>
    `;
  }

  marioWaving(x, y, size) {
    return `
      <g transform="translate(${x}, ${y})">
        ${this.marioStanding(0, 0, size).replace(
          'x="${size * 0.23}" y="${-size * 0.2}"',
          'x="${size * 0.23}" y="${-size * 0.5}" transform="rotate(-45 ' + (size * 0.29) + ' ' + (-size * 0.2) + ')"'
        )}
      </g>
    `;
  }

  /**
   * Create Luigi character (green variant)
   */
  createLuigi(action, x, y, size) {
    // Similar to Mario but with green colors
    return this.createMario(action, x, y, size)
      .replace(/#FF0000/g, '#00AA00')
      .replace(/M</g, 'L<');
  }

  /**
   * Create Robot character
   */
  createRobot(action, x, y, size) {
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Head -->
        <rect x="${-size * 0.25}" y="${-size * 0.7}" width="${size * 0.5}" height="${size * 0.3}" 
              fill="#607D8B" stroke="#000" stroke-width="2" rx="5"/>
        <circle cx="${-size * 0.12}" cy="${-size * 0.55}" r="${size * 0.06}" fill="#00E5FF"/>
        <circle cx="${size * 0.12}" cy="${-size * 0.55}" r="${size * 0.06}" fill="#00E5FF"/>
        <rect x="${-size * 0.08}" y="${-size * 0.48}" width="${size * 0.16}" height="${size * 0.04}" 
              fill="#FF5722" rx="2"/>
        
        <!-- Body -->
        <rect x="${-size * 0.3}" y="${-size * 0.35}" width="${size * 0.6}" height="${size * 0.5}" 
              fill="#78909C" stroke="#000" stroke-width="2" rx="5"/>
        
        <!-- Arms -->
        <rect x="${-size * 0.45}" y="${-size * 0.3}" width="${size * 0.12}" height="${size * 0.4}" 
              fill="#90A4AE" stroke="#000" stroke-width="2" rx="3"/>
        <rect x="${size * 0.33}" y="${-size * 0.3}" width="${size * 0.12}" height="${size * 0.4}" 
              fill="#90A4AE" stroke="#000" stroke-width="2" rx="3"/>
        
        <!-- Legs -->
        <rect x="${-size * 0.2}" y="${size * 0.15}" width="${size * 0.15}" height="${size * 0.35}" 
              fill="#78909C" stroke="#000" stroke-width="2" rx="3"/>
        <rect x="${size * 0.05}" y="${size * 0.15}" width="${size * 0.15}" height="${size * 0.35}" 
              fill="#78909C" stroke="#000" stroke-width="2" rx="3"/>
      </g>
    `;
  }

  /**
   * Create Scientist character
   */
  createScientist(action, x, y, size) {
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Head -->
        <circle cy="${-size * 0.5}" r="${size * 0.22}" fill="#FFD7B5" stroke="#000" stroke-width="2"/>
        
        <!-- Hair -->
        <path d="M ${-size * 0.22} ${-size * 0.65} Q ${-size * 0.1} ${-size * 0.75} 0 ${-size * 0.72} 
                 Q ${size * 0.1} ${-size * 0.75} ${size * 0.22} ${-size * 0.65}" 
              fill="#8B4513" stroke="#000" stroke-width="2"/>
        
        <!-- Glasses -->
        <circle cx="${-size * 0.1}" cy="${-size * 0.52}" r="${size * 0.08}" 
                fill="none" stroke="#000" stroke-width="2"/>
        <circle cx="${size * 0.1}" cy="${-size * 0.52}" r="${size * 0.08}" 
                fill="none" stroke="#000" stroke-width="2"/>
        <line x1="${-size * 0.02}" y1="${-size * 0.52}" x2="${size * 0.02}" y2="${-size * 0.52}" 
              stroke="#000" stroke-width="2"/>
        
        <!-- Lab coat -->
        <rect x="${-size * 0.28}" y="${-size * 0.28}" width="${size * 0.56}" height="${size * 0.6}" 
              fill="#FFF" stroke="#000" stroke-width="2" rx="5"/>
        
        <!-- Buttons -->
        <circle cy="${-size * 0.1}" r="${size * 0.03}" fill="#000"/>
        <circle cy="0" r="${size * 0.03}" fill="#000"/>
        <circle cy="${size * 0.1}" r="${size * 0.03}" fill="#000"/>
        
        <!-- Arms -->
        <rect x="${-size * 0.42}" y="${-size * 0.25}" width="${size * 0.12}" height="${size * 0.35}" 
              fill="#FFD7B5" stroke="#000" stroke-width="2" rx="5"/>
        <rect x="${size * 0.3}" y="${-size * 0.25}" width="${size * 0.12}" height="${size * 0.35}" 
              fill="#FFD7B5" stroke="#000" stroke-width="2" rx="5"/>
        
        <!-- Legs -->
        <rect x="${-size * 0.15}" y="${size * 0.32}" width="${size * 0.12}" height="${size * 0.25}" 
              fill="#333" stroke="#000" stroke-width="2" rx="3"/>
        <rect x="${size * 0.03}" y="${size * 0.32}" width="${size * 0.12}" height="${size * 0.25}" 
              fill="#333" stroke="#000" stroke-width="2" rx="3"/>
        
        <!-- Shoes -->
        <ellipse cx="${-size * 0.09}" cy="${size * 0.59}" rx="${size * 0.1}" ry="${size * 0.06}" 
                 fill="#000" stroke="#000" stroke-width="1"/>
        <ellipse cx="${size * 0.09}" cy="${size * 0.59}" rx="${size * 0.1}" ry="${size * 0.06}" 
                 fill="#000" stroke="#000" stroke-width="1"/>
      </g>
    `;
  }
}

export default CharacterVectorGenerator;
