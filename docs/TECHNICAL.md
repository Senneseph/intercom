# 13chan Distributed Network - Technical Documentation

## Overview

The 13chan distributed network is a peer-to-peer content sharing system built on WebRTC technology. It implements a BitTorrent-inspired distribution model where content is split into chunks and distributed across the network. This approach significantly reduces bandwidth requirements and creates a resilient, decentralized platform.

## Core Architecture

### Key Components

1. **WebRTC P2P Communication Layer**
   - Direct browser-to-browser connections
   - Data channels for content exchange
   - Signaling server for initial peer discovery

2. **Content Distribution System**
   - Content chunking (16KB pieces)
   - Metadata exchange
   - BitTorrent-inspired piece selection and distribution

3. **Local Storage Layer**
   - IndexedDB for persistent storage
   - Service worker for offline functionality

4. **Progressive Web App (PWA) Interface**
   - Installable application
   - Offline capabilities
   - Background synchronization

## Content Distribution Protocol

### Content Identification

Each piece of content (post, thread, image) is assigned a unique identifier (UUID) and split into chunks. The system tracks:

- Content metadata (type, size, number of pieces, hash)
- Which peers have which pieces
- The integrity of assembled content

### Content Exchange Process

1. **Content Creation**:
   ```
   User creates content → Content is chunked → Metadata is generated → Initial pieces are distributed to connected peers
   ```

2. **Content Propagation**:
   ```
   Peer receives piece → Stores piece locally → Updates piece availability → Shares piece with other peers
   ```

3. **Content Retrieval**:
   ```
   Peer requests content → Discovers which peers have pieces → Requests missing pieces → Assembles complete content
   ```

### Chunking Algorithm

Content is split into fixed-size chunks (16KB by default) to optimize network transfer:

```javascript
function splitIntoPieces(content) {
  const pieces = new Map();
  const data = content.data;
  for (let i = 0; i < data.length; i += PIECE_SIZE) {
    pieces.set(i / PIECE_SIZE, data.slice(i, i + PIECE_SIZE));
  }
  return pieces;
}
```

### Piece Selection Strategy

When sharing content with new peers, a random piece is selected first to maximize distribution efficiency:

```javascript
// Send random piece to distribute load
const pieceIndex = Math.floor(Math.random() * metadata.pieces);
sendToPeer(peerId, {
  type: 'content-piece',
  contentId,
  pieceIndex,
  data: pieces.get(pieceIndex)
});
```

## Network Protocol

### Message Types

| Message Type | Description | Payload |
|--------------|-------------|---------|
| `register` | Register with signaling server | `{ peerId }` |
| `offer` | WebRTC connection offer | `{ to, from, offer }` |
| `answer` | WebRTC connection answer | `{ to, from, answer }` |
| `ice-candidate` | ICE candidate for connection | `{ to, from, candidate }` |
| `content-metadata` | Metadata about content | `{ contentId, metadata }` |
| `content-piece` | A piece of content | `{ contentId, pieceIndex, data }` |
| `request-piece` | Request for a specific piece | `{ contentId, pieceIndex }` |
| `thread` | Complete thread data | `{ data }` |
| `post` | Complete post data | `{ data }` |

### Peer Discovery

1. Client connects to signaling server
2. Client registers with a unique peer ID
3. Server provides list of active peers
4. Client establishes WebRTC connections with peers
5. After initial connection, content discovery happens directly between peers

## Storage Model

### IndexedDB Structure

The application uses IndexedDB with the following object stores:

| Store | Key | Description |
|-------|-----|-------------|
| `posts` | `id` | Individual posts |
| `threads` | `id` | Thread metadata |
| `boards` | `id` | Board information |
| `peers` | `id` | Known peers and their last seen time |
| `outbox` | `id` | Content pending distribution |
| `contentPieces` | `contentId_pieceIndex` | Individual content pieces |
| `contentMetadata` | `contentId` | Metadata about content |

### Content Persistence

Content is stored locally and persists even when offline. The service worker manages:

- Caching of static assets
- Background synchronization of content
- Processing of content pieces when the application is not active

## Security Considerations

### Content Integrity

Content integrity is verified using cryptographic hashes:

```javascript
async calculateHash(data) {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
```

### Network Security

- All WebRTC connections are encrypted by default
- The signaling server only facilitates connection establishment
- No content passes through the signaling server

## Performance Optimizations

### Bandwidth Management

- Maximum image size: 256KB
- Maximum text size: 16KB
- Chunk size: 16KB
- Selective piece sharing to distribute network load

### Connection Management

- Limit on maximum peer connections (10 by default)
- Prioritization of peers with rare content pieces
- Periodic pruning of inactive peer connections

## Third-Party Integration

### Integration API

Third-party applications can integrate with the 13chan distributed network through a JavaScript API:

```javascript
// Initialize the 13chan network
const network = await ThirteenChan.init({
  signaling: 'wss://signaling.13chan.net',
  maxPeers: 10,
  storageQuota: 50 * 1024 * 1024 // 50MB
});

// Listen for new content
network.addEventListener('content', (event) => {
  const { type, data } = event.detail;
  // Handle new content
});

// Share content
await network.shareContent({
  type: 'post',
  data: {
    text: 'Hello, distributed world!',
    image: imageDataUrl
  }
});
```

### Content Format

Content shared through the network must follow this format:

```javascript
{
  id: String,           // Unique identifier (UUID)
  type: String,         // 'thread', 'post', or 'image'
  timestamp: String,    // ISO timestamp
  data: Object | String // Content data or Base64 string for images
}
```

### Events

| Event | Description | Data |
|-------|-------------|------|
| `peer-connected` | New peer connection | `{ peerId }` |
| `peer-disconnected` | Peer disconnection | `{ peerId }` |
| `content` | New content received | `{ type, data }` |
| `sync-complete` | Content sync completed | `{ contentIds }` |

## Implementation Considerations

### Browser Compatibility

The distributed network requires browsers that support:

- WebRTC (RTCPeerConnection, RTCDataChannel)
- IndexedDB
- Service Workers
- Web Crypto API

This includes recent versions of Chrome, Firefox, Safari, and Edge.

### Network Constraints

- NAT traversal may require TURN servers in restrictive networks
- Maximum concurrent peer connections depend on device capabilities
- Mobile devices may have more limited connection capabilities

### Storage Limitations

- IndexedDB storage limits vary by browser (typically 50MB-1GB)
- Users can configure maximum storage allocation
- Least recently used content is pruned when storage limits are reached
