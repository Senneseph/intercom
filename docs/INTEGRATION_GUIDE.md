# 13chan Distributed Network - Integration Guide

This guide provides instructions for integrating third-party applications with the 13chan distributed network. By following this guide, you can build chat interfaces, alternative UIs, or any application that needs to share content in a distributed manner.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Basic Integration](#basic-integration)
3. [Content Management](#content-management)
4. [Network Events](#network-events)
5. [Advanced Features](#advanced-features)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)

## Getting Started

### Prerequisites

- Basic knowledge of JavaScript and modern web development
- Familiarity with asynchronous programming and Promises
- Understanding of WebRTC concepts (helpful but not required)

### Installation

#### NPM Package

```bash
npm install thirteen-chan-network
```

#### Direct Script Include

```html
<script src="https://cdn.13chan.net/network.min.js"></script>
```

## Basic Integration

### Initializing the Network

```javascript
// Import the library (if using modules)
import { ThirteenChan } from 'thirteen-chan-network';

// Initialize the network
async function initNetwork() {
  try {
    const network = await ThirteenChan.init({
      // Required: Signaling server URL
      signaling: 'wss://signaling.13chan.net',
      
      // Optional: Configuration options
      maxPeers: 10,                    // Maximum number of peer connections
      storageQuota: 50 * 1024 * 1024,  // Storage quota (50MB)
      autoConnect: true,               // Auto-connect to peers
      peerDiscovery: true              // Enable peer discovery
    });
    
    console.log('Network initialized with peer ID:', network.getPeerId());
    return network;
  } catch (error) {
    console.error('Failed to initialize network:', error);
  }
}

// Usage
const network = await initNetwork();
```

### Connecting to the Network

The network automatically connects to peers when initialized with `autoConnect: true`. To manually control connections:

```javascript
// Connect to the network
await network.connect();

// Disconnect from the network
await network.disconnect();

// Check connection status
const isConnected = network.isConnected();
const peerCount = network.getPeerCount();
```

## Content Management

### Sharing Content

```javascript
// Share a text post
await network.shareContent({
  type: 'post',
  data: {
    boardId: 'b',           // Board identifier
    threadId: 'thread-123',  // Thread identifier
    name: 'Anonymous',       // Author name
    content: 'Hello world!', // Text content
    timestamp: new Date().toISOString()
  }
});

// Share an image
const imageData = await processImageFile(fileInput.files[0]);
await network.shareContent({
  type: 'image',
  data: imageData  // Base64-encoded image data
});

// Create a new thread
await network.shareContent({
  type: 'thread',
  data: {
    boardId: 'b',
    subject: 'New Thread',
    name: 'Anonymous',
    content: 'Thread content',
    timestamp: new Date().toISOString(),
    imageData: imageData  // Optional image
  }
});
```

### Retrieving Content

```javascript
// Get all threads for a board
const threads = await network.getThreadsByBoard('b');

// Get all posts for a thread
const posts = await network.getPostsByThread('thread-123');

// Get a specific piece of content
const content = await network.getContent('content-id');
```

### Content Search

```javascript
// Search for content
const results = await network.searchContent({
  query: 'search term',
  boards: ['b', 'tech'],  // Optional: limit to specific boards
  type: 'post',           // Optional: 'post', 'thread', or 'image'
  limit: 20               // Optional: maximum results
});
```

## Network Events

### Listening for Events

```javascript
// Listen for new content
network.addEventListener('content', (event) => {
  const { type, data } = event.detail;
  console.log(`New ${type} received:`, data);
  
  // Update UI with new content
  if (type === 'post' && isCurrentThread(data.threadId)) {
    appendPostToUI(data);
  }
});

// Listen for peer connections
network.addEventListener('peer-connected', (event) => {
  const { peerId } = event.detail;
  console.log(`Connected to peer: ${peerId}`);
  updatePeerCountUI(network.getPeerCount());
});

// Listen for peer disconnections
network.addEventListener('peer-disconnected', (event) => {
  const { peerId } = event.detail;
  console.log(`Disconnected from peer: ${peerId}`);
  updatePeerCountUI(network.getPeerCount());
});

// Listen for sync completion
network.addEventListener('sync-complete', (event) => {
  const { contentIds } = event.detail;
  console.log(`Synchronized ${contentIds.length} pieces of content`);
});
```

### Available Events

| Event | Description | Data |
|-------|-------------|------|
| `content` | New content received | `{ type, data, contentId }` |
| `peer-connected` | New peer connection | `{ peerId }` |
| `peer-disconnected` | Peer disconnection | `{ peerId }` |
| `sync-complete` | Content sync completed | `{ contentIds }` |
| `sync-progress` | Sync progress update | `{ contentId, progress }` |
| `storage-warning` | Storage quota warning | `{ usage, quota }` |
| `network-status` | Network status change | `{ status, peerCount }` |

## Advanced Features

### Custom Content Types

You can define custom content types for specialized applications:

```javascript
// Define a custom content type
network.registerContentType('chat-message', {
  schema: {
    roomId: String,
    sender: String,
    message: String,
    timestamp: String
  },
  maxSize: 8 * 1024,  // 8KB limit
  priority: 'high'    // Priority for distribution
});

// Share custom content
await network.shareContent({
  type: 'chat-message',
  data: {
    roomId: 'room-123',
    sender: 'User1',
    message: 'Hello everyone!',
    timestamp: new Date().toISOString()
  }
});
```

### Content Encryption

For private content sharing:

```javascript
// Generate encryption keys
const keys = await network.generateEncryptionKeys();

// Share encrypted content
await network.shareEncryptedContent({
  type: 'post',
  data: { /* post data */ },
  recipients: ['peer-id-1', 'peer-id-2']  // Only these peers can decrypt
});

// Set default encryption for all content
network.setEncryptionMode('private', {
  recipients: ['peer-id-1', 'peer-id-2']
});
```

### Network Diagnostics

```javascript
// Get network statistics
const stats = await network.getNetworkStats();
console.log('Network stats:', stats);
/*
{
  peerCount: 8,
  connectedTime: 3600,  // seconds
  dataReceived: 1024000,  // bytes
  dataSent: 512000,  // bytes
  contentCount: 42,
  pieceAvailability: 0.85  // 85% of known content pieces available
}
*/

// Run connection test
const testResult = await network.testConnection();
console.log('Connection test:', testResult);
/*
{
  signaling: 'connected',
  webrtc: 'working',
  natType: 'symmetric',
  turnRequired: true,
  bandwidth: {
    upload: 500000,  // 500 kbps
    download: 2000000  // 2 Mbps
  }
}
*/
```

## Best Practices

### Optimizing Content Sharing

1. **Compress Images**: Always compress and resize images before sharing
   ```javascript
   async function processImage(file) {
     // Example image processing
     const maxWidth = 1024;
     const maxHeight = 1024;
     const quality = 0.85;
     
     return compressImage(file, { maxWidth, maxHeight, quality });
   }
   ```

2. **Batch Operations**: Group related content when possible
   ```javascript
   // Instead of multiple separate operations
   await network.batchShare([
     { type: 'post', data: post1 },
     { type: 'post', data: post2 },
     { type: 'image', data: imageData }
   ]);
   ```

3. **Prioritize Content**: Set priorities for important content
   ```javascript
   await network.shareContent({
     type: 'post',
     data: postData,
     priority: 'high'  // 'low', 'normal', or 'high'
   });
   ```

### Managing Storage

1. **Monitor Storage Usage**
   ```javascript
   const usage = await network.getStorageUsage();
   console.log(`Using ${usage.used} of ${usage.quota} bytes (${usage.percent}%)`);
   ```

2. **Implement Cleanup Policies**
   ```javascript
   // Set automatic cleanup policy
   network.setCleanupPolicy({
     maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days in milliseconds
     minFreeSpace: 10 * 1024 * 1024,   // Maintain at least 10MB free
     preserveBoards: ['b', 'important'] // Never clean these boards
   });
   
   // Manual cleanup
   await network.cleanupStorage({
     before: new Date('2023-01-01'),
     boards: ['old-board'],
     contentTypes: ['image']
   });
   ```

### User Experience

1. **Show Network Status**
   ```javascript
   function updateNetworkStatus() {
     const status = network.getConnectionStatus();
     statusElement.className = `status-${status.state}`;
     statusElement.textContent = `${status.peerCount} peers connected`;
   }
   
   network.addEventListener('network-status', updateNetworkStatus);
   ```

2. **Provide Progress Indicators**
   ```javascript
   network.addEventListener('sync-progress', (event) => {
     const { contentId, progress } = event.detail;
     updateProgressBar(contentId, progress);
   });
   ```

3. **Handle Offline Mode Gracefully**
   ```javascript
   window.addEventListener('online', () => network.connect());
   window.addEventListener('offline', () => {
     showOfflineIndicator();
     // Network will automatically try to reconnect when online
   });
   ```

## Troubleshooting

### Common Issues

1. **Connection Problems**
   - Check if the signaling server is accessible
   - Ensure WebRTC is not blocked by firewalls
   - Try using a TURN server for restrictive networks

2. **Content Not Syncing**
   - Verify that peers are connected
   - Check storage quota and permissions
   - Ensure content format is valid

3. **Performance Issues**
   - Reduce maximum peer connections
   - Optimize image sizes
   - Implement more aggressive cleanup policies

### Debugging

Enable debug logging for detailed information:

```javascript
ThirteenChan.setLogLevel('debug');  // 'error', 'warn', 'info', or 'debug'

// Log specific components
ThirteenChan.setLogLevel({
  network: 'debug',
  storage: 'info',
  content: 'debug'
});
```

### Support Resources

- [GitHub Repository](https://github.com/13chan/distributed-network)
- [API Documentation](https://docs.13chan.net/api)
- [Community Forum](https://forum.13chan.net)
- [Discord Server](https://discord.gg/13chan)
