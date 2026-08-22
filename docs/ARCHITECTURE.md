# Intercom — Architecture

The original proposal, verbatim:

> We have a dedicated messaging system area where messages from all apps can be
> collected in a meta-arrangement. Think Google Wave.

This document expands that into a design for the Cyberdeck.

## Concept

Intercom is a **meta-messaging area**: a single home where messages produced
by any app or person on the Cyberdeck are collected and arranged as
conversations. It is:

- **A chat app** for person-to-person conversation (familiar, first-class).
- **A message bus with a face** for app-to-app and app-to-person traffic —
  apps post into shared spaces instead of dropping silent notifications.
- **Wave-like**: conversations are shared, live, and editable — participants
  see changes as they happen, and apps join a conversation the same way people
  do.

## Placement in the ecosystem

```
        ┌──────────────────────────────┐
        │       Intercom (app)        │
        │  wave spaces · threads · UI  │
        └──────┬──────────┬────────────┘
               │          │
        ┌──────▼───┐  ┌───▼──────────┐
        │ comlink  │  │ memory-core  │   transport + persistence
        └──────┬───┘  └──────────────┘
               │
   ┌───────────▼────────────┐
   │ Launcher · CyberdeckOS │   host + privileged services
   └────────────────────────┘
```

## Components

### 1. The message model

A message is the atom. Fields: `id`, `spaceId`, `sender` (person or app id),
`kind` (chat / system / share / request / reply), `payload`, `ts`,
`status` (sent → delivered → read — a jcule workflow), `refs` (quoted
messages, source app, source data).

Messages live in **spaces** (the wave analogue). A space is a shared,
addressable conversation: `space { id, title, members[], apps[], kind,
lastActivity }`.

### 2. Transport — comlink

Intercom does not invent a protocol. Person-to-person and app-to-app traffic
rides [comlink](https://github.com/Senneseph/comlink): trust boundaries,
permission model, origin verification. A local (same-device) conversation uses
the intra-browser transport; a remote one uses the network transport — the app
sees one `comlink` API either way.

### 3. The BLC — jcule

Conversation logic is a spec, not glue:

- **Workflow spec** — message lifecycle (`sent → delivered → read`), space
  lifecycle (`open → archived`).
- **UIxAAS / renderView** — message list, composer, space picker generated from
  the message + space schemas via jellicule components.
- State lives in the jcule store; UI state is a subset.

### 4. Persistence — memory-core

History is stored locally (memory-core) and synced; nothing depends on a
server except what CyberdeckOS provides (identity, optional relay).

### 5. Host — Launcher + CyberdeckOS

The `webax` manifest field declares what Intercom provides (e.g. the `chat`
intent) and requires (e.g. comlink transport, an identity service). The
Launcher's capability registry lets other apps hand conversations to Intercom
through the share sheet — "send this to a conversation".

## Phases

1. **Shell** — installable app in the Launcher (manifest done), message model
   + local space UI with jellicule components.
2. **Comlink wiring** — messages over comlink intra-browser; app-to-app posts
   into spaces; the workflow enforced.
3. **Sync + services** — memory-core sync, identity via CyberdeckOS, remote
   transport, wave-style live updates.

## Related

- [comlink](https://github.com/Senneseph/comlink) — the messaging layer
- [Cyberdeck-Launcher](https://github.com/Senneseph/Cyberdeck-Launcher) — host
- [WebAX](https://github.com/Senneseph/WebAX) — umbrella docs
