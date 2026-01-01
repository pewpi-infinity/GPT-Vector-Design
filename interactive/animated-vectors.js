/**
 * Animated Vectors Module
 * Create smooth animations for vector graphics
 */

export class AnimatedVectors {
  constructor() {
    this.animationTypes = [
      'rotate',
      'pulse',
      'float',
      'morph',
      'path',
      'color',
    ];
  }

  /**
   * Generate rotation animation
   */
  generateRotateAnimation(duration = '4s', direction = 'clockwise') {
    const from = direction === 'clockwise' ? '0' : '360';
    const to = direction === 'clockwise' ? '360' : '0';
    
    return `
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="${from}"
        to="${to}"
        dur="${duration}"
        repeatCount="indefinite"/>
    `;
  }

  /**
   * Generate pulse animation
   */
  generatePulseAnimation(minScale = 0.9, maxScale = 1.1, duration = '2s') {
    return `
      <animateTransform
        attributeName="transform"
        type="scale"
        values="${minScale}; ${maxScale}; ${minScale}"
        dur="${duration}"
        repeatCount="indefinite"
        additive="sum"/>
    `;
  }

  /**
   * Generate floating animation
   */
  generateFloatAnimation(distance = 20, duration = '3s') {
    return `
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0 0; 0 ${-distance}; 0 0"
        dur="${duration}"
        repeatCount="indefinite"
        additive="sum"/>
    `;
  }

  /**
   * Generate color animation
   */
  generateColorAnimation(colors = ['#FF0000', '#00FF00', '#0000FF'], duration = '5s') {
    return `
      <animate
        attributeName="fill"
        values="${colors.join('; ')}"
        dur="${duration}"
        repeatCount="indefinite"/>
    `;
  }

  /**
   * Generate opacity fade animation
   */
  generateFadeAnimation(minOpacity = 0.3, maxOpacity = 1, duration = '2s') {
    return `
      <animate
        attributeName="opacity"
        values="${minOpacity}; ${maxOpacity}; ${minOpacity}"
        dur="${duration}"
        repeatCount="indefinite"/>
    `;
  }

  /**
   * Generate path morphing animation
   */
  generatePathMorph(fromPath, toPath, duration = '3s') {
    return `
      <animate
        attributeName="d"
        from="${fromPath}"
        to="${toPath}"
        dur="${duration}"
        repeatCount="indefinite"
        calcMode="linear"/>
    `;
  }

  /**
   * Generate animated gear
   */
  generateAnimatedGear(x = 0, y = 0, radius = 50, teeth = 12, id = 'anim-gear') {
    const innerRadius = radius * 0.4;
    const toothHeight = radius * 0.2;
    const points = [];
    
    for (let i = 0; i < teeth; i++) {
      const angle1 = (i / teeth) * 2 * Math.PI;
      const angle2 = ((i + 0.4) / teeth) * 2 * Math.PI;
      const angle3 = ((i + 0.6) / teeth) * 2 * Math.PI;
      const angle4 = ((i + 1) / teeth) * 2 * Math.PI;
      
      points.push(`${Math.cos(angle1) * radius},${Math.sin(angle1) * radius}`);
      points.push(`${Math.cos(angle2) * (radius + toothHeight)},${Math.sin(angle2) * (radius + toothHeight)}`);
      points.push(`${Math.cos(angle3) * (radius + toothHeight)},${Math.sin(angle3) * (radius + toothHeight)}`);
      points.push(`${Math.cos(angle4) * radius},${Math.sin(angle4) * radius}`);
    }
    
    return `
      <g id="${id}" transform="translate(${x}, ${y})">
        <polygon points="${points.join(' ')}" fill="#B0BEC5" stroke="#000" stroke-width="2"/>
        <circle r="${innerRadius}" fill="#546E7A" stroke="#000" stroke-width="2"/>
        <circle r="${innerRadius * 0.4}" fill="#263238" stroke="#000" stroke-width="1"/>
        
        ${this.generateRotateAnimation('4s', 'clockwise')}
      </g>
    `;
  }

  /**
   * Generate floating mushroom
   */
  generateFloatingMushroom(x = 0, y = 0, size = 64, id = 'float-mushroom') {
    return `
      <g id="${id}" transform="translate(${x}, ${y})">
        <ellipse cx="${size / 2}" cy="${size * 0.35}" rx="${size * 0.45}" ry="${size * 0.35}" 
                 fill="#FF0000" stroke="#000" stroke-width="2"/>
        <circle cx="${size * 0.3}" cy="${size * 0.35}" r="${size * 0.12}" fill="#FFF"/>
        <circle cx="${size * 0.7}" cy="${size * 0.35}" r="${size * 0.12}" fill="#FFF"/>
        <rect x="${size * 0.35}" y="${size * 0.5}" width="${size * 0.3}" height="${size * 0.4}" 
              fill="#FFF" stroke="#000" stroke-width="2" rx="${size * 0.05}"/>
        <circle cx="${size * 0.4}" cy="${size * 0.65}" r="${size * 0.05}" fill="#000"/>
        <circle cx="${size * 0.6}" cy="${size * 0.65}" r="${size * 0.05}" fill="#000"/>
        
        ${this.generateFloatAnimation(15, '3s')}
      </g>
    `;
  }

