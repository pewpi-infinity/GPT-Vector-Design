# GPT-Vector-Design

**Infinity Portal** - A web-based vector design application with dual-AI encryption (Watson + GPT) for secure collaboration.

## 📋 Overview

This repository contains:
- **Web Application**: Static HTML/JS application with encryption and GitHub integration
- **Rogers Bot**: Python bot for GitHub repository operations
- **Dual-AI Encryption**: Client-side PBKDF2 + AES-GCM encryption system

## 🏗️ Project Structure

```
/GPT-Vector-Design/
├── index.html              ← Main Infinity Portal / Login page
├── index_box.html          ← Alternative portal interface
├── index_consent.html      ← Consent management page
├── decrypt_and_activate.html ← Decryption utility
├── decrypt_debug.html      ← Debug decryption page
├── pewpi_core.js           ← Core WebCrypto utilities & GitHub API helpers
├── pewpi_fix_nav.js        ← Navigation fixes for mobile/desktop
├── supporting.js           ← Repository and file loading utilities
├── rogers.bot.py           ← Python bot for GitHub operations
├── package.json            ← Node.js dependencies and scripts
├── requirements.txt        ← Python dependencies
└── .github/workflows/ci.yml ← CI/CD automation
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher  
- **Python**: 3.11 or 3.12
- **pip**: Latest version

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/pewpi-infinity/GPT-Vector-Design.git
   cd GPT-Vector-Design
   ```

2. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

3. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

### Running Locally

#### Option 1: Using npm (Recommended)
```bash
npm start
```
This will start a local HTTP server on port 8080 and open your browser to `http://localhost:8080`

#### Option 2: Using Python's built-in server
```bash
python -m http.server 8080
```
Then navigate to `http://localhost:8080` in your browser.

#### Option 3: Using the Rogers Bot
```bash
python rogers.bot.py
```
The bot provides GitHub file fetching capabilities via command line.

### Development

#### Linting
```bash
# Lint all files
npm run lint

# Lint only JavaScript
npm run lint:js

# Lint only HTML
npm run lint:html
```

#### Testing
```bash
npm test
```

#### Validation (lint + test)
```bash
npm run validate
```

## 🔒 Security Features

- **Dual-AI Encryption**: Client-side encryption using WebCrypto API
- **PBKDF2 Key Derivation**: 250,000 iterations with SHA-256
- **AES-GCM Encryption**: 256-bit keys with random IVs
- **Guardian System**: Monitors and logs suspicious activity
- **Zero-Knowledge Architecture**: All encryption happens client-side

## 🧪 Testing

The application can be tested by:
1. Opening `index.html` in a browser
2. Entering a passphrase in the login overlay
3. Interacting with the color logic gateway
4. Using the Rogers Console for commands
5. Checking the Vault section for encrypted data

## 📦 Build & Deployment

This is a static web application that requires no build step. Simply:
1. Serve the files using any HTTP server
2. Ensure all `.html`, `.js`, and `.json` files are accessible
3. Configure GitHub tokens if using Rogers bot features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - See LICENSE file for details

## 🔧 Troubleshooting

### Common Issues

1. **Port 8080 already in use**:
   ```bash
   npm start -- -p 3000  # Use a different port
   ```

2. **Python dependencies not found**:
   ```bash
   pip install --upgrade -r requirements.txt
   ```

3. **Node modules issues**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the CI logs for build failures

---

**Version**: 1.0.0  
**Last Updated**: November 2025  
**Repository**: https://github.com/pewpi-infinity/GPT-Vector-Design

