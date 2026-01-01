/**
 * 🚀 Space Theme Vector Generator
 * Planets, rockets, stars, and cosmic elements
 */

export class SpaceVectorGenerator {
  constructor() {
    this.theme = 'space';
  }

  /**
   * Generate a planet
   */
  generatePlanet(x = 0, y = 0, radius = 80, type = 'earth') {
    const planetStyles = {
      earth: { base: '#4A90E2', spots: '#2ECC71', ring: false },
      mars: { base: '#E74C3C', spots: '#C0392B', ring: false },
      saturn: { base: '#F39C12', spots: '#E67E22', ring: true },
      jupiter: { base: '#E67E22', spots: '#D35400', ring: false },
    };
    
    const style = planetStyles[type] || planetStyles.earth;
    
    let planet = `<g transform="translate(${x}, ${y})">`;
    
    // Planet body
    planet += `<circle r="${radius}" fill="${style.base}" stroke="#000" stroke-width="2"/>`;
    
    // Surface features
    planet += `<circle cx="${radius * 0.3}" cy="${-radius * 0.2}" r="${radius * 0.3}" 
                      fill="${style.spots}" opacity="0.5"/>`;
    planet += `<circle cx="${-radius * 0.4}" cy="${radius * 0.3}" r="${radius * 0.25}" 
                      fill="${style.spots}" opacity="0.5"/>`;
    
    // Highlight
    planet += `<ellipse cx="${-radius * 0.3}" cy="${-radius * 0.3}" 
                       rx="${radius * 0.3}" ry="${radius * 0.4}" 
                       fill="#FFF" opacity="0.3"/>`;
    
    // Ring (for Saturn)
    if (style.ring) {
      planet += `<ellipse rx="${radius * 1.5}" ry="${radius * 0.3}" 
                         fill="none" stroke="${style.spots}" stroke-width="8" opacity="0.7"/>`;
      planet += `<ellipse rx="${radius * 1.3}" ry="${radius * 0.25}" 
                         fill="none" stroke="${style.base}" stroke-width="4" opacity="0.5"/>`;
    }
    
    planet += `</g>`;
    return planet;
  }

