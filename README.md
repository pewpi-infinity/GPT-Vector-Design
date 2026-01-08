# GPT-Vector-Design

**Production-grade vector design engine with integrated login, wallet, and token sync system.**

## 🚀 Features

- **Vector Design Engine**: Generate SVG vectors for multiple themes (Mario, Electronics, Chemistry, etc.)
- **Production Login**: Passwordless magic-link authentication + optional GitHub OAuth
- **Token Wallet**: Full-featured wallet with balance tracking, token list, and live feed
- **Cross-Repo Sync**: Event-based integration system for multi-repository token synchronization
- **IndexedDB Storage**: Dexie-powered persistence with localStorage fallback
- **P2P Sync**: Optional WebRTC-based peer-to-peer token synchronization
- **Encryption**: AES-GCM helpers for secure token data

## 📦 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/pewpi-infinity/GPT-Vector-Design.git
cd GPT-Vector-Design

# Install dependencies (optional, for browser use via CDN)
npm install

# Run development server
npm run dev
```

Open http://localhost:8080 in your browser.

### Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="./src/shared/theme.css">
</head>
<body>
  <div id="login-container"></div>
  <div id="wallet-container"></div>

  <script type="module">
    import { LoginComponent } from './src/shared/auth/login-component.js';
    import { WalletComponent } from './src/shared/wallet/wallet-component.js';
    import { tokenService } from './src/shared/token-service.js';

    // Initialize login
    const login = new LoginComponent({
      devMode: true, // No SMTP required for local testing
      onLoginSuccess: (user) => {
        console.log('Logged in:', user);
        initWallet(user.userId);
      }
    });
    login.render('login-container');

    // Initialize wallet
    function initWallet(userId) {
      const wallet = new WalletComponent({ userId });
      wallet.render('wallet-container');
    }

    // Create a token
    async function createToken() {
      const token = await tokenService.createToken({
        type: 'bronze',
        value: 1
      });
      console.log('Token created:', token);
    }
  </script>
</body>
</html>
```

## 🔐 Authentication

### Dev Mode (No SMTP Required)

Perfect for local development and testing:

```javascript
const login = new LoginComponent({
  devMode: true // Instant login without email verification
});
```

### Production Mode

For production, configure magic-link with your SMTP provider:

```javascript
const login = new LoginComponent({
  devMode: false,
  // Add your SMTP configuration here
});
```

### Optional GitHub OAuth

Enable GitHub as an optional authentication method:

```javascript
const login = new LoginComponent({
  githubClientId: 'your-github-client-id',
  // GitHub is opt-in, email magic-link remains the default
});
```

## 💼 Wallet & Tokens

### Create Tokens

```javascript
const token = await tokenService.createToken({
  type: 'bronze', // bronze, silver, gold, platinum
  value: 1,
  userId: 'user_123',
  metadata: { customData: 'value' }
});
```

### Get Balance

```javascript
const balance = await tokenService.getBalance('user_123');
console.log('Balance:', balance);
```

### Subscribe to Events

```javascript
tokenService.subscribe('tokenCreated', (token) => {
  console.log('New token:', token);
});
```

## 🔗 Integration with Other Repos

This system is designed to integrate seamlessly with other pewpi repositories (banksy, v, infinity-brain-searc, repo-dashboard-hub, etc.).

```javascript
import { setupIntegration } from './src/shared/integration-listener.js';

const listener = setupIntegration({
  onTokenCreated: (token) => {
    console.log('Token created in any repo:', token);
    // Update your app state
  },
  onLoginChanged: (data) => {
    console.log('Login state changed:', data);
    // Update your app state
  }
});
```

**See [docs/INTEGRATION.md](docs/INTEGRATION.md) for detailed integration guide.**

## 🧪 Testing

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run e2e tests only
npm run test:e2e
```

## 📚 Documentation

- **[Integration Guide](docs/INTEGRATION.md)** - How to integrate with other repos
- **[API Reference](docs/API.md)** - Coming soon
- **[Migration Guide](docs/INTEGRATION.md#migration-from-existing-systems)** - Migrate from existing systems

## 🔄 P2P Sync (Optional)

Enable peer-to-peer token synchronization:

```javascript
import { P2PSyncManager } from './src/shared/sync/p2p-sync.js';

const p2p = new P2PSyncManager({
  signalingUrl: 'wss://your-signaling-server.com',
  enabled: true
});

// Sync token to connected peers
p2p.syncToken(token);
```

## 🏗️ Project Structure

```
GPT-Vector-Design/
├── src/
│   └── shared/              # Shared token/wallet system
│       ├── auth/           # Login components
│       ├── wallet/         # Wallet UI components
│       ├── models/         # ClientModel (mongoose emulator)
│       ├── sync/           # P2P sync
│       ├── token-service.js # Token management
│       ├── integration-listener.js # Cross-repo integration
│       └── theme.css       # Pewpi design system
├── tests/
│   ├── unit/              # Unit tests
│   └── e2e/               # End-to-end tests
├── docs/                  # Documentation
├── generators/            # Vector generators
└── index.html            # Main entry point
```

## 🎨 Vector Generators

The repository includes multiple SVG vector generators:
- Mario-themed vectors
- Electronics components
- Chemistry molecules
- Mathematics symbols
- Robotics parts
- And more...

## 🔒 Security

- **No secrets in code**: Never commit API keys or tokens
- **AES-GCM encryption**: Optional encryption for sensitive data
- **HTTPS required**: Always use HTTPS in production
- **ECDH key exchange**: Stub implementation for P2P encryption

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## 📄 License

ISC

## 🐶 Pewpi Ecosystem

Part of the pewpi infinity ecosystem:
- **banksy** - Art creation and curation
- **v** - Version control and history
- **infinity-brain-searc** - Knowledge search
- **repo-dashboard-hub** - Dashboard and metrics
- **GPT-Vector-Design** - Vector design + token system (this repo)

---

## 🧱🤖🧱 MACHINE_DESCRIPTOR (C13B0)

machine_name: GPT-Vector-Design
machine_role: vector_design + token_wallet
token_behavior:
  mint_on_success: true
  token_type: bronze
notes:
  - Production login/wallet/token system
  - Cross-repo integration ready

