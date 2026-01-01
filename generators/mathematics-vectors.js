/**
 * 📐 Mathematics Theme Vector Generator
 * 3D graphs, geometric constructions, fractals, and mathematical symbols
 */

export class MathematicsVectorGenerator {
  constructor() {
    this.theme = 'mathematics';
  }

  /**
   * Generate a 3D function graph (simplified 3D projection)
   */
  generate3DGraph(x = 0, y = 0, width = 400, height = 300, func = 'wave') {
    const points = [];
    const gridSize = 20;
    const scale = 15;
    
    for (let i = -gridSize / 2; i < gridSize / 2; i++) {
      for (let j = -gridSize / 2; j < gridSize / 2; j++) {
        const xCoord = i / 2;
        const yCoord = j / 2;
        let zCoord = 0;
        
        switch (func) {
          case 'wave':
            zCoord = Math.sin(Math.sqrt(xCoord * xCoord + yCoord * yCoord));
            break;
          case 'saddle':
            zCoord = (xCoord * xCoord - yCoord * yCoord) / 5;
            break;
          case 'paraboloid':
            zCoord = (xCoord * xCoord + yCoord * yCoord) / 10;
            break;
        }
        
        // Simple isometric projection
        const screenX = x + width / 2 + (xCoord - yCoord) * scale;
        const screenY = y + height / 2 - zCoord * scale + (xCoord + yCoord) * scale * 0.5;
        
        points.push({ x: screenX, y: screenY, z: zCoord });
      }
    }
    
    return `
      <g>
        <!-- Background -->
        <rect x="${x}" y="${y}" width="${width}" height="${height}" fill="#0A0E27" rx="10"/>
        
        <!-- Grid points -->
        ${points.map(p => {
          const intensity = Math.max(0, Math.min(1, (p.z + 1) / 2));
          const color = `hsl(${200 + intensity * 80}, 70%, ${50 + intensity * 30}%)`;
          return `<circle cx="${p.x}" cy="${p.y}" r="2" fill="${color}"/>`;
        }).join('')}
        
        <!-- Axes -->
        <line x1="${x + width / 2}" y1="${y + height / 2}" 
              x2="${x + width / 2 + 100}" y2="${y + height / 2}" 
              stroke="#FF6B6B" stroke-width="2" opacity="0.6"/>
        <line x1="${x + width / 2}" y1="${y + height / 2}" 
              x2="${x + width / 2 - 100}" y2="${y + height / 2 + 50}" 
              stroke="#4ECDC4" stroke-width="2" opacity="0.6"/>
        <line x1="${x + width / 2}" y1="${y + height / 2}" 
              x2="${x + width / 2}" y2="${y + height / 2 - 100}" 
              stroke="#95E1D3" stroke-width="2" opacity="0.6"/>
        
        <!-- Axis labels -->
        <text x="${x + width / 2 + 110}" y="${y + height / 2}" fill="#FF6B6B" font-size="14">x</text>
        <text x="${x + width / 2 - 110}" y="${y + height / 2 + 50}" fill="#4ECDC4" font-size="14">y</text>
        <text x="${x + width / 2}" y="${y + height / 2 - 110}" fill="#95E1D3" font-size="14">z</text>
      </g>
    `;
  }

  /**
   * Generate a geometric construction (circle inscribed in triangle)
   */
  generateGeometricConstruction(x = 0, y = 0, size = 200) {
    const centerX = x + size / 2;
    const centerY = y + size / 2;
    const triangleRadius = size * 0.4;
    
    // Triangle vertices (equilateral)
    const vertices = [];
    for (let i = 0; i < 3; i++) {
      const angle = (i * 2 * Math.PI / 3) - Math.PI / 2;
      vertices.push({
        x: centerX + Math.cos(angle) * triangleRadius,
        y: centerY + Math.sin(angle) * triangleRadius
      });
    }
    
    // Inscribed circle radius (for equilateral triangle)
    const inRadius = triangleRadius / (2 * Math.sqrt(3));
    
    return `
      <g>
        <!-- Triangle -->
        <polygon points="${vertices.map(v => `${v.x},${v.y}`).join(' ')}" 
                 fill="none" stroke="#4A90E2" stroke-width="2"/>
        
        <!-- Inscribed circle -->
        <circle cx="${centerX}" cy="${centerY}" r="${inRadius}" 
                fill="none" stroke="#E74C3C" stroke-width="2"/>
        
        <!-- Construction lines (angle bisectors) -->
        ${vertices.map(v => 
          `<line x1="${v.x}" y1="${v.y}" x2="${centerX}" y2="${centerY}" 
                 stroke="#2ECC71" stroke-width="1" stroke-dasharray="5,5" opacity="0.5"/>`
        ).join('')}
        
        <!-- Center point -->
        <circle cx="${centerX}" cy="${centerY}" r="3" fill="#000"/>
        
        <!-- Vertices -->
        ${vertices.map(v => 
          `<circle cx="${v.x}" cy="${v.y}" r="4" fill="#4A90E2" stroke="#000" stroke-width="1"/>`
        ).join('')}
      </g>
    `;
  }

