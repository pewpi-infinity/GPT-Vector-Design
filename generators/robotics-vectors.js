/**
 * 🤖 Robotics Theme Vector Generator
 * Robot schematics, mechanical linkages, and assembly diagrams
 */

export class RoboticsVectorGenerator {
  constructor() {
    this.theme = 'robotics';
  }

  /**
   * Generate a simple robot schematic
   */
  generateRobotSchematic(x = 0, y = 0, size = 200) {
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Head -->
        <rect x="${size * 0.3}" y="0" width="${size * 0.4}" height="${size * 0.25}" 
              fill="#607D8B" stroke="#000" stroke-width="2" rx="5"/>
        <circle cx="${size * 0.4}" cy="${size * 0.12}" r="${size * 0.04}" fill="#00E5FF"/>
        <circle cx="${size * 0.6}" cy="${size * 0.12}" r="${size * 0.04}" fill="#00E5FF"/>
        <rect x="${size * 0.42}" y="${size * 0.18}" width="${size * 0.16}" height="${size * 0.03}" 
              fill="#FF5722" rx="2"/>
        
        <!-- Antenna -->
        <line x1="${size * 0.5}" y1="0" x2="${size * 0.5}" y2="${-size * 0.1}" 
              stroke="#FFD700" stroke-width="2"/>
        <circle cx="${size * 0.5}" cy="${-size * 0.1}" r="${size * 0.03}" fill="#FFD700"/>
        
        <!-- Body -->
        <rect x="${size * 0.25}" y="${size * 0.25}" width="${size * 0.5}" height="${size * 0.4}" 
              fill="#78909C" stroke="#000" stroke-width="2" rx="5"/>
        
        <!-- Control panel -->
        <rect x="${size * 0.3}" y="${size * 0.32}" width="${size * 0.4}" height="${size * 0.25}" 
              fill="#263238" stroke="#00E5FF" stroke-width="1"/>
        
        <!-- Buttons -->
        <circle cx="${size * 0.35}" cy="${size * 0.38}" r="${size * 0.025}" fill="#4CAF50"/>
        <circle cx="${size * 0.5}" cy="${size * 0.38}" r="${size * 0.025}" fill="#FFC107"/>
        <circle cx="${size * 0.65}" cy="${size * 0.38}" r="${size * 0.025}" fill="#F44336"/>
        
        <!-- LED indicators -->
        <rect x="${size * 0.33}" y="${size * 0.47}" width="${size * 0.34}" height="${size * 0.06}" 
              fill="#000" stroke="#00E5FF" stroke-width="1"/>
        
        <!-- Arms -->
        <rect x="${size * 0.1}" y="${size * 0.3}" width="${size * 0.12}" height="${size * 0.25}" 
              fill="#90A4AE" stroke="#000" stroke-width="2" rx="3"/>
        <circle cx="${size * 0.16}" cy="${size * 0.42}" r="${size * 0.04}" fill="#546E7A" stroke="#000" stroke-width="1"/>
        <rect x="${size * 0.14}" y="${size * 0.55}" width="${size * 0.08}" height="${size * 0.15}" 
              fill="#90A4AE" stroke="#000" stroke-width="2" rx="3"/>
        
        <rect x="${size * 0.78}" y="${size * 0.3}" width="${size * 0.12}" height="${size * 0.25}" 
              fill="#90A4AE" stroke="#000" stroke-width="2" rx="3"/>
        <circle cx="${size * 0.84}" cy="${size * 0.42}" r="${size * 0.04}" fill="#546E7A" stroke="#000" stroke-width="1"/>
        <rect x="${size * 0.78}" y="${size * 0.55}" width="${size * 0.08}" height="${size * 0.15}" 
              fill="#90A4AE" stroke="#000" stroke-width="2" rx="3"/>
        
        <!-- Legs -->
        <rect x="${size * 0.3}" y="${size * 0.65}" width="${size * 0.15}" height="${size * 0.25}" 
              fill="#78909C" stroke="#000" stroke-width="2" rx="3"/>
        <rect x="${size * 0.3}" y="${size * 0.9}" width="${size * 0.15}" height="${size * 0.1}" 
              fill="#263238" stroke="#000" stroke-width="2" rx="2"/>
        
        <rect x="${size * 0.55}" y="${size * 0.65}" width="${size * 0.15}" height="${size * 0.25}" 
              fill="#78909C" stroke="#000" stroke-width="2" rx="3"/>
        <rect x="${size * 0.55}" y="${size * 0.9}" width="${size * 0.15}" height="${size * 0.1}" 
              fill="#263238" stroke="#000" stroke-width="2" rx="2"/>
      </g>
    `;
  }

  /**
   * Generate a gear system
   */
  generateGear(x = 0, y = 0, radius = 50, teeth = 12, innerRadius = 20) {
    const points = [];
    const toothHeight = radius * 0.2;
    const toothWidth = (2 * Math.PI * radius) / teeth / 3;
    
    for (let i = 0; i < teeth; i++) {
      const angle1 = (i / teeth) * 2 * Math.PI;
      const angle2 = ((i + 0.4) / teeth) * 2 * Math.PI;
      const angle3 = ((i + 0.6) / teeth) * 2 * Math.PI;
      const angle4 = ((i + 1) / teeth) * 2 * Math.PI;
      
      // Base of tooth
      points.push(`${x + Math.cos(angle1) * radius},${y + Math.sin(angle1) * radius}`);
      // Top of tooth
      points.push(`${x + Math.cos(angle2) * (radius + toothHeight)},${y + Math.sin(angle2) * (radius + toothHeight)}`);
      points.push(`${x + Math.cos(angle3) * (radius + toothHeight)},${y + Math.sin(angle3) * (radius + toothHeight)}`);
      // Other base
      points.push(`${x + Math.cos(angle4) * radius},${y + Math.sin(angle4) * radius}`);
    }
    
    return `
      <g>
        <!-- Gear teeth -->
        <polygon points="${points.join(' ')}" fill="#B0BEC5" stroke="#000" stroke-width="2"/>
        
        <!-- Inner circle -->
        <circle cx="${x}" cy="${y}" r="${innerRadius}" fill="#546E7A" stroke="#000" stroke-width="2"/>
        
        <!-- Center hole -->
        <circle cx="${x}" cy="${y}" r="${innerRadius * 0.4}" fill="#263238" stroke="#000" stroke-width="1"/>
        
        <!-- Spokes -->
        ${Array.from({ length: 4 }, (_, i) => {
          const angle = (i * Math.PI / 2);
          const spokeStart = innerRadius;
          const spokeEnd = radius * 0.8;
          return `<line x1="${x + Math.cos(angle) * spokeStart}" y1="${y + Math.sin(angle) * spokeStart}"
                        x2="${x + Math.cos(angle) * spokeEnd}" y2="${y + Math.sin(angle) * spokeEnd}"
                        stroke="#37474F" stroke-width="4"/>`;
        }).join('')}
      </g>
    `;
  }

  /**
   * Generate mechanical linkage
   */
  generateLinkage(x = 0, y = 0, length = 150) {
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Base mount -->
        <rect x="0" y="-15" width="30" height="30" fill="#455A64" stroke="#000" stroke-width="2" rx="3"/>
        <circle cx="15" cy="0" r="8" fill="#263238" stroke="#000" stroke-width="2"/>
        
        <!-- Link 1 -->
        <line x1="15" y1="0" x2="${length * 0.6}" y2="${-length * 0.3}" 
              stroke="#78909C" stroke-width="10" stroke-linecap="round"/>
        
        <!-- Joint 1 -->
        <circle cx="${length * 0.6}" cy="${-length * 0.3}" r="12" fill="#546E7A" stroke="#000" stroke-width="2"/>
        <circle cx="${length * 0.6}" cy="${-length * 0.3}" r="6" fill="#263238"/>
        
        <!-- Link 2 -->
        <line x1="${length * 0.6}" y1="${-length * 0.3}" x2="${length}" y2="${-length * 0.1}" 
              stroke="#78909C" stroke-width="8" stroke-linecap="round"/>
        
        <!-- End effector -->
        <g transform="translate(${length}, ${-length * 0.1})">
          <circle r="15" fill="#FF5722" stroke="#000" stroke-width="2"/>
          <line x1="-8" y1="-8" x2="8" y2="8" stroke="#FFF" stroke-width="2"/>
          <line x1="-8" y1="8" x2="8" y2="-8" stroke="#FFF" stroke-width="2"/>
        </g>
      </g>
    `;
  }

