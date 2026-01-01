/**
 * Draggable Components Module
 * Make SVG elements draggable for circuit building and interactive design
 */

export class DraggableComponents {
  constructor() {
    this.dragState = {
      isDragging: false,
      currentElement: null,
      offset: { x: 0, y: 0 }
    };
  }

  /**
   * Make an SVG element draggable
   */
  makeDraggable(elementId, containerBounds = null) {
    return {
      elementId,
      script: this.generateDragScript(elementId, containerBounds),
      style: this.generateDragStyle(elementId),
    };
  }

  /**
   * Generate drag style for element
   */
  generateDragStyle(elementId) {
    return `
      <style>
        #${elementId} {
          cursor: move;
          transition: filter 0.2s;
        }
        #${elementId}:hover {
          filter: drop-shadow(0 0 8px rgba(66, 165, 245, 0.6));
        }
        #${elementId}.dragging {
          filter: drop-shadow(0 0 12px rgba(66, 165, 245, 0.9));
          opacity: 0.8;
        }
      </style>
    `;
  }

  /**
   * Generate drag script for element
   */
  generateDragScript(elementId, containerBounds) {
    return `
      <script>
        (function() {
          const element = document.getElementById('${elementId}');
          if (!element) return;
          
          let isDragging = false;
          let startX, startY;
          let elementX = 0, elementY = 0;
          
          // Get current transform
          function getTransform() {
            const transform = element.getAttribute('transform');
            if (transform) {
              const match = transform.match(/translate\\(([^,]+),\\s*([^)]+)\\)/);
              if (match) {
                elementX = parseFloat(match[1]);
                elementY = parseFloat(match[2]);
              }
            }
            return { x: elementX, y: elementY };
          }
          
          // Set transform
          function setTransform(x, y) {
            element.setAttribute('transform', 'translate(' + x + ',' + y + ')');
          }
          
          // Mouse down
          element.addEventListener('mousedown', function(e) {
            isDragging = true;
            element.classList.add('dragging');
            
            const pos = getTransform();
            const svg = element.ownerSVGElement;
            const pt = svg.createSVGPoint();
            pt.x = e.clientX;
            pt.y = e.clientY;
            const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
            
            startX = svgP.x - pos.x;
            startY = svgP.y - pos.y;
            
            e.preventDefault();
          });
          
          // Mouse move
          document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            
            const svg = element.ownerSVGElement;
            const pt = svg.createSVGPoint();
            pt.x = e.clientX;
            pt.y = e.clientY;
            const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
            
            let newX = svgP.x - startX;
            let newY = svgP.y - startY;
            
            ${containerBounds ? `
            // Apply bounds
            const bounds = ${JSON.stringify(containerBounds)};
            newX = Math.max(bounds.minX, Math.min(bounds.maxX, newX));
            newY = Math.max(bounds.minY, Math.min(bounds.maxY, newY));
            ` : ''}
            
            setTransform(newX, newY);
            
            console.log('Dragging ${elementId} to:', newX, newY);
          });
          
          // Mouse up
          document.addEventListener('mouseup', function() {
            if (isDragging) {
              isDragging = false;
              element.classList.remove('dragging');
              console.log('Dropped ${elementId}');
            }
          });
        })();
      </script>
    `;
  }

  /**
   * Generate draggable resistor component
   */
  generateDraggableResistor(x = 0, y = 0, size = 80, id = 'drag-resistor') {
    return `
      <g id="${id}" transform="translate(${x}, ${y})">
        ${this.generateDragStyle(id)}
        
        <!-- Component body -->
        <rect x="${-size * 0.3}" y="${-size * 0.15}" width="${size * 0.6}" height="${size * 0.3}" 
              fill="#E8D4A0" stroke="#000" stroke-width="2" rx="5"/>
        
        <!-- Leads -->
        <line x1="${-size * 0.5}" y1="0" x2="${-size * 0.3}" y2="0" 
              stroke="#666" stroke-width="3"/>
        <line x1="${size * 0.3}" y1="0" x2="${size * 0.5}" y2="0" 
              stroke="#666" stroke-width="3"/>
        
        <!-- Color bands -->
        <rect x="${-size * 0.2}" y="${-size * 0.18}" width="${size * 0.05}" height="${size * 0.36}" fill="#8B4513"/>
        <rect x="${-size * 0.05}" y="${-size * 0.18}" width="${size * 0.05}" height="${size * 0.36}" fill="#000"/>
        <rect x="${size * 0.1}" y="${-size * 0.18}" width="${size * 0.05}" height="${size * 0.36}" fill="#FF0000"/>
        
        <!-- Glow effect when hovering -->
        <rect x="${-size * 0.35}" y="${-size * 0.2}" width="${size * 0.7}" height="${size * 0.4}" 
              fill="none" stroke="#42A5F5" stroke-width="0" rx="8" opacity="0">
          <animate attributeName="stroke-width" values="0; 3; 0" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0; 0.6; 0" dur="2s" repeatCount="indefinite"/>
        </rect>
      </g>
      
      ${this.generateDragScript(id, null)}
    `;
  }

