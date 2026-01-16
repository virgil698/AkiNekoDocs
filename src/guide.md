---
title: Get Started
icon: rocket
---

# Get Started

Welcome to Aki & Neko plugins! This guide will help you get started quickly.

## Choose Your Plugin

```component VPCard
title: AkiAsync Optimization Plugin
desc: High-performance async optimization plugin based on Leaves Mixin
logo: https://theme-hope-assets.vuejs.press/logo.svg
link: /akiasync/
background: rgba(134, 239, 172, 0.15)
```

```component VPCard
title: NetherPortalFix
desc: Fixes nether portal teleportation issues
logo: https://theme-hope-assets.vuejs.press/logo.svg
link: /akiasync_netherportalfix/
background: rgba(147, 197, 253, 0.15)
```

## Requirements

::: warning Common Requirements
All Aki & Neko plugins require:

- **JDK 21** or higher
- Server supporting **Leaves Mixin**
- Startup parameter: `-Dleavesclip.enable.mixin=true`
:::

## Supported Servers

| Server | AkiAsync | NetherPortalFix |
|--------|----------|-----------------|
| Leaves | ✅ | ⚠️ Built-in |
| Luminol | ✅ | ✅ Recommended |
| LightingLuminol | ✅ | ✅ |
| Lophine | ✅ | ✅ |
| Mint | ✅ | ✅ |

## Quick Installation

::: tabs

@tab AkiAsync

1. Download the latest version from [GitHub Releases](https://github.com/virgil698/Aki-Async/releases)
2. Place the `.jar` file in the `plugins` folder
3. Add `-Dleavesclip.enable.mixin=true` to your startup script
4. Restart the server

[View detailed installation guide →](/akiasync/install.md)

@tab NetherPortalFix

1. Download the latest version from [GitHub Releases](https://github.com/virgil698/Aki-Async-NetherPortalFix/releases)
2. Place the `.jar` file in the `plugins` folder
3. Add `-Dleavesclip.enable.mixin=true` to your startup script
4. Restart the server

[View detailed installation guide →](/akiasync_netherportalfix/install.md)

:::

## Startup Command Example

```bash
java -Xms4G -Xmx4G -Dleavesclip.enable.mixin=true -jar server.jar nogui
```

## Next Steps

- [AkiAsync Configuration Guide](/akiasync/config/)
- [FAQ](/akiasync/faq.md)

## Get Help

If you encounter any issues:

- [AkiAsync GitHub Issues](https://github.com/virgil698/Aki-Async/issues)
- [NetherPortalFix GitHub Issues](https://github.com/virgil698/Aki-Async-NetherPortalFix/issues)
