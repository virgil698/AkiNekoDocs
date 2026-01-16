---
title: FAQ
icon: circle-question
order: 2
category:
  - Plugin Documentation
tag:
  - AkiAsync
  - FAQ
---

# AkiAsync FAQ

## Basic Questions

::: details Q: Will the plugin affect game features?
**No.** AkiAsync only optimizes performance without changing any vanilla features. All game mechanics remain consistent with vanilla.
:::

::: details Q: Which Minecraft versions are supported?
Please check [GitHub Releases](https://github.com/virgil698/Aki-Async/releases) for supported version list. Each release notes will indicate supported MC versions.
:::

::: details Q: Which servers are supported?
Currently supports the following servers:
- ✅ Leaves
- ✅ Luminol
- ✅ LightingLuminol
- ✅ Lophine
- ✅ Mint
- ✅ Forks of the above servers
:::

## Installation Issues

::: details Q: Why isn't Mixin working?
Leavesclip disables Mixin by default. You need to add the JVM parameter to your server startup script:

```bash
-Dleavesclip.enable.mixin=true
```

Complete startup command example:
```bash
java -Xms4G -Xmx4G -Dleavesclip.enable.mixin=true -jar server.jar nogui
```
:::

::: details Q: What if the plugin fails to load?
Please check the following:

1. **JDK Version** - Ensure you're using JDK 21 or higher
2. **Server Compatibility** - Ensure you're using a server that supports Leaves Mixin
3. **Mixin Parameter** - Ensure startup command includes `-Dleavesclip.enable.mixin=true`
4. **Plugin Version** - Ensure plugin version matches server version

If the issue persists, please submit an issue on [GitHub Issues](https://github.com/virgil698/Aki-Async/issues) with complete error logs.
:::

::: details Q: How to update the plugin?
1. Stop the server
2. Delete the old plugin JAR file
3. Download and place the new plugin JAR file
4. Restart the server

::: warning Note
It's recommended to backup configuration files before updating, although configs are usually backward compatible.
:::

## Performance Questions

::: details Q: How much performance improvement can I expect?
Performance improvement depends on your server's specific situation, including:
- Number of online players
- World complexity
- Number of other plugins

Generally, you can observe noticeable improvement in TPS stability.
:::

::: details Q: Will the plugin increase memory usage?
Async processing will slightly increase memory usage, but usually within acceptable range. If your server is memory-constrained, consider allocating more memory.
:::

## Compatibility Issues

::: details Q: What if there's a conflict with other plugins?
If you encounter compatibility issues with other plugins:

1. Confirm it's actually a plugin conflict (does the issue disappear when AkiAsync is disabled)
2. Submit an issue on [GitHub Issues](https://github.com/virgil698/Aki-Async/issues)
3. Provide complete plugin list and error logs
:::

## Other Questions

::: details Q: How to get help?
- [GitHub Issues](https://github.com/virgil698/Aki-Async/issues) - Submit bugs or feature requests
- [GitHub Discussions](https://github.com/virgil698/Aki-Async/discussions) - Community discussions
:::
