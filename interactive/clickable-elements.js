/**
 * Clickable Elements Module
 * Add interactive click behaviors to SVG elements
 */

export class ClickableElements {
  constructor() {
    this.clickHandlers = new Map();
  }

  /**
   * Make an element clickable with animation
   */
  makeClickable(elementId, animationType = 'bounce', callback = null) {
    const animations = {
      bounce: this.createBounceAnimation(),
      pulse: this.createPulseAnimation(),
      spin: this.createSpinAnimation(),
      grow: this.createGrowAnimation(),
    };

    return {
      elementId,
      animation: animations[animationType] || animations.bounce,
      callback,
      svgDefs: this.createAnimationDefs(elementId, animationType),
    };
  }

  /**
   * Create bounce animation definition
   */
  createBounceAnimation() {
    return `
      <animate attributeName="transform" 
               type="translate"
               values="0 0; 0 -20; 0 0"
               dur="0.5s"
               begin="click"
               fill="freeze"/>
    `;
  }

  /**
   * Create pulse animation definition
   */
  createPulseAnimation() {
    return `
      <animate attributeName="opacity"
               values="1; 0.5; 1"
               dur="0.3s"
               begin="click"
               repeatCount="2"/>
    `;
  }

  /**
   * Create spin animation definition
   */
  createSpinAnimation() {
    return `
      <animateTransform attributeName="transform"
                       type="rotate"
                       from="0"
                       to="360"
                       dur="0.8s"
                       begin="click"
                       fill="freeze"/>
    `;
  }

  /**
   * Create grow animation definition
   */
  createGrowAnimation() {
    return `
      <animateTransform attributeName="transform"
                       type="scale"
                       values="1; 1.3; 1"
                       dur="0.4s"
                       begin="click"
                       additive="sum"/>
    `;
  }

  /**
   * Create animation definitions for SVG
   */
  createAnimationDefs(elementId, animationType) {
    return `
      <defs>
        <style>
          #${elementId} {
            cursor: pointer;
            transition: filter 0.2s;
          }
          #${elementId}:hover {
            filter: brightness(1.2);
          }
          #${elementId}:active {
            filter: brightness(0.9);
          }
        </style>
      </defs>
    `;
  }

  /**
   * Generate clickable mushroom that animates
   */
  generateClickableMushroom(x = 0, y = 0, size = 64, id = 'clickable-mushroom') {
    return `
      <g id="${id}" transform="translate(${x}, ${y})">
        ${this.createAnimationDefs(id, 'bounce')}
        
        <!-- Mushroom cap -->
        <ellipse cx="${size / 2}" cy="${size * 0.35}" rx="${size * 0.45}" ry="${size * 0.35}" 
                 fill="#FF0000" stroke="#000" stroke-width="2"/>
        
        <!-- Spots -->
        <circle cx="${size * 0.3}" cy="${size * 0.35}" r="${size * 0.12}" fill="#FFF"/>
        <circle cx="${size * 0.7}" cy="${size * 0.35}" r="${size * 0.12}" fill="#FFF"/>
        
        <!-- Stem -->
        <rect x="${size * 0.35}" y="${size * 0.5}" width="${size * 0.3}" height="${size * 0.4}" 
              fill="#FFF" stroke="#000" stroke-width="2" rx="${size * 0.05}"/>
        
        <!-- Eyes -->
        <circle cx="${size * 0.4}" cy="${size * 0.65}" r="${size * 0.05}" fill="#000"/>
        <circle cx="${size * 0.6}" cy="${size * 0.65}" r="${size * 0.05}" fill="#000"/>
        
        <!-- Smile -->
        <path d="M ${size * 0.35} ${size * 0.75} Q ${size * 0.5} ${size * 0.82} ${size * 0.65} ${size * 0.75}" 
              stroke="#000" stroke-width="2" fill="none"/>
        
        ${this.createBounceAnimation()}
        
        <!-- Sparkle effect on click -->
        <g opacity="0">
          <animate attributeName="opacity" values="0; 1; 0" dur="0.5s" begin="click"/>
          ${Array.from({ length: 8 }, (_, i) => {
            const angle = (i * 45) * Math.PI / 180;
            const x = size / 2 + Math.cos(angle) * size * 0.6;
            const y = size * 0.5 + Math.sin(angle) * size * 0.6;
            return `<circle cx="${x}" cy="${y}" r="${size * 0.08}" fill="#FFD700"/>`;
          }).join('')}
        </g>
      </g>
    `;
  }

  /**
   * Generate clickable button element
   */
  generateClickableButton(x = 0, y = 0, width = 150, height = 50, text = 'Click Me', id = 'clickable-btn') {
    return `
      <g id="${id}" transform="translate(${x}, ${y})">
        ${this.createAnimationDefs(id, 'grow')}
        
        <rect width="${width}" height="${height}" rx="10" 
              fill="url(#buttonGradient)" stroke="#000" stroke-width="2"/>
        
        <text x="${width / 2}" y="${height / 2 + 6}" 
              font-size="18" font-weight="bold" 
              text-anchor="middle" fill="#FFF">${text}</text>
        
        ${this.createGrowAnimation()}
      </g>
      
      <defs>
        <linearGradient id="buttonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#4CAF50;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#45a049;stop-opacity:1" />
        </linearGradient>
      </defs>
    `;
  }

  /**
   * Generate JavaScript for click event handling
   */
  generateClickHandler(elementId, action = 'log') {
    return `
      <script>
        (function() {
          const element = document.getElementById('${elementId}');
          if (element) {
            element.addEventListener('click', function(e) {
              console.log('Clicked: ${elementId}');
              ${action === 'alert' ? `alert('Clicked ${elementId}!');` : ''}
              ${action === 'count' ? `
                if (!this.clickCount) this.clickCount = 0;
                this.clickCount++;
                console.log('Click count: ' + this.clickCount);
              ` : ''}
            });
          }
        })();
      </script>
    `;
  }
}

export default ClickableElements;
