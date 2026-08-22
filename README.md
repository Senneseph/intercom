# Intercom

**The communications app for the Cyberdeck.**

Intercom is a WebAX application that gives the Cyberdeck a home for every
conversation — a **meta-messaging area where messages from all apps are
collected** (think Google Wave). It installs into the
[Cyberdeck-Launcher](https://github.com/Senneseph/Cyberdeck-Launcher) like any
other WebAX app and talks to the rest of the ecosystem through
[comlink](https://github.com/Senneseph/comlink).

> This repository was restored to its original intent. The 13chan imageboard
> docs that previously lived here are preserved on the `legacy-13chan` branch.

## The idea

Apps on a Cyberdeck generate messages constantly — notifications, results,
requests, shares. Intercom is where they all land, in one place, arranged like
a conversation. It is a **Google Wave-style meta-arrangement**:

- **Wave-like shared spaces** — messages from different apps and people are
  collected into shared, editable conversations, not siloed inboxes.
- **App-to-app and person-to-person** — both a chat app and a message bus with
  a face.
- **First-class Cyberdeck citizen** — installable from the Launcher, visible in
  the share sheet, backed by the OS shims.

## How it fits the ecosystem

| Layer | Project | Role in Intercom |
|---|---|---|
| Transport / trust | [comlink](https://github.com/Senneseph/comlink) | secure inter-app + inter-process messaging between apps and services |
| UI | [jellicule](https://github.com/Senneseph/jellicule) | native `<jel-*>` components for conversations, threads, message lists |
| Business logic | [jcule](https://github.com/Senneseph/jcule) | BLC: message state machine (sent → delivered → read), routing |
| Storage | [memory-core](https://github.com/Senneseph/memory-core) | local message history + sync |
| Host | [Cyberdeck-Launcher](https://github.com/Senneseph/Cyberdeck-Launcher) | install, launch, capability registry, share sheet |
| Services | [CyberdeckOS](https://github.com/Senneseph/CyberdeckOS) | privileged backend (identity, push/relay) when needed |

## Current state

**Foundation** — this is a fresh start on the original proposal:

- [PROPOSAL.md](./PROPOSAL.md) — the original one-line vision that started this project.
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) — the intended design.
- `app/manifest.json` — WebAX manifest so the Launcher can install it.

The app itself is next: message model, comlink transport, wave-style UI.

## Getting started

The app is not built yet. To see where it's headed, read the
[architecture](docs/ARCHITECTURE.md); to see the ecosystem it plugs into, read
the [WebAX README](https://github.com/Senneseph/WebAX).

## License

MIT