  /**
   * Generate pulsing heart
   */
  generatePulsingHeart(x = 0, y = 0, size = 80, id = 'pulse-heart') {
    return `
      <g id="${id}" transform="translate(${x}, ${y})">
        <path d="M ${size / 2} ${size * 0.9} 
                 L ${size * 0.2} ${size * 0.4} 
                 C ${size * 0.1} ${size * 0.2}, ${size * 0.2} ${size * 0.1}, ${size * 0.35} ${size * 0.15}
                 C ${size * 0.45} ${size * 0.05}, ${size / 2} ${size * 0.2}, ${size / 2} ${size * 0.3}
                 C ${size / 2} ${size * 0.2}, ${size * 0.55} ${size * 0.05}, ${size * 0.65} ${size * 0.15}
                 C ${size * 0.8} ${size * 0.1}, ${size * 0.9} ${size * 0.2}, ${size * 0.8} ${size * 0.4}
                 Z"
              fill="#FF1744" stroke="#C62828" stroke-width="2"/>
        
        ${this.generatePulseAnimation(0.9, 1.15, '1s')}
      </g>
    `;
  }

  /**
   * Generate spinning star
   */
  generateSpinningStar(x = 0, y = 0, size = 60, id = 'spin-star') {
    const points = [];
    const outerRadius = size * 0.5;
    const innerRadius = size * 0.2;
    
    for (let i = 0; i < 10; i++) {
      const angle = (i * Math.PI) / 5 - Math.PI / 2;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      points.push(`${size / 2 + Math.cos(angle) * radius},${size / 2 + Math.sin(angle) * radius}`);
    }
    
    return `
      <g id="${id}" transform="translate(${x}, ${y})">
        <polygon points="${points.join(' ')}" fill="#FFD700" stroke="#F57F17" stroke-width="2"/>
        <circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.15}" fill="#FFF" opacity="0.7"/>
        
        ${this.generateRotateAnimation('3s', 'clockwise')}
      </g>
    `;
  }

  /**
   * Generate color-changing molecule
   */
  generateColorMolecule(x = 0, y = 0, size = 100, id = 'color-molecule') {
    return `
      <g id="${id}" transform="translate(${x}, ${y})">
        <!-- Center atom -->
        <circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.2}" 
                fill="#FF0000" stroke="#000" stroke-width="2">
          ${this.generateColorAnimation(['#FF0000', '#00FF00', '#0000FF', '#FFFF00'], '4s')}
        </circle>
        
        <!-- Orbiting atoms -->
        ${Array.from({ length: 4 }, (_, i) => {
          const angle = (i * 90) * Math.PI / 180;
          const orbitRadius = size * 0.35;
          const atomX = size / 2 + Math.cos(angle) * orbitRadius;
          const atomY = size / 2 + Math.sin(angle) * orbitRadius;
          
          return `
            <g>
              <line x1="${size / 2}" y1="${size / 2}" x2="${atomX}" y2="${atomY}" 
                    stroke="#555" stroke-width="2"/>
              <circle cx="${atomX}" cy="${atomY}" r="${size * 0.12}" 
                      fill="#42A5F5" stroke="#000" stroke-width="2">
                ${this.generateFadeAnimation(0.5, 1, `${2 + i * 0.5}s`)}
              </circle>
            </g>
          `;
        }).join('')}
      </g>
    `;
  }

  /**
   * Generate animated waveform
   */
  generateAnimatedWaveform(x = 0, y = 0, width = 400, height = 100, id = 'anim-wave') {
    const generateWavePath = (phase) => {
      const points = [];
      const centerY = height / 2;
      for (let i = 0; i <= width; i += 10) {
        const waveY = centerY + Math.sin((i / width) * Math.PI * 4 + phase) * (height * 0.4);
        points.push(`${i},${waveY}`);
      }
      return `M ${points.join(' L ')}`;
    };
    
    const path1 = generateWavePath(0);
    const path2 = generateWavePath(Math.PI / 2);
    const path3 = generateWavePath(Math.PI);
    const path4 = generateWavePath(Math.PI * 1.5);
    
    return `
      <g id="${id}" transform="translate(${x}, ${y})">
        <rect width="${width}" height="${height}" fill="#0A0E27"/>
        <path d="${path1}" fill="none" stroke="#00D9FF" stroke-width="3">
          <animate attributeName="d" 
                   values="${path1}; ${path2}; ${path3}; ${path4}; ${path1}"
                   dur="2s"
                   repeatCount="indefinite"/>
        </path>
      </g>
    `;
  }

  /**
   * Generate complete animated scene
   */
  generateAnimatedScene(width = 800, height = 600) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
        <rect width="${width}" height="${height}" fill="#1A1A2E"/>
        
        <!-- Animated elements -->
        ${this.generateAnimatedGear(150, 150, 60, 16, 'gear1')}
        ${this.generateAnimatedGear(280, 150, 45, 12, 'gear2')}
        
        ${this.generateFloatingMushroom(400, 100, 64, 'mushroom1')}
        ${this.generateFloatingMushroom(550, 130, 56, 'mushroom2')}
        
        ${this.generatePulsingHeart(100, 350, 80, 'heart1')}
        ${this.generateSpinningStar(250, 350, 70, 'star1')}
        
        ${this.generateColorMolecule(450, 320, 100, 'molecule1')}
        
        ${this.generateAnimatedWaveform(100, 480, 600, 100, 'wave1')}
        
        <!-- Title -->
        <text x="${width / 2}" y="40" font-size="28" font-weight="bold" 
              text-anchor="middle" fill="#FFF">Animated Vector Graphics</text>
      </svg>
    `;
  }
}

export default AnimatedVectors;
