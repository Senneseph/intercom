# 13chan Distributed Network Documentation

Welcome to the documentation for the 13chan distributed network. This documentation provides comprehensive information about the network architecture, implementation details, and integration guides.

## Documentation Index

### For Users

- [**README**](README.md) - Overview of the 13chan distributed network
- [**User Guide**](USER_GUIDE.md) - Guide for end users of the network

### For Developers

- [**Technical Documentation**](TECHNICAL.md) - Detailed technical specifications
- [**Architecture Overview**](ARCHITECTURE.md) - High-level system design
- [**Integration Guide**](INTEGRATION_GUIDE.md) - How to integrate with the network
- [**API Reference**](API_REFERENCE.md) - Quick reference for the API
- [**Diagrams**](DIAGRAM.md) - Visual representations of the system

### Additional Resources

- [GitHub Repository](https://github.com/13chan/distributed-network)
- [Live Demo](https://13chan.net)
- [Community Forum](https://forum.13chan.net)

## Quick Start

### For Users

1. Visit [13chan.net](https://13chan.net) in a modern web browser
2. Install as a Progressive Web App when prompted
3. Start browsing and posting - everything else happens automatically!

### For Developers

```javascript
// Install the library
npm install thirteen-chan-network

// Import and initialize
import { ThirteenChan } from 'thirteen-chan-network';
const network = await ThirteenChan.init();

// Share content
await network.shareContent({
  type: 'post',
  data: {
    content: 'Hello distributed world!',
    name: 'Anonymous'
  }
});

// Listen for new content
network.addEventListener('content', (event) => {
  console.log('New content:', event.detail);
});
```

## Key Features

- **WebRTC Peer-to-Peer Communication**: Direct browser-to-browser connections
- **BitTorrent-Inspired Content Distribution**: Efficient sharing of content pieces
- **Progressive Web App**: Works offline and can be installed on devices
- **IndexedDB Storage**: Persistent local storage of content
- **Service Worker Background Sync**: Content syncs even when the app is closed

## System Requirements

### For Users

- **Desktop**: Chrome 80+, Firefox 76+, Safari 14.1+, Edge 80+
- **Mobile**: iOS Safari 14.5+, Android Chrome 80+
- **Storage**: At least 50MB of available storage (configurable)
- **Network**: Any internet connection (works better with stable connections)

### For Developers

- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher
- **WebRTC Support**: Development environment must support WebRTC
- **HTTPS**: Required for production deployments (WebRTC security requirement)

## Contributing

We welcome contributions from the community! Check out our [Contributing Guide](https://github.com/13chan/distributed-network/blob/main/CONTRIBUTING.md) to learn how you can help improve the 13chan distributed network.

## License

The 13chan distributed network is released under the MIT License. See the [LICENSE](https://github.com/13chan/distributed-network/blob/main/LICENSE) file for details.
