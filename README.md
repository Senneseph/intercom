# 13chan Distributed Imageboard

A distributed imageboard application that uses WebRTC for peer-to-peer content sharing, implemented as a Progressive Web App (PWA).

## Features

- **Distributed Architecture**: Content is shared directly between users using WebRTC peer-to-peer connections
- **BitTorrent-Inspired Content Distribution**: Content is split into pieces and distributed efficiently across the network
- **Progressive Web App**: Works offline and can be installed on devices
- **Minimal Server Requirements**: Only needs a lightweight signaling server for peer discovery
- **Reduced Bandwidth Costs**: Images and posts are shared directly between peers
- **Background Sync**: Content syncs automatically when peers connect
- **Responsive Design**: Works on desktop and mobile devices

## How It Works

1. **Peer Discovery**: Users connect to a signaling server to discover other peers
2. **WebRTC Connections**: Direct peer-to-peer connections are established using WebRTC
3. **Content Sharing**: Posts (threads, comments, images) are shared directly between peers
4. **Local Storage**: All content is stored locally using IndexedDB
5. **Background Sync**: Service workers handle syncing content in the background

## Getting Started

### Prerequisites

- Node.js (for running the signaling server)
- A modern web browser that supports WebRTC and Service Workers

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/13-chan/13chan-distributed.git
   cd 13chan-distributed
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the signaling server:

   ```bash
   npm start
   ```

4. In a separate terminal, start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:8000`

## Documentation

Comprehensive documentation is available in the `docs` directory:

- [User Guide](docs/USER_GUIDE.md) - Guide for end users
- [Technical Documentation](docs/TECHNICAL.md) - Detailed technical specifications
- [Integration Guide](docs/INTEGRATION_GUIDE.md) - How to integrate with the network
- [API Reference](docs/API_REFERENCE.md) - Quick reference for the API
- [Architecture Overview](docs/ARCHITECTURE.md) - High-level system design

To serve the documentation locally:

```bash
npm run docs:serve
```

Then open your browser to `http://localhost:8001`

To generate a PDF version of the documentation:

```bash
npm run docs
```

## Deployment

### Signaling Server

The signaling server needs to be deployed to a publicly accessible server with WebSocket support. Options include:

- Heroku
- DigitalOcean
- AWS
- Any VPS provider

Update the `SIGNALING_SERVER` constant in `js/webrtc.js` to point to your deployed signaling server.

### Web Application

The web application can be deployed to any static hosting service:

- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting

## Architecture

### Client-Side

- **IndexedDB**: Local storage for posts, threads, and peer information
- **WebRTC**: Peer-to-peer connections for content sharing
- **Service Worker**: Background processing and offline support

### Server-Side

- **Signaling Server**: Simple WebSocket server for peer discovery and connection establishment

## Limitations

- **Initial Connection**: Requires an internet connection to discover peers
- **Content Availability**: Content is only available if at least one peer has it
- **Scalability**: WebRTC connections can be resource-intensive with many peers
- **NAT Traversal**: Some network configurations may prevent direct peer connections

## Future Improvements

- **Content Moderation**: Implement distributed moderation mechanisms
- **End-to-End Encryption**: Add encryption for private boards
- **Peer Discovery**: Implement alternative peer discovery methods (DHT, etc.)
- **Content Persistence**: Implement a distributed storage solution for long-term content availability
- **Bandwidth Optimization**: Improve image compression and data transfer efficiency

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- WebRTC for enabling peer-to-peer web communications
- The PWA community for advancing web application capabilities