  /**
   * Generate draggable IC chip component
   */
  generateDraggableIC(x = 0, y = 0, width = 100, height = 60, id = 'drag-ic') {
    return `
      <g id="${id}" transform="translate(${x}, ${y})">
        ${this.generateDragStyle(id)}
        
        <!-- Chip body -->
        <rect x="${-width / 2}" y="${-height / 2}" width="${width}" height="${height}" 
              fill="#1a1a1a" stroke="#000" stroke-width="2" rx="5"/>
        
        <!-- Notch -->
        <circle cx="0" cy="${-height / 2}" r="8" fill="#1a1a1a" stroke="#000" stroke-width="2"/>
        
        <!-- Pins -->
        ${Array.from({ length: 4 }, (_, i) => {
          const pinY = -height / 2 + height / 5 * (i + 1);
          return `
            <rect x="${-width / 2 - 10}" y="${pinY - 3}" width="10" height="6" 
                  fill="#C0C0C0" stroke="#666" stroke-width="1"/>
            <rect x="${width / 2}" y="${pinY - 3}" width="10" height="6" 
                  fill="#C0C0C0" stroke="#666" stroke-width="1"/>
          `;
        }).join('')}
        
        <!-- Label -->
        <text x="0" y="6" font-size="14" font-weight="bold" 
              text-anchor="middle" fill="#FFF">555</text>
      </g>
      
      ${this.generateDragScript(id, null)}
    `;
  }

  /**
   * Generate draggable molecule component
   */
  generateDraggableMolecule(x = 0, y = 0, size = 80, id = 'drag-molecule') {
    return `
      <g id="${id}" transform="translate(${x}, ${y})">
        ${this.generateDragStyle(id)}
        
        <!-- Atoms -->
        <circle cx="0" cy="0" r="${size * 0.2}" fill="#FF0000" stroke="#000" stroke-width="2"/>
        <text x="0" y="5" font-size="${size * 0.15}" font-weight="bold" 
              text-anchor="middle" fill="#FFF">O</text>
        
        <circle cx="${-size * 0.4}" cy="${size * 0.3}" r="${size * 0.15}" 
                fill="#FFFFFF" stroke="#000" stroke-width="2"/>
        <text x="${-size * 0.4}" y="${size * 0.33}" font-size="${size * 0.12}" 
              font-weight="bold" text-anchor="middle" fill="#000">H</text>
        
        <circle cx="${size * 0.4}" cy="${size * 0.3}" r="${size * 0.15}" 
                fill="#FFFFFF" stroke="#000" stroke-width="2"/>
        <text x="${size * 0.4}" y="${size * 0.33}" font-size="${size * 0.12}" 
              font-weight="bold" text-anchor="middle" fill="#000">H</text>
        
        <!-- Bonds -->
        <line x1="0" y1="${size * 0.2}" x2="${-size * 0.35}" y2="${size * 0.2}" 
              stroke="#555" stroke-width="3"/>
        <line x1="0" y1="${size * 0.2}" x2="${size * 0.35}" y2="${size * 0.2}" 
              stroke="#555" stroke-width="3"/>
      </g>
      
      ${this.generateDragScript(id, null)}
    `;
  }

  /**
   * Generate dropzone for components
   */
  generateDropZone(x = 0, y = 0, width = 400, height = 300, id = 'dropzone') {
    return `
      <g id="${id}">
        <rect x="${x}" y="${y}" width="${width}" height="${height}" 
              fill="rgba(66, 165, 245, 0.1)" stroke="#42A5F5" 
              stroke-width="2" stroke-dasharray="10,5" rx="10"/>
        
        <text x="${x + width / 2}" y="${y + height / 2}" 
              font-size="18" text-anchor="middle" fill="#42A5F5" opacity="0.6">
          Drag components here
        </text>
      </g>
    `;
  }
}

export default DraggableComponents;