  /**
   * Generate assembly line diagram
   */
  generateAssemblyLine(x = 0, y = 0, width = 500, height = 150) {
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Conveyor belt -->
        <rect x="0" y="${height * 0.6}" width="${width}" height="${height * 0.2}" 
              fill="#546E7A" stroke="#000" stroke-width="2"/>
        
        <!-- Belt pattern -->
        ${Array.from({ length: 20 }, (_, i) => {
          const xPos = (i / 20) * width;
          return `<line x1="${xPos}" y1="${height * 0.62}" x2="${xPos + 20}" y2="${height * 0.78}" 
                        stroke="#37474F" stroke-width="2"/>`;
        }).join('')}
        
        <!-- Rollers -->
        ${Array.from({ length: 6 }, (_, i) => {
          const xPos = (i / 5) * (width - 40) + 20;
          return `<circle cx="${xPos}" cy="${height * 0.7}" r="15" fill="#263238" stroke="#000" stroke-width="2"/>`;
        }).join('')}
        
        <!-- Parts on belt -->
        <rect x="${width * 0.15}" y="${height * 0.4}" width="40" height="30" 
              fill="#4CAF50" stroke="#000" stroke-width="2" rx="3"/>
        <rect x="${width * 0.45}" y="${height * 0.4}" width="40" height="30" 
              fill="#2196F3" stroke="#000" stroke-width="2" rx="3"/>
        <rect x="${width * 0.75}" y="${height * 0.4}" width="40" height="30" 
              fill="#FF9800" stroke="#000" stroke-width="2" rx="3"/>
        
        <!-- Robot arms above -->
        <g transform="translate(${width * 0.3}, ${height * 0.1})">
          <rect x="-5" y="0" width="10" height="40" fill="#607D8B" stroke="#000" stroke-width="2" rx="2"/>
          <circle cy="40" r="8" fill="#FF5722" stroke="#000" stroke-width="2"/>
        </g>
        
        <g transform="translate(${width * 0.7}, ${height * 0.1})">
          <rect x="-5" y="0" width="10" height="40" fill="#607D8B" stroke="#000" stroke-width="2" rx="2"/>
          <circle cy="40" r="8" fill="#FF5722" stroke="#000" stroke-width="2"/>
        </g>
      </g>
    `;
  }

  /**
   * Generate sensor icons
   */
  generateSensorIcon(x = 0, y = 0, size = 60, type = 'ultrasonic') {
    let sensorSvg = `<g transform="translate(${x}, ${y})">`;
    
    switch (type) {
      case 'ultrasonic':
        sensorSvg += `
          <rect width="${size}" height="${size * 0.6}" fill="#263238" stroke="#00E5FF" stroke-width="2" rx="5"/>
          <circle cx="${size * 0.3}" cy="${size * 0.3}" r="${size * 0.12}" fill="#546E7A" stroke="#000" stroke-width="1"/>
          <circle cx="${size * 0.7}" cy="${size * 0.3}" r="${size * 0.12}" fill="#546E7A" stroke="#000" stroke-width="1"/>
          ${Array.from({ length: 3 }, (_, i) => {
            const arc = size * (0.2 + i * 0.15);
            return `<path d="M ${size * 0.5 - arc / 2} ${size * 0.6} Q ${size * 0.5} ${size * 0.6 + arc / 2} ${size * 0.5 + arc / 2} ${size * 0.6}" 
                          stroke="#00E5FF" stroke-width="1" fill="none" opacity="${0.8 - i * 0.2}"/>`;
          }).join('')}
        `;
        break;
      case 'infrared':
        sensorSvg += `
          <circle cx="${size * 0.5}" cy="${size * 0.5}" r="${size * 0.4}" fill="#1A237E" stroke="#000" stroke-width="2"/>
          <circle cx="${size * 0.5}" cy="${size * 0.5}" r="${size * 0.25}" fill="#FF1744" opacity="0.7"/>
          ${Array.from({ length: 3 }, (_, i) => {
            const lineAngle = (i - 1) * Math.PI / 8;
            const x1 = size * 0.5 + Math.cos(lineAngle) * size * 0.3;
            const y1 = size * 0.5 + Math.sin(lineAngle) * size * 0.3;
            const x2 = size * 0.5 + Math.cos(lineAngle) * size * 0.5;
            const y2 = size * 0.5 + Math.sin(lineAngle) * size * 0.5;
            return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#FF1744" stroke-width="2"/>`;
          }).join('')}
        `;
        break;
      case 'camera':
        sensorSvg += `
          <rect width="${size}" height="${size * 0.7}" fill="#37474F" stroke="#000" stroke-width="2" rx="5"/>
          <circle cx="${size * 0.5}" cy="${size * 0.35}" r="${size * 0.2}" fill="#1565C0" stroke="#000" stroke-width="2"/>
          <circle cx="${size * 0.5}" cy="${size * 0.35}" r="${size * 0.12}" fill="#90CAF9" opacity="0.6"/>
          <rect x="${size * 0.75}" y="${size * 0.12}" width="${size * 0.15}" height="${size * 0.1}" fill="#F44336" rx="2"/>
        `;
        break;
    }
    
    sensorSvg += `</g>`;
    return sensorSvg;
  }

  /**
   * Generate a complete robotics scene
   */
  generateRoboticsScene(width = 800, height = 600) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
        <!-- Background -->
        <rect width="${width}" height="${height}" fill="#ECEFF1"/>
        
        <!-- Grid floor -->
        ${Array.from({ length: 20 }, (_, i) => 
          `<line x1="0" y1="${height * 0.7 + i * 20}" x2="${width}" y2="${height * 0.7 + i * 20}" 
                 stroke="#CFD8DC" stroke-width="1"/>`
        ).join('')}
        
        <!-- Robot -->
        ${this.generateRobotSchematic(80, 250, 150)}
        
        <!-- Gear system -->
        ${this.generateGear(400, 150, 60, 16, 25)}
        ${this.generateGear(500, 150, 45, 12, 20)}
        <line x1="400" y1="150" x2="500" y2="150" stroke="#FF5722" stroke-width="3" stroke-dasharray="5,5"/>
        
        <!-- Mechanical linkage -->
        ${this.generateLinkage(550, 300, 180)}
        
        <!-- Assembly line -->
        ${this.generateAssemblyLine(50, 420, 500, 120)}
        
        <!-- Sensors -->
        ${this.generateSensorIcon(620, 420, 60, 'ultrasonic')}
        ${this.generateSensorIcon(700, 420, 60, 'infrared')}
        ${this.generateSensorIcon(620, 500, 60, 'camera')}
        
        <!-- Title -->
        <text x="${width / 2}" y="30" font-size="24" font-weight="bold" 
              text-anchor="middle" fill="#263238">Robotics Systems</text>
      </svg>
    `;
  }
}

export default RoboticsVectorGenerator;