  /**
   * Generate a Sierpinski triangle (fractal)
   */
  generateSierpinskiTriangle(x = 0, y = 0, size = 256, depth = 5) {
    const triangles = [];
    
    function drawTriangle(x1, y1, x2, y2, x3, y3, level) {
      if (level === 0) {
        triangles.push(`<polygon points="${x1},${y1} ${x2},${y2} ${x3},${y3}" 
                               fill="#9B59B6" stroke="#8E44AD" stroke-width="1"/>`);
      } else {
        // Calculate midpoints
        const mid1x = (x1 + x2) / 2;
        const mid1y = (y1 + y2) / 2;
        const mid2x = (x2 + x3) / 2;
        const mid2y = (y2 + y3) / 2;
        const mid3x = (x1 + x3) / 2;
        const mid3y = (y1 + y3) / 2;
        
        // Recursively draw three smaller triangles
        drawTriangle(x1, y1, mid1x, mid1y, mid3x, mid3y, level - 1);
        drawTriangle(mid1x, mid1y, x2, y2, mid2x, mid2y, level - 1);
        drawTriangle(mid3x, mid3y, mid2x, mid2y, x3, y3, level - 1);
      }
    }
    
    // Initial triangle vertices
    const x1 = x + size / 2;
    const y1 = y;
    const x2 = x;
    const y2 = y + size;
    const x3 = x + size;
    const y3 = y + size;
    
    drawTriangle(x1, y1, x2, y2, x3, y3, depth);
    
    return `<g>${triangles.join('')}</g>`;
  }

  /**
   * Generate graph paper grid
   */
  generateGraphPaper(x = 0, y = 0, width = 400, height = 300, gridSize = 20) {
    const lines = [];
    
    // Vertical lines
    for (let i = 0; i <= width; i += gridSize) {
      const isMainLine = i % (gridSize * 5) === 0;
      lines.push(`<line x1="${x + i}" y1="${y}" x2="${x + i}" y2="${y + height}" 
                        stroke="${isMainLine ? '#666' : '#CCC'}" 
                        stroke-width="${isMainLine ? 1.5 : 0.5}"/>`);
    }
    
    // Horizontal lines
    for (let i = 0; i <= height; i += gridSize) {
      const isMainLine = i % (gridSize * 5) === 0;
      lines.push(`<line x1="${x}" y1="${y + i}" x2="${x + width}" y2="${y + i}" 
                        stroke="${isMainLine ? '#666' : '#CCC'}" 
                        stroke-width="${isMainLine ? 1.5 : 0.5}"/>`);
    }
    
    return `
      <g>
        <rect x="${x}" y="${y}" width="${width}" height="${height}" fill="#FFF"/>
        ${lines.join('')}
        <!-- Origin axes -->
        <line x1="${x + width / 2}" y1="${y}" x2="${x + width / 2}" y2="${y + height}" 
              stroke="#FF0000" stroke-width="2"/>
        <line x1="${x}" y1="${y + height / 2}" x2="${x + width}" y2="${y + height / 2}" 
              stroke="#FF0000" stroke-width="2"/>
      </g>
    `;
  }

  /**
   * Generate mathematical symbols
   */
  generateMathSymbols(x = 0, y = 0, size = 400) {
    const symbols = [
      { symbol: '∫', label: 'Integral', x: 50, y: 80 },
      { symbol: '∑', label: 'Summation', x: 150, y: 80 },
      { symbol: '∂', label: 'Partial', x: 250, y: 80 },
      { symbol: '∞', label: 'Infinity', x: 350, y: 80 },
      { symbol: 'π', label: 'Pi', x: 50, y: 180 },
      { symbol: '√', label: 'Square Root', x: 150, y: 180 },
      { symbol: '≠', label: 'Not Equal', x: 250, y: 180 },
      { symbol: '≈', label: 'Approx', x: 350, y: 180 },
    ];
    
    return `
      <g transform="translate(${x}, ${y})">
        ${symbols.map(s => `
          <g>
            <circle cx="${s.x}" cy="${s.y}" r="35" fill="#3498DB" opacity="0.2"/>
            <text x="${s.x}" y="${s.y + 15}" font-size="48" font-weight="bold" 
                  text-anchor="middle" fill="#2C3E50">${s.symbol}</text>
            <text x="${s.x}" y="${s.y + 50}" font-size="12" 
                  text-anchor="middle" fill="#7F8C8D">${s.label}</text>
          </g>
        `).join('')}
      </g>
    `;
  }

