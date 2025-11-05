// Drawing Application State
const app = {
    canvas: null,
    ctx: null,
    currentTool: 'pen',
    isDrawing: false,
    startX: 0,
    startY: 0,
    strokeColor: '#000000',
    fillColor: '#ffffff',
    strokeWidth: 2,
    fillEnabled: true,
    history: [],
    historyStep: -1,
    maxHistory: 50
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initCanvas();
    initToolButtons();
    initPropertyControls();
    initActionButtons();
    setupCanvasEvents();
    saveState();
});

// Initialize canvas
function initCanvas() {
    app.canvas = document.getElementById('drawingCanvas');
    app.ctx = app.canvas.getContext('2d');
    
    // Set canvas size
    const container = app.canvas.parentElement;
    app.canvas.width = app.canvas.offsetWidth;
    app.canvas.height = 600;
    
    // Set initial canvas background
    app.ctx.fillStyle = 'white';
    app.ctx.fillRect(0, 0, app.canvas.width, app.canvas.height);
    
    // Update canvas size display
    document.getElementById('canvasSize').textContent = 
        `Canvas: ${app.canvas.width} x ${app.canvas.height}`;
}

// Initialize tool buttons
function initToolButtons() {
    const toolButtons = document.querySelectorAll('.tool-btn');
    
    toolButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            toolButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Set current tool
            app.currentTool = button.dataset.tool;
            
            // Update cursor
            updateCursor();
        });
    });
}

// Initialize property controls
function initPropertyControls() {
    const strokeColorInput = document.getElementById('strokeColor');
    const fillColorInput = document.getElementById('fillColor');
    const strokeWidthInput = document.getElementById('strokeWidth');
    const strokeWidthValue = document.getElementById('strokeWidthValue');
    const fillEnabledInput = document.getElementById('fillEnabled');
    
    strokeColorInput.addEventListener('input', (e) => {
        app.strokeColor = e.target.value;
    });
    
    fillColorInput.addEventListener('input', (e) => {
        app.fillColor = e.target.value;
    });
    
    strokeWidthInput.addEventListener('input', (e) => {
        app.strokeWidth = parseInt(e.target.value);
        strokeWidthValue.textContent = app.strokeWidth;
    });
    
    fillEnabledInput.addEventListener('change', (e) => {
        app.fillEnabled = e.target.checked;
    });
}

// Initialize action buttons
function initActionButtons() {
    document.getElementById('clearCanvas').addEventListener('click', clearCanvas);
    document.getElementById('undoBtn').addEventListener('click', undo);
    document.getElementById('redoBtn').addEventListener('click', redo);
    document.getElementById('exportSVG').addEventListener('click', exportAsSVG);
    document.getElementById('exportPNG').addEventListener('click', exportAsPNG);
}

// Setup canvas events
function setupCanvasEvents() {
    app.canvas.addEventListener('mousedown', startDrawing);
    app.canvas.addEventListener('mousemove', draw);
    app.canvas.addEventListener('mouseup', stopDrawing);
    app.canvas.addEventListener('mouseout', stopDrawing);
    app.canvas.addEventListener('mousemove', updateCursorPosition);
}

// Update cursor based on tool
function updateCursor() {
    if (app.currentTool === 'eraser') {
        app.canvas.style.cursor = 'grab';
    } else {
        app.canvas.style.cursor = 'crosshair';
    }
}

// Update cursor position display
function updateCursorPosition(e) {
    const rect = app.canvas.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);
    document.getElementById('cursorPos').textContent = `X: ${x}, Y: ${y}`;
}

// Start drawing
function startDrawing(e) {
    app.isDrawing = true;
    const rect = app.canvas.getBoundingClientRect();
    app.startX = e.clientX - rect.left;
    app.startY = e.clientY - rect.top;
    
    if (app.currentTool === 'pen') {
        app.ctx.beginPath();
        app.ctx.moveTo(app.startX, app.startY);
    }
}

// Draw on canvas
function draw(e) {
    if (!app.isDrawing) return;
    
    const rect = app.canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    switch (app.currentTool) {
        case 'pen':
            drawPen(currentX, currentY);
            break;
        case 'eraser':
            erase(currentX, currentY);
            break;
    }
}

// Stop drawing
function stopDrawing(e) {
    if (!app.isDrawing) return;
    
    const rect = app.canvas.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;
    
    switch (app.currentTool) {
        case 'line':
            drawLine(app.startX, app.startY, endX, endY);
            break;
        case 'rectangle':
            drawRectangle(app.startX, app.startY, endX, endY);
            break;
        case 'circle':
            drawCircle(app.startX, app.startY, endX, endY);
            break;
        case 'triangle':
            drawTriangle(app.startX, app.startY, endX, endY);
            break;
    }
    
    app.isDrawing = false;
    saveState();
}

