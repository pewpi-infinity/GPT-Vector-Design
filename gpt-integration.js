// GPT Integration Module
const GPT = {
    apiKey: null,
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-3.5-turbo',
    
    // Predefined design tips and suggestions
    designTips: [
        {
            keywords: ['color', 'scheme', 'palette'],
            responses: [
                "🎨 For a professional look, try using complementary colors: blue (#2563eb) with orange (#f97316), or purple (#9333ea) with yellow (#eab308).",
                "🌈 Consider using a monochromatic color scheme with different shades of the same color for a cohesive design.",
                "💡 Use the 60-30-10 rule: 60% dominant color, 30% secondary color, and 10% accent color.",
                "✨ Try analogous colors (colors next to each other on the color wheel) for harmonious designs: blue, blue-green, and green."
            ]
        },
        {
            keywords: ['shape', 'geometric', 'form'],
            responses: [
                "📐 Geometric shapes work great for modern designs. Try combining circles, rectangles, and triangles.",
                "🔷 Use the golden ratio (1.618:1) for pleasing proportions in your shapes.",
                "⭐ Create visual interest by overlapping shapes with different opacities.",
                "🎯 Align shapes to a grid for a clean, organized look."
            ]
        },
        {
            keywords: ['layout', 'composition', 'arrange'],
            responses: [
                "📏 Use the rule of thirds: place important elements at intersection points of a 3x3 grid.",
                "🎪 Create visual hierarchy by varying sizes - larger elements draw more attention.",
                "🔄 Balance your design with symmetry or asymmetry, depending on your goal.",
                "↔️ Leave negative space (whitespace) to give your design room to breathe."
            ]
        },
        {
            keywords: ['logo', 'brand', 'identity'],
            responses: [
                "💼 Keep logos simple and scalable - they should work at any size.",
                "🎨 Limit your logo to 2-3 colors for versatility and memorability.",
                "✏️ Ensure your logo works in black and white before adding color.",
                "🔤 Choose typography that reflects your brand personality."
            ]
        },
        {
            keywords: ['tip', 'advice', 'help', 'improve'],
            responses: [
                "💡 Practice regularly! Try recreating logos or designs you admire to learn new techniques.",
                "🎯 Use stroke width consistently throughout your design for a cohesive look.",
                "🌟 Experiment with different tools - each one offers unique creative possibilities.",
                "📚 Study design principles: contrast, repetition, alignment, and proximity (CRAP).",
                "🎨 Build a color palette before starting - it saves time and ensures consistency."
            ]
        },
        {
            keywords: ['line', 'stroke', 'border'],
            responses: [
                "✏️ Vary line weights to create depth and emphasis in your design.",
                "📏 Use thicker strokes for important elements and thinner for details.",
                "🎨 Try using colored strokes instead of black for a softer, modern look.",
                "⚡ Experiment with dashed or dotted lines for decorative elements."
            ]
        },
        {
            keywords: ['circle', 'round', 'curve'],
            responses: [
                "⭕ Circles create a sense of unity and completeness in designs.",
                "🎯 Use circles to draw attention to specific elements or create focal points.",
                "🔄 Combine circles of different sizes for dynamic compositions.",
                "✨ Perfect circles convey professionalism, while hand-drawn ones feel organic."
            ]
        },
        {
            keywords: ['rectangle', 'square', 'box'],
            responses: [
                "📦 Rectangles and squares provide stability and structure to designs.",
                "🎨 Use rounded rectangles for a friendlier, more approachable feel.",
                "📐 The golden rectangle ratio (1:1.618) is naturally pleasing to the eye.",
                "🔲 Vary sizes of rectangles to create visual rhythm and interest."
            ]
        }
    ],
    
    defaultResponses: [
        "🎨 Great question! Here are some general design tips:\n\n• Start with a clear focal point\n• Use contrast to guide the eye\n• Keep it simple - less is often more\n• Maintain consistent spacing and alignment\n• Choose 2-3 complementary colors",
        "💡 Consider these design principles:\n\n• Balance: Distribute visual weight evenly\n• Contrast: Make important elements stand out\n• Repetition: Create consistency with repeated elements\n• Alignment: Keep elements organized\n• Proximity: Group related items together",
        "✨ Here are some creative suggestions:\n\n• Experiment with different color combinations\n• Try layering shapes for depth\n• Use varying stroke widths for emphasis\n• Play with negative space\n• Create patterns by repeating elements",
        "🎯 To improve your design:\n\n• Study successful designs in your niche\n• Use a limited color palette (3-5 colors)\n• Ensure good contrast for readability\n• Align elements to an invisible grid\n• Leave adequate whitespace"
    ]
};

