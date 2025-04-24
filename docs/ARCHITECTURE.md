# 13chan Distributed Network - Architecture Overview

## Introduction

The 13chan distributed network is designed as a modular, extensible platform for peer-to-peer content sharing. This document outlines the high-level architecture, focusing on how the system enables third-party applications to integrate with the network while maintaining compatibility with the core 13chan.net experience.

## System Architecture

![13chan Distributed Network Architecture](https://i.imgur.com/placeholder.png)

### Core Components

The 13chan distributed network consists of several key components that work together to create a resilient, decentralized content sharing platform:

1. **Network Layer**
   - WebRTC connection management
   - Peer discovery via signaling server
   - NAT traversal and connection establishment

2. **Content Distribution Layer**
   - Content chunking and reassembly
   - BitTorrent-inspired piece selection algorithm
   - Content verification and integrity checking

3. **Storage Layer**
   - IndexedDB for persistent local storage
   - Service worker for background operations
   - Content pruning and quota management

4. **Application Layer**
   - Core 13chan.net UI
   - Third-party application interfaces
   - Progressive Web App functionality

### Modular Design

The system is designed with a clear separation of concerns, allowing components to be used independently:

```
┌─────────────────────────────────────────────────────────┐
│                   Application Layer                      │
│                                                         │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐│
│  │  13chan.net   │  │  Third-party  │  │  Other PWAs   ││
│  │     UI        │  │  Chat UI      │  │               ││
│  └───────────────┘  └───────────────┘  └───────────────┘│
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                   Integration API                        │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                   Core Network                           │
│                                                         │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐│
│  │  WebRTC       │  │  Content      │  │  Storage      ││
│  │  Network      │  │  Distribution │  │  Management   ││
│  └───────────────┘  └───────────────┘  └───────────────┘│
└─────────────────────────────────────────────────────────┘
```

## Integration Architecture

### API Design Philosophy

The 13chan distributed network API is designed with these principles:

1. **Simplicity**: Easy to integrate with minimal boilerplate
2. **Consistency**: Predictable behavior across different environments
3. **Extensibility**: Support for custom content types and behaviors
4. **Performance**: Optimized for efficient resource usage
5. **Security**: Content integrity and optional encryption

### Integration Layers

Third-party applications can integrate at different levels:

#### 1. High-Level Integration (Recommended)

Use the complete network stack with a custom UI:

```javascript
import { ThirteenChan } from 'thirteen-chan-network';

// Initialize the network
const network = await ThirteenChan.init();

// Use high-level methods
const threads = await network.getThreadsByBoard('b');
await network.shareContent({ type: 'post', data: postData });

// Listen for events
network.addEventListener('content', handleNewContent);
```

#### 2. Mid-Level Integration

Use specific components of the network:

```javascript
import { ContentManager, PeerNetwork } from 'thirteen-chan-network/core';

// Initialize components separately
const peerNetwork = new PeerNetwork({ signaling: 'wss://signaling.13chan.net' });
const contentManager = new ContentManager({ network: peerNetwork });

// Use component-specific methods
await peerNetwork.connect();
await contentManager.shareContent(content);
```

#### 3. Low-Level Integration

Directly use the underlying protocols:

```javascript
import { WebRTCManager, ContentProtocol } from 'thirteen-chan-network/protocol';

// Implement custom behavior with protocol-level access
const rtc = new WebRTCManager();
const protocol = new ContentProtocol(rtc);

// Handle protocol messages directly
rtc.on('message', (peerId, message) => {
  if (message.type === 'content-piece') {
    // Custom handling of content pieces
  }
});
```

## Data Flow

### Content Creation and Distribution

When content is created and shared across the network:

1. **Content Creation**
   ```
   User creates content in UI → Application calls network.shareContent()
   ```

2. **Content Processing**
   ```
   Content is validated → Content is chunked into pieces → Metadata is generated
   ```

3. **Local Storage**
   ```
   Content pieces and metadata are stored in IndexedDB → Content is added to outbox
   ```

4. **Network Distribution**
   ```
   Metadata is broadcast to peers → Peers request missing pieces → Pieces are distributed across the network
   ```

### Content Consumption

When content is retrieved from the network:

1. **Content Discovery**
   ```
   Application requests content → Network checks local storage → If not found, network queries peers
   ```

2. **Content Retrieval**
   ```
   Missing pieces are requested from peers → Pieces are received and stored → Content is assembled
   ```

3. **Content Verification**
   ```
   Content hash is verified → Content is delivered to application → UI is updated
   ```

## Cross-Platform Compatibility

The 13chan distributed network is designed to work across different platforms and integration scenarios:

### Web Applications

- Progressive Web Apps with full offline support
- Standard web applications with network capabilities
- Embedded components in existing websites

### Mobile Integration

- PWA installation on mobile devices
- WebView integration in native apps
- React Native bridge for native performance

### Desktop Integration

- Electron applications with enhanced capabilities
- PWA installation on desktop operating systems
- Browser extension integration

## Security Model

### Content Integrity

All content in the network includes cryptographic hashes to verify integrity:

```javascript
// Content metadata includes hash
{
  id: 'content-123',
  type: 'post',
  size: 1024,
  pieces: 4,
  hash: 'sha256-hash-of-complete-content'
}
```

### Optional Encryption

For private communications, the network supports end-to-end encryption:

```javascript
// Encrypted content
{
  id: 'encrypted-content-123',
  type: 'encrypted',
  recipients: ['peer-id-1', 'peer-id-2'],
  encryptedData: '...',
  publicKey: '...'
}
```

### Trust Model

The network operates on a "trust but verify" model:

- Content is accepted from any peer
- Content integrity is verified cryptographically
- Applications can implement additional trust layers
- Malicious peers can be blocked at the application level

## Scaling Considerations

### Network Size

The distributed architecture scales with the number of users:

- Each peer typically connects to 5-10 other peers
- Content availability increases with network size
- Popular content propagates faster through the network

### Content Volume

The system is designed to handle increasing content volume:

- Local storage is managed with configurable quotas
- Least recently used content is pruned automatically
- Content popularity affects retention priority

### Performance Optimization

As the network grows, several optimizations maintain performance:

- Adaptive peer selection based on network conditions
- Prioritization of rare content pieces
- Background synchronization during idle periods

## Future Extensions

The architecture is designed to support future enhancements:

### Planned Features

1. **Distributed Moderation**
   - Community-based content filtering
   - Reputation systems for content and peers
   - Configurable moderation policies

2. **Enhanced Media Support**
   - Video streaming via WebRTC
   - Audio message support
   - Adaptive media quality based on network conditions

3. **Advanced Network Topology**
   - DHT-based peer discovery
   - Geographic optimization of peer connections
   - Relay nodes for challenging network environments

## Conclusion

The 13chan distributed network architecture provides a flexible, extensible platform for building decentralized content sharing applications. By separating core network functionality from the user interface, it enables third-party developers to create custom experiences while maintaining compatibility with the broader 13chan ecosystem.

This modular approach ensures that the network can evolve over time, incorporating new technologies and addressing emerging challenges while preserving the fundamental distributed nature of the platform.