// Drawing functions
function drawPen(x, y) {
    app.ctx.strokeStyle = app.strokeColor;
    app.ctx.lineWidth = app.strokeWidth;
    app.ctx.lineCap = 'round';
    app.ctx.lineJoin = 'round';
    
    app.ctx.lineTo(x, y);
    app.ctx.stroke();
}

function drawLine(x1, y1, x2, y2) {
    app.ctx.strokeStyle = app.strokeColor;
    app.ctx.lineWidth = app.strokeWidth;
    app.ctx.lineCap = 'round';
    
    app.ctx.beginPath();
    app.ctx.moveTo(x1, y1);
    app.ctx.lineTo(x2, y2);
    app.ctx.stroke();
}

function drawRectangle(x1, y1, x2, y2) {
    const width = x2 - x1;
    const height = y2 - y1;
    
    if (app.fillEnabled) {
        app.ctx.fillStyle = app.fillColor;
        app.ctx.fillRect(x1, y1, width, height);
    }
    
    app.ctx.strokeStyle = app.strokeColor;
    app.ctx.lineWidth = app.strokeWidth;
    app.ctx.strokeRect(x1, y1, width, height);
}

function drawCircle(x1, y1, x2, y2) {
    const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    
    app.ctx.beginPath();
    app.ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
    
    if (app.fillEnabled) {
        app.ctx.fillStyle = app.fillColor;
        app.ctx.fill();
    }
    
    app.ctx.strokeStyle = app.strokeColor;
    app.ctx.lineWidth = app.strokeWidth;
    app.ctx.stroke();
}

function drawTriangle(x1, y1, x2, y2) {
    const height = y2 - y1;
    const width = x2 - x1;
    
    app.ctx.beginPath();
    app.ctx.moveTo(x1, y2);  // Bottom left
    app.ctx.lineTo(x1 + width / 2, y1);  // Top middle
    app.ctx.lineTo(x2, y2);  // Bottom right
    app.ctx.closePath();
    
    if (app.fillEnabled) {
        app.ctx.fillStyle = app.fillColor;
        app.ctx.fill();
    }
    
    app.ctx.strokeStyle = app.strokeColor;
    app.ctx.lineWidth = app.strokeWidth;
    app.ctx.stroke();
}

function erase(x, y) {
    app.ctx.globalCompositeOperation = 'destination-out';
    app.ctx.beginPath();
    app.ctx.arc(x, y, app.strokeWidth * 3, 0, 2 * Math.PI);
    app.ctx.fill();
    app.ctx.globalCompositeOperation = 'source-over';
}

// Clear canvas
function clearCanvas() {
    if (confirm('Are you sure you want to clear the canvas?')) {
        app.ctx.fillStyle = 'white';
        app.ctx.fillRect(0, 0, app.canvas.width, app.canvas.height);
        saveState();
    }
}

// History management
function saveState() {
    // Remove any states after current step
    app.history = app.history.slice(0, app.historyStep + 1);
    
    // Save current state
    app.history.push(app.canvas.toDataURL());
    
    // Limit history size
    if (app.history.length > app.maxHistory) {
        app.history.shift();
    } else {
        app.historyStep++;
    }
}

function undo() {
    if (app.historyStep > 0) {
        app.historyStep--;
        restoreState(app.history[app.historyStep]);
    }
}

function redo() {
    if (app.historyStep < app.history.length - 1) {
        app.historyStep++;
        restoreState(app.history[app.historyStep]);
    }
}

function restoreState(dataUrl) {
    const img = new Image();
    img.onload = () => {
        app.ctx.clearRect(0, 0, app.canvas.width, app.canvas.height);
        app.ctx.drawImage(img, 0, 0);
    };
    img.src = dataUrl;
}

// Export functions
function exportAsSVG() {
    // Simple SVG export - creates a link to download
    const svgData = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${app.canvas.width}" height="${app.canvas.height}">
    <image href="${app.canvas.toDataURL()}" width="${app.canvas.width}" height="${app.canvas.height}"/>
</svg>`;
    
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'design.svg';
    link.click();
    
    URL.revokeObjectURL(url);
}

function exportAsPNG() {
    const link = document.createElement('a');
    link.href = app.canvas.toDataURL('image/png');
    link.download = 'design.png';
    link.click();
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
            case 'z':
                e.preventDefault();
                if (e.shiftKey) {
                    redo();
                } else {
                    undo();
                }
                break;
            case 'y':
                e.preventDefault();
                redo();
                break;
        }
    }
});
