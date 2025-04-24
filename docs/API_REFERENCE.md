# 13chan Distributed Network - API Reference

This document provides a concise reference for the 13chan distributed network API. For more detailed explanations and examples, see the [Integration Guide](INTEGRATION_GUIDE.md).

## Core API

### Initialization

```javascript
// Import the library
import { ThirteenChan } from 'thirteen-chan-network';

// Initialize with default settings
const network = await ThirteenChan.init();

// Initialize with custom settings
const network = await ThirteenChan.init({
  signaling: 'wss://signaling.13chan.net',
  maxPeers: 10,
  storageQuota: 50 * 1024 * 1024,  // 50MB
  autoConnect: true,
  peerDiscovery: true
});
```

### Network Management

```javascript
// Connect to the network
await network.connect();

// Disconnect from the network
await network.disconnect();

// Get connection status
const isConnected = network.isConnected();

// Get peer count
const peerCount = network.getPeerCount();

// Get peer IDs
const peerIds = network.getPeerIds();

// Get local peer ID
const myPeerId = network.getPeerId();
```

### Content Sharing

```javascript
// Share content
await network.shareContent({
  type: 'post',  // 'post', 'thread', 'image', or custom type
  data: {
    // Content data
  }
});

// Share with priority
await network.shareContent({
  type: 'post',
  data: { /* ... */ },
  priority: 'high'  // 'low', 'normal', or 'high'
});

// Share encrypted content
await network.shareEncryptedContent({
  type: 'post',
  data: { /* ... */ },
  recipients: ['peer-id-1', 'peer-id-2']
});

// Batch share multiple items
await network.batchShare([
  { type: 'post', data: { /* ... */ } },
  { type: 'image', data: { /* ... */ } }
]);
```

### Content Retrieval

```javascript
// Get threads by board
const threads = await network.getThreadsByBoard('b');

// Get posts by thread
const posts = await network.getPostsByThread('thread-123');

// Get specific content
const content = await network.getContent('content-id');

// Search for content
const results = await network.searchContent({
  query: 'search term',
  boards: ['b', 'tech'],
  type: 'post',
  limit: 20
});
```

### Event Handling

```javascript
// Listen for events
network.addEventListener('content', (event) => {
  const { type, data } = event.detail;
  // Handle new content
});

// Remove event listener
network.removeEventListener('content', handleContent);

// One-time event listener
network.once('peer-connected', (event) => {
  // Handle first peer connection
});
```

## Event Types

| Event | Description | Data |
|-------|-------------|------|
| `content` | New content received | `{ type, data, contentId }` |
| `peer-connected` | New peer connection | `{ peerId }` |
| `peer-disconnected` | Peer disconnection | `{ peerId }` |
| `sync-complete` | Content sync completed | `{ contentIds }` |
| `sync-progress` | Sync progress update | `{ contentId, progress }` |
| `storage-warning` | Storage quota warning | `{ usage, quota }` |
| `network-status` | Network status change | `{ status, peerCount }` |

## Storage Management

```javascript
// Get storage usage
const usage = await network.getStorageUsage();
// { used: 1048576, quota: 52428800, percent: 2 }

// Set cleanup policy
network.setCleanupPolicy({
  maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
  minFreeSpace: 10 * 1024 * 1024,   // 10MB
  preserveBoards: ['b', 'important']
});

// Manual cleanup
await network.cleanupStorage({
  before: new Date('2023-01-01'),
  boards: ['old-board'],
  contentTypes: ['image']
});

// Clear all data
await network.clearStorage();
```

## Advanced Features

### Custom Content Types

```javascript
// Register custom content type
network.registerContentType('chat-message', {
  schema: {
    roomId: String,
    sender: String,
    message: String,
    timestamp: String
  },
  maxSize: 8 * 1024,  // 8KB
  priority: 'high'
});

// Use custom content type
await network.shareContent({
  type: 'chat-message',
  data: {
    roomId: 'room-123',
    sender: 'User1',
    message: 'Hello!',
    timestamp: new Date().toISOString()
  }
});
```

### Encryption

```javascript
// Generate encryption keys
const keys = await network.generateEncryptionKeys();
// { publicKey: '...', privateKey: '...' }

// Set encryption mode
network.setEncryptionMode('private', {
  recipients: ['peer-id-1', 'peer-id-2']
});

// Available modes: 'none', 'private', 'group'
```

### Network Diagnostics

```javascript
// Get network statistics
const stats = await network.getNetworkStats();

// Test connection
const testResult = await network.testConnection();

// Set log level
ThirteenChan.setLogLevel('debug');  // 'error', 'warn', 'info', 'debug'
```

## Content Formats

### Thread Format

```javascript
{
  id: 'thread-123',           // Unique identifier
  type: 'thread',             // Content type
  boardId: 'b',               // Board identifier
  subject: 'Thread Subject',  // Thread subject
  name: 'Anonymous',          // Author name
  content: 'Thread content',  // Text content
  timestamp: '2023-04-23T15:30:00Z',  // ISO timestamp
  imageData: 'data:image/jpeg;base64,...'  // Optional image
}
```

### Post Format

```javascript
{
  id: 'post-456',             // Unique identifier
  type: 'post',               // Content type
  threadId: 'thread-123',     // Parent thread
  name: 'Anonymous',          // Author name
  content: 'Post content',    // Text content
  timestamp: '2023-04-23T15:35:00Z',  // ISO timestamp
  imageData: 'data:image/jpeg;base64,...'  // Optional image
}
```

### Image Format

```javascript
{
  id: 'image-789',            // Unique identifier
  type: 'image',              // Content type
  data: 'data:image/jpeg;base64,...',  // Base64 image data
  timestamp: '2023-04-23T15:40:00Z'    // ISO timestamp
}
```

## Error Handling

```javascript
try {
  await network.shareContent({ /* ... */ });
} catch (error) {
  if (error.name === 'NetworkError') {
    // Handle network-related errors
    console.error('Network error:', error.message);
  } else if (error.name === 'StorageError') {
    // Handle storage-related errors
    console.error('Storage error:', error.message);
  } else if (error.name === 'ContentError') {
    // Handle content-related errors
    console.error('Content error:', error.message);
  } else {
    // Handle other errors
    console.error('Unknown error:', error);
  }
}
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `signaling` | String | `'wss://signaling.13chan.net'` | Signaling server URL |
| `maxPeers` | Number | `10` | Maximum peer connections |
| `storageQuota` | Number | `50 * 1024 * 1024` | Storage quota in bytes |
| `autoConnect` | Boolean | `true` | Auto-connect to network |
| `peerDiscovery` | Boolean | `true` | Enable peer discovery |
| `encryption` | Object | `{ mode: 'none' }` | Encryption settings |
| `stun` | Array | `['stun:stun.l.google.com:19302']` | STUN servers |
| `turn` | Array | `[]` | TURN servers |
| `cleanupPolicy` | Object | See below | Storage cleanup policy |

### Default Cleanup Policy

```javascript
{
  maxAge: 30 * 24 * 60 * 60 * 1000,  // 30 days
  minFreeSpace: 5 * 1024 * 1024,     // 5MB
  preserveBoards: []                 // No preserved boards
}
```

## Browser Compatibility

| Browser | Minimum Version | Notes |
|---------|-----------------|-------|
| Chrome | 80+ | Full support |
| Firefox | 76+ | Full support |
| Safari | 14.1+ | Limited mobile support |
| Edge | 80+ | Full support |
| Opera | 67+ | Full support |
| iOS Safari | 14.5+ | Limited PWA support |
| Android Chrome | 80+ | Full support |