// Initialize GPT integration
document.addEventListener('DOMContentLoaded', () => {
    initGPT();
});

function initGPT() {
    const askButton = document.getElementById('askGPT');
    const promptInput = document.getElementById('gptPrompt');
    const responseDiv = document.getElementById('gptResponse');
    
    askButton.addEventListener('click', async () => {
        const prompt = promptInput.value.trim();
        
        if (!prompt) {
            showGPTResponse('Please enter a question or request for design assistance.');
            return;
        }
        
        // Show loading state
        responseDiv.classList.add('active', 'loading');
        responseDiv.textContent = '';
        
        // Get response (using predefined responses for demo)
        setTimeout(() => {
            const response = getDesignAdvice(prompt);
            showGPTResponse(response);
            responseDiv.classList.remove('loading');
        }, 1000);
    });
    
    // Allow Enter to submit (with Shift+Enter for newlines)
    promptInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            askButton.click();
        }
    });
}

function getDesignAdvice(prompt) {
    const lowerPrompt = prompt.toLowerCase();
    
    // Check for specific keywords and return relevant advice
    for (const category of GPT.designTips) {
        for (const keyword of category.keywords) {
            if (lowerPrompt.includes(keyword)) {
                const responses = category.responses;
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }
    }
    
    // Return a random default response
    return GPT.defaultResponses[Math.floor(Math.random() * GPT.defaultResponses.length)];
}

function showGPTResponse(message) {
    const responseDiv = document.getElementById('gptResponse');
    responseDiv.classList.add('active');
    responseDiv.textContent = message;
    
    // Scroll to show response
    responseDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Optional: Real GPT API integration (requires API key)
async function askGPTAPI(prompt) {
    // This function can be implemented if the user wants to connect to the actual OpenAI API
    // For security, the API key should be stored securely and not exposed in the frontend
    
    if (!GPT.apiKey) {
        return "API key not configured. Using built-in design assistant instead.";
    }
    
    try {
        const response = await fetch(GPT.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GPT.apiKey}`
            },
            body: JSON.stringify({
                model: GPT.model,
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful design assistant for a vector graphics tool. Provide concise, practical advice about design, colors, layouts, and vector graphics. Keep responses under 150 words.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 200,
                temperature: 0.7
            })
        });
        
        if (!response.ok) {
            throw new Error('API request failed');
        }
        
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('GPT API Error:', error);
        return "Sorry, I encountered an error. Using built-in design assistant instead.\n\n" + 
               getDesignAdvice(prompt);
    }
}

// Context-aware suggestions based on current canvas state
function getContextualSuggestion() {
    const suggestions = [
        "💡 Try using the triangle tool to create interesting geometric patterns!",
        "🎨 Experiment with different fill colors - disable fill for outline-only shapes.",
        "✏️ Use the pen tool for freehand drawing and organic shapes.",
        "🔄 Don't forget you can undo/redo with Ctrl+Z and Ctrl+Y (or Cmd on Mac)!",
        "📐 Hold Shift while drawing to constrain proportions (coming soon!).",
        "🌈 Create color harmony by using colors from the same family.",
        "⭐ Layer different shapes to create complex designs.",
        "💾 Export your work as SVG to keep it scalable for any size!"
    ];
    
    return suggestions[Math.floor(Math.random() * suggestions.length)];
}

// Provide random design tip on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        const tip = getContextualSuggestion();
        const responseDiv = document.getElementById('gptResponse');
        if (responseDiv) {
            showGPTResponse(tip);
        }
    }, 2000);
});
