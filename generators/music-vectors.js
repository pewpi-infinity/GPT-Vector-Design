/**
 * 🎵 Music Theme Vector Generator
 * Musical instruments, notes, and audio visualizations
 */

export class MusicVectorGenerator {
  constructor() {
    this.theme = 'music';
  }

  /**
   * Generate a guitar
   */
  generateGuitar(x = 0, y = 0, size = 200) {
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Body -->
        <ellipse cy="${size * 0.5}" rx="${size * 0.35}" ry="${size * 0.4}" 
                 fill="#D2691E" stroke="#000" stroke-width="3"/>
        <ellipse cy="${size * 0.5}" rx="${size * 0.25}" ry="${size * 0.3}" 
                 fill="#F4A460" opacity="0.5"/>
        
        <!-- Sound hole -->
        <circle cy="${size * 0.5}" r="${size * 0.12}" fill="#000"/>
        <circle cy="${size * 0.5}" r="${size * 0.15}" fill="none" stroke="#8B4513" stroke-width="2"/>
        
        <!-- Bridge -->
        <rect x="${-size * 0.15}" y="${size * 0.65}" width="${size * 0.3}" height="${size * 0.05}" 
              fill="#654321" stroke="#000" stroke-width="1" rx="2"/>
        
        <!-- Neck -->
        <rect x="${-size * 0.08}" y="${-size * 0.1}" width="${size * 0.16}" height="${size * 0.25}" 
              fill="#8B4513" stroke="#000" stroke-width="2"/>
        
        <!-- Frets -->
        ${Array.from({ length: 5 }, (_, i) => 
          `<line x1="${-size * 0.08}" y1="${size * 0.02 * (i + 1)}" 
                 x2="${size * 0.08}" y2="${size * 0.02 * (i + 1)}" 
                 stroke="#DDD" stroke-width="1.5"/>`
        ).join('')}
        
        <!-- Strings -->
        ${Array.from({ length: 6 }, (_, i) => 
          `<line x1="${-size * 0.06 + i * size * 0.024}" y1="${-size * 0.1}" 
                 x2="${-size * 0.15 + i * size * 0.06}" y2="${size * 0.7}" 
                 stroke="#C0C0C0" stroke-width="0.5"/>`
        ).join('')}
        
        <!-- Headstock -->
        <rect x="${-size * 0.1}" y="${-size * 0.2}" width="${size * 0.2}" height="${size * 0.1}" 
              fill="#654321" stroke="#000" stroke-width="2" rx="3"/>
        
        <!-- Tuning pegs -->
        ${Array.from({ length: 3 }, (_, i) => 
          `<circle cx="${-size * 0.08 + i * size * 0.08}" cy="${-size * 0.18}" r="${size * 0.02}" 
                   fill="#FFD700" stroke="#000" stroke-width="1"/>`
        ).join('')}
        ${Array.from({ length: 3 }, (_, i) => 
          `<circle cx="${-size * 0.08 + i * size * 0.08}" cy="${-size * 0.12}" r="${size * 0.02}" 
                   fill="#FFD700" stroke="#000" stroke-width="1"/>`
        ).join('')}
      </g>
    `;
  }

  /**
   * Generate a piano keyboard
   */
  generatePiano(x = 0, y = 0, width = 400, height = 100) {
    const whiteKeyWidth = width / 14;
    const blackKeyWidth = whiteKeyWidth * 0.6;
    const blackKeyHeight = height * 0.6;
    
    let piano = `<g transform="translate(${x}, ${y})">`;
    
    // White keys
    for (let i = 0; i < 14; i++) {
      piano += `<rect x="${i * whiteKeyWidth}" y="0" width="${whiteKeyWidth - 2}" height="${height}" 
                     fill="#FFF" stroke="#000" stroke-width="2" rx="3"/>`;
    }
    
    // Black keys pattern: 2, skip, 3, skip (repeating)
    const blackKeyPattern = [0, 1, 3, 4, 5]; // positions in octave
    for (let octave = 0; octave < 2; octave++) {
      blackKeyPattern.forEach(pos => {
        const xPos = (octave * 7 + pos) * whiteKeyWidth + whiteKeyWidth * 0.7;
        piano += `<rect x="${xPos}" y="0" width="${blackKeyWidth}" height="${blackKeyHeight}" 
                       fill="#000" stroke="#000" stroke-width="1" rx="2"/>`;
      });
    }
    
    piano += `</g>`;
    return piano;
  }

  /**
   * Generate musical notes
   */
  generateMusicNote(x = 0, y = 0, size = 40, type = 'quarter') {
    let note = `<g transform="translate(${x}, ${y})">`;
    
    // Note head
    note += `<ellipse cy="0" rx="${size * 0.3}" ry="${size * 0.25}" 
                     fill="#000" transform="rotate(-20)"/>`;
    
    // Stem
    if (type !== 'whole') {
      note += `<rect x="${size * 0.25}" y="${-size * 1.5}" width="${size * 0.08}" height="${size * 1.5}" 
                    fill="#000"/>`;
    }
    
    // Flag
    if (type === 'eighth') {
      note += `<path d="M ${size * 0.33} ${-size * 1.5} Q ${size * 0.7} ${-size * 1.3} ${size * 0.5} ${-size * 0.9}" 
                     fill="#000"/>`;
    } else if (type === 'sixteenth') {
      note += `<path d="M ${size * 0.33} ${-size * 1.5} Q ${size * 0.7} ${-size * 1.3} ${size * 0.5} ${-size * 0.9}" 
                     fill="#000"/>`;
      note += `<path d="M ${size * 0.33} ${-size * 1.2} Q ${size * 0.7} ${-size * 1.0} ${size * 0.5} ${-size * 0.6}" 
                     fill="#000"/>`;
    }
    
    note += `</g>`;
    return note;
  }

  /**
   * Generate a staff with notes
   */
  generateStaff(x = 0, y = 0, width = 500, height = 80) {
    let staff = `<g transform="translate(${x}, ${y})">`;
    
    // Staff lines
    for (let i = 0; i < 5; i++) {
      const lineY = i * (height / 4);
      staff += `<line x1="0" y1="${lineY}" x2="${width}" y2="${lineY}" 
                     stroke="#000" stroke-width="2"/>`;
    }
    
    // Treble clef (simplified)
    staff += `<path d="M 20 ${height / 2} Q 25 ${height * 0.2} 35 ${height * 0.3} 
                        Q 40 ${height * 0.5} 30 ${height * 0.7} 
                        Q 25 ${height * 0.9} 30 ${height}" 
                   stroke="#000" stroke-width="3" fill="none"/>`;
    staff += `<circle cx="30" cy="${height * 0.6}" r="8" fill="none" stroke="#000" stroke-width="3"/>`;
    
    // Notes on staff
    const notePositions = [
      { x: 100, y: height / 2, type: 'quarter' },
      { x: 150, y: height * 0.375, type: 'quarter' },
      { x: 200, y: height * 0.25, type: 'eighth' },
      { x: 240, y: height * 0.25, type: 'eighth' },
      { x: 290, y: height * 0.375, type: 'quarter' },
      { x: 340, y: height / 2, type: 'half' },
    ];
    
    notePositions.forEach(note => {
      staff += this.generateMusicNote(note.x, note.y, 20, note.type);
    });
    
    staff += `</g>`;
    return staff;
  }

  /**
   * Generate audio waveform visualization
   */
  generateWaveform(x = 0, y = 0, width = 400, height = 100) {
    const points = [];
    const centerY = height / 2;
    
    for (let i = 0; i <= width; i += 5) {
      const freq = i / 20;
      const amplitude = Math.sin(freq) * Math.sin(freq / 3) * (height / 2) * 0.8;
      points.push(`${i},${centerY + amplitude}`);
    }
    
    return `
      <g transform="translate(${x}, ${y})">
        <rect width="${width}" height="${height}" fill="#1A1A2E" rx="5"/>
        <polyline points="${points.join(' ')}" fill="none" stroke="#00D9FF" stroke-width="3"/>
        <line x1="0" y1="${centerY}" x2="${width}" y2="${centerY}" 
              stroke="#FF006E" stroke-width="1" opacity="0.3"/>
      </g>
    `;
  }

  /**
   * Generate drum kit
   */
  generateDrumKit(x = 0, y = 0, size = 200) {
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Bass drum -->
        <ellipse cy="${size * 0.7}" rx="${size * 0.4}" ry="${size * 0.15}" 
                 fill="#8B0000" stroke="#000" stroke-width="3"/>
        <ellipse cy="${size * 0.7}" rx="${size * 0.35}" ry="${size * 0.12}" 
                 fill="#A52A2A" opacity="0.7"/>
        <circle cy="${size * 0.7}" r="${size * 0.08}" fill="#FFD700" stroke="#000" stroke-width="2"/>
        
        <!-- Snare drum -->
        <ellipse cx="${size * 0.3}" cy="${size * 0.5}" rx="${size * 0.2}" ry="${size * 0.08}" 
                 fill="#C0C0C0" stroke="#000" stroke-width="2"/>
        <line x1="${size * 0.15}" y1="${size * 0.5}" x2="${size * 0.15}" y2="${size * 0.75}" 
              stroke="#333" stroke-width="4"/>
        <line x1="${size * 0.45}" y1="${size * 0.5}" x2="${size * 0.45}" y2="${size * 0.75}" 
              stroke="#333" stroke-width="4"/>
        
        <!-- Tom drums -->
        <ellipse cx="${-size * 0.25}" cy="${size * 0.3}" rx="${size * 0.18}" ry="${size * 0.07}" 
                 fill="#8B4513" stroke="#000" stroke-width="2"/>
        <ellipse cx="${size * 0.05}" cy="${size * 0.25}" rx="${size * 0.18}" ry="${size * 0.07}" 
                 fill="#8B4513" stroke="#000" stroke-width="2"/>
        
        <!-- Cymbals -->
        <ellipse cx="${-size * 0.4}" cy="${size * 0.1}" rx="${size * 0.25}" ry="${size * 0.05}" 
                 fill="#FFD700" stroke="#000" stroke-width="2" 
                 transform="rotate(-10 ${-size * 0.4} ${size * 0.1})"/>
        <ellipse cx="${size * 0.5}" cy="${size * 0.15}" rx="${size * 0.22}" ry="${size * 0.04}" 
                 fill="#FFD700" stroke="#000" stroke-width="2" 
                 transform="rotate(15 ${size * 0.5} ${size * 0.15})"/>
        
        <!-- Cymbal stands -->
        <line x1="${-size * 0.4}" y1="${size * 0.1}" x2="${-size * 0.4}" y2="${size * 0.75}" 
              stroke="#666" stroke-width="3"/>
        <line x1="${size * 0.5}" y1="${size * 0.15}" x2="${size * 0.5}" y2="${size * 0.75}" 
              stroke="#666" stroke-width="3"/>
      </g>
    `;
  }