  /**
   * Generate a rocket
   */
  generateRocket(x = 0, y = 0, size = 100) {
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Body -->
        <rect x="${-size * 0.2}" y="${-size * 0.6}" width="${size * 0.4}" height="${size * 0.8}" 
              fill="#E74C3C" stroke="#000" stroke-width="2" rx="5"/>
        
        <!-- Nose cone -->
        <polygon points="0,${-size * 0.6} ${-size * 0.2},${-size * 0.4} ${size * 0.2},${-size * 0.4}" 
                 fill="#C0392B" stroke="#000" stroke-width="2"/>
        
        <!-- Window -->
        <circle cy="${-size * 0.4}" r="${size * 0.12}" fill="#64B5F6" stroke="#000" stroke-width="2"/>
        <circle cy="${-size * 0.4}" r="${size * 0.08}" fill="#BBDEFB" opacity="0.7"/>
        
        <!-- Fins -->
        <polygon points="${-size * 0.2},${size * 0.1} ${-size * 0.4},${size * 0.3} ${-size * 0.2},${size * 0.2}" 
                 fill="#2C3E50" stroke="#000" stroke-width="2"/>
        <polygon points="${size * 0.2},${size * 0.1} ${size * 0.4},${size * 0.3} ${size * 0.2},${size * 0.2}" 
                 fill="#2C3E50" stroke="#000" stroke-width="2"/>
        
        <!-- Flame -->
        <ellipse cy="${size * 0.25}" rx="${size * 0.15}" ry="${size * 0.2}" 
                 fill="#FF9800" opacity="0.8"/>
        <ellipse cy="${size * 0.3}" rx="${size * 0.1}" ry="${size * 0.15}" 
                 fill="#FFC107" opacity="0.9"/>
        <ellipse cy="${size * 0.35}" rx="${size * 0.06}" ry="${size * 0.1}" 
                 fill="#FFEB3B"/>
      </g>
    `;
  }

  /**
   * Generate stars field
   */
  generateStarField(width = 800, height = 600, count = 100) {
    let stars = '';
    
    for (let i = 0; i < count; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = 0.5 + Math.random() * 2;
      const opacity = 0.3 + Math.random() * 0.7;
      
      stars += `<circle cx="${x}" cy="${y}" r="${size}" fill="#FFF" opacity="${opacity}"/>`;
    }
    
    return `<g>${stars}</g>`;
  }

  /**
   * Generate a nebula cloud
   */
  generateNebula(x = 0, y = 0, size = 300) {
    return `
      <g transform="translate(${x}, ${y})" opacity="0.6">
        <ellipse rx="${size}" ry="${size * 0.7}" fill="url(#nebulaGradient1)" opacity="0.5"/>
        <ellipse cx="${size * 0.3}" cy="${size * 0.2}" rx="${size * 0.8}" ry="${size * 0.5}" 
                 fill="url(#nebulaGradient2)" opacity="0.4"/>
        <ellipse cx="${-size * 0.2}" cy="${-size * 0.1}" rx="${size * 0.6}" ry="${size * 0.4}" 
                 fill="url(#nebulaGradient3)" opacity="0.3"/>
      </g>
    `;
  }

  /**
   * Generate asteroid
   */
  generateAsteroid(x = 0, y = 0, size = 40) {
    // Create irregular shape
    const points = [];
    const numPoints = 8;
    
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2;
      const variation = 0.7 + Math.random() * 0.6;
      const radius = size * variation;
      points.push(`${x + Math.cos(angle) * radius},${y + Math.sin(angle) * radius}`);
    }
    
    return `
      <g>
        <polygon points="${points.join(' ')}" fill="#8B7355" stroke="#000" stroke-width="2"/>
        <circle cx="${x + size * 0.2}" cy="${y - size * 0.2}" r="${size * 0.15}" 
                fill="#6D5D4B" opacity="0.7"/>
        <circle cx="${x - size * 0.3}" cy="${y + size * 0.1}" r="${size * 0.2}" 
                fill="#6D5D4B" opacity="0.7"/>
      </g>
    `;
  }

  /**
   * Generate a complete space scene
   */
  generateSpaceScene(width = 800, height = 600) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
        <defs>
          <radialGradient id="nebulaGradient1">
            <stop offset="0%" style="stop-color:#9B59B6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#8E44AD;stop-opacity:0" />
          </radialGradient>
          <radialGradient id="nebulaGradient2">
            <stop offset="0%" style="stop-color:#3498DB;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#2980B9;stop-opacity:0" />
          </radialGradient>
          <radialGradient id="nebulaGradient3">
            <stop offset="0%" style="stop-color:#E74C3C;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#C0392B;stop-opacity:0" />
          </radialGradient>
        </defs>
        
        <!-- Space background -->
        <rect width="${width}" height="${height}" fill="#0A0E27"/>
        
        <!-- Stars -->
        ${this.generateStarField(width, height, 150)}
        
        <!-- Nebula -->
        ${this.generateNebula(width * 0.7, height * 0.3, 200)}
        
        <!-- Planets -->
        ${this.generatePlanet(150, 150, 60, 'earth')}
        ${this.generatePlanet(width * 0.7, height * 0.6, 70, 'mars')}
        ${this.generatePlanet(width * 0.5, height * 0.8, 50, 'jupiter')}
        ${this.generatePlanet(width * 0.4, 120, 80, 'saturn')}
        
        <!-- Rocket -->
        ${this.generateRocket(width * 0.3, height * 0.5, 80)}
        
        <!-- Asteroids -->
        ${this.generateAsteroid(width * 0.6, height * 0.4, 30)}
        ${this.generateAsteroid(width * 0.8, height * 0.2, 25)}
        ${this.generateAsteroid(width * 0.2, height * 0.7, 35)}
        
        <!-- Title -->
        <text x="${width / 2}" y="40" font-size="28" font-weight="bold" 
              text-anchor="middle" fill="#FFF" font-family="sans-serif">SPACE EXPLORATION</text>
      </svg>
    `;
  }
}

export default SpaceVectorGenerator;