  /**
   * Generate a unit circle with trigonometric functions
   */
  generateUnitCircle(x = 0, y = 0, radius = 150) {
    const centerX = x + radius;
    const centerY = y + radius;
    const angle = Math.PI / 4; // 45 degrees
    const pointX = centerX + Math.cos(angle) * radius;
    const pointY = centerY - Math.sin(angle) * radius;
    
    return `
      <g>
        <!-- Circle -->
        <circle cx="${centerX}" cy="${centerY}" r="${radius}" 
                fill="none" stroke="#3498DB" stroke-width="2"/>
        
        <!-- Axes -->
        <line x1="${centerX - radius * 1.2}" y1="${centerY}" 
              x2="${centerX + radius * 1.2}" y2="${centerY}" 
              stroke="#000" stroke-width="1" marker-end="url(#arrowhead)"/>
        <line x1="${centerX}" y1="${centerY + radius * 1.2}" 
              x2="${centerX}" y2="${centerY - radius * 1.2}" 
              stroke="#000" stroke-width="1" marker-end="url(#arrowhead)"/>
        
        <!-- Angle line -->
        <line x1="${centerX}" y1="${centerY}" x2="${pointX}" y2="${pointY}" 
              stroke="#E74C3C" stroke-width="2"/>
        
        <!-- Point on circle -->
        <circle cx="${pointX}" cy="${pointY}" r="5" fill="#E74C3C"/>
        
        <!-- Sin and Cos lines -->
        <line x1="${centerX}" y1="${centerY}" x2="${pointX}" y2="${centerY}" 
              stroke="#27AE60" stroke-width="2" stroke-dasharray="5,5"/>
        <line x1="${pointX}" y1="${centerY}" x2="${pointX}" y2="${pointY}" 
              stroke="#9B59B6" stroke-width="2" stroke-dasharray="5,5"/>
        
        <!-- Labels -->
        <text x="${(centerX + pointX) / 2}" y="${centerY - 10}" fill="#27AE60" font-size="14">cos θ</text>
        <text x="${pointX + 15}" y="${(centerY + pointY) / 2}" fill="#9B59B6" font-size="14">sin θ</text>
        <text x="${centerX + radius * 1.1}" y="${centerY + 20}" fill="#000" font-size="14">x</text>
        <text x="${centerX - 20}" y="${centerY - radius * 1.1}" fill="#000" font-size="14">y</text>
        
        <!-- Angle arc -->
        <path d="M ${centerX + 30} ${centerY} A 30 30 0 0 0 ${centerX + 21.2} ${centerY - 21.2}" 
              stroke="#E74C3C" stroke-width="1" fill="none"/>
        <text x="${centerX + 40}" y="${centerY - 5}" fill="#E74C3C" font-size="12">θ</text>
      </g>
    `;
  }

  /**
   * Generate a complete mathematics scene
   */
  generateMathScene(width = 800, height = 600) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#000"/>
          </marker>
        </defs>
        
        <!-- Background -->
        <rect width="${width}" height="${height}" fill="#F8F9FA"/>
        
        <!-- 3D Graph -->
        ${this.generate3DGraph(20, 20, 350, 250, 'wave')}
        
        <!-- Geometric construction -->
        ${this.generateGeometricConstruction(420, 50, 180)}
        
        <!-- Sierpinski triangle -->
        ${this.generateSierpinskiTriangle(650, 50, 128, 4)}
        
        <!-- Unit circle -->
        ${this.generateUnitCircle(50, 320, 100)}
        
        <!-- Math symbols -->
        ${this.generateMathSymbols(350, 350, 400)}
        
        <!-- Title -->
        <text x="${width / 2}" y="30" font-size="20" font-weight="bold" 
              text-anchor="middle" fill="#2C3E50">Mathematics Visualization</text>
      </svg>
    `;
  }
}

export default MathematicsVectorGenerator;