  /**
   * Generate a complete music scene
   */
  generateMusicScene(width = 800, height = 600) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
        <!-- Background -->
        <rect width="${width}" height="${height}" fill="#2C2C54"/>
        
        <!-- Stage effect -->
        <rect y="${height * 0.7}" width="${width}" height="${height * 0.3}" fill="#1A1A2E"/>
        
        <!-- Instruments -->
        ${this.generateGuitar(150, 200, 180)}
        ${this.generateDrumKit(500, 200, 180)}
        
        <!-- Piano -->
        ${this.generatePiano(100, height - 180, 600, 80)}
        
        <!-- Musical staff -->
        ${this.generateStaff(50, 50, 500, 80)}
        
        <!-- Waveform -->
        ${this.generateWaveform(width - 450, 50, 400, 100)}
        
        <!-- Floating notes -->
        ${this.generateMusicNote(width - 100, 200, 35, 'eighth')}
        ${this.generateMusicNote(width - 150, 250, 30, 'quarter')}
        ${this.generateMusicNote(width - 80, 280, 32, 'sixteenth')}
        
        <!-- Title -->
        <text x="${width / 2}" y="${height - 30}" font-size="28" font-weight="bold" 
              text-anchor="middle" fill="#FFD700" font-family="sans-serif">MUSIC STUDIO</text>
      </svg>
    `;
  }
}

export default MusicVectorGenerator;
