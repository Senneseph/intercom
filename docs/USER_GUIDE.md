# 13chan Distributed Network - User Guide

Welcome to the 13chan distributed network! This guide explains how the distributed network works and how you can get the most out of it.

## What is a Distributed Network?

Unlike traditional websites where all content is stored on a central server, the 13chan distributed network shares content directly between users. Think of it like BitTorrent, but for an imageboard.

## Benefits for You

### 🚀 Faster Loading

Popular content loads faster because it's available from multiple nearby users, not just from a distant server.

### 🔄 Works Offline

Once you've visited threads, they're saved on your device. You can browse them even when your internet connection is spotty or completely offline.

### 🛡️ More Resilient

There's no single point of failure. Even if some parts of the network go down, the content remains available through other users.

### 💰 Reduced Costs

By sharing the bandwidth load among users, we can keep 13chan free and fast without expensive server costs.

### 🔒 Enhanced Privacy

Your content travels directly to other users, not through a central server that could log or monitor your activity.

## Getting Started

### Installation

For the best experience, install 13chan as a Progressive Web App (PWA):

1. Visit [13chan.net](https://13chan.net) in a modern web browser
2. Look for the install prompt in your browser:
   - Chrome/Edge: Look for the install icon (➕) in the address bar
   - Safari (iOS): Tap the share icon, then "Add to Home Screen"
   - Firefox: Tap the menu icon, then "Install"

### Connection Status

At the top of the page, you'll see your connection status:

- **Peers Connected**: Shows how many other users you're directly connected to
- **Status Indicator**: 
  - 🟢 Green: Connected to the network
  - 🟠 Orange: Connecting to the network
  - 🔴 Red: Disconnected from the network

### Storage Management

The 13chan distributed network stores content on your device. By default, it uses a reasonable amount of storage (up to 50MB), but you can adjust this:

1. Go to Settings (gear icon in the top right)
2. Select "Storage"
3. Adjust the storage slider to your preference
4. Optionally, enable "Auto-cleanup" to automatically remove old content

## Frequently Asked Questions

### How much data does this use?

The distributed network is designed to be efficient. When browsing, you'll use about the same amount of data as a traditional website. When idle, the network uses minimal data to maintain connections with peers.

### Can other users see my IP address?

Yes, peers you connect to directly can see your IP address, similar to using BitTorrent or other P2P applications. If this concerns you, consider using a VPN.

### What happens if I clear my browser data?

Clearing your browser data will remove all locally stored content. You'll need to re-download content from other peers when you visit threads again.

### Does this work on mobile data?

Yes, but be mindful of your data usage. You can adjust settings to limit data usage on mobile networks:

1. Go to Settings > Network
2. Enable "Conserve data on mobile networks"

### Can I contribute more to the network?

Yes! If you have a stable connection and want to help:

1. Go to Settings > Network
2. Increase "Maximum peer connections"
3. Enable "Seed content when idle"

### What browsers are supported?

The 13chan distributed network works best on:
- Chrome 80+
- Firefox 76+
- Safari 14.1+
- Edge 80+
- Opera 67+
- iOS Safari 14.5+
- Android Chrome 80+

### What if content doesn't load?

If content doesn't load:

1. Check your connection status
2. Try refreshing the page
3. If using a restrictive network (corporate, school, etc.), some P2P connections might be blocked

## Advanced Features

### Custom Themes

The distributed network supports custom themes:

1. Go to Settings > Appearance
2. Select a pre-made theme or create your own
3. Your theme settings are stored locally and don't require server changes

### Keyboard Shortcuts

- **R**: Refresh current page
- **B**: Go back to board list
- **N**: Create new thread
- **S**: Open search
- **C**: Toggle compact view
- **T**: Toggle theme (light/dark)

### Offline Mode

To manually enable offline mode:

1. Go to Settings > Network
2. Enable "Offline mode"

This prevents all network connections and only shows locally cached content.

## Helping the Network

The 13chan distributed network gets better as more users participate. Here's how you can help:

- **Keep the app open**: The longer you stay connected, the more you help distribute content
- **Install as PWA**: This allows the app to work in the background
- **Share popular threads**: This helps distribute the content more widely
- **Report bugs**: If something doesn't work, let us know!

## Privacy Considerations

The distributed nature of 13chan provides some privacy benefits but also has some considerations:

### Benefits

- No central server logging all your activity
- Content is fragmented across the network
- No single entity controls all the data

### Considerations

- Peers can see your IP address when directly connected
- Your device stores content you've viewed
- Browser storage can be examined by anyone with access to your device

If privacy is a major concern, consider:
- Using a VPN
- Using private browsing mode (though this limits offline functionality)
- Regularly clearing your browser data

## Troubleshooting

### Can't Connect to Peers

- Check if your firewall is blocking WebRTC connections
- Try a different network (some networks block P2P traffic)
- Ensure your browser is up to date

### High Data Usage

- Go to Settings > Network
- Enable "Limit bandwidth usage"
- Reduce "Maximum peer connections"

### App Feels Slow

- Go to Settings > Storage
- Run "Clean up storage"
- Reduce "Maximum stored content"

### Content Won't Load

- Check your connection status
- Try refreshing the page
- If specific content won't load, it might not be available in the network yet

## Getting Help

If you encounter any issues or have questions:

- Check the [FAQ](https://13chan.net/faq)
- Visit the [Help Board](https://13chan.net/help)
- Join our [Discord](https://discord.gg/13chan)
- Report bugs on [GitHub](https://github.com/13chan/distributed-network/issues)
