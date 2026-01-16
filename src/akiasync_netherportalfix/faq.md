---
title: FAQ
icon: circle-question
order: 2
category:
  - Plugin Documentation
tag:
  - NetherPortalFix
  - FAQ
---

# NetherPortalFix FAQ

## Basic Questions

::: details Q: What problem does this plugin solve?
In vanilla Minecraft, when players teleport through nether portals, they may encounter the following issues:

1. Returning from the Nether to the Overworld at the wrong portal
2. Teleport position confusion when multiple portals are close together
3. Original teleport relationships disrupted after building new portals

This plugin records player teleport history to ensure players always return to the correct portal.
:::

::: details Q: Which servers can use this?
| Server | Support Status | Notes |
|--------|----------------|-------|
| Luminol | ✅ Recommended | Fully supported |
| Leaves | ⚠️ Not needed | Has built-in fix feature |
| Other Luminol forks | ✅ Supported | Testing required |

::: warning Note
If you're using Leaves server, you don't need to install this plugin as Leaves already has built-in nether portal fix functionality.
:::

::: details Q: Will the plugin affect performance?
The plugin has minimal performance impact. It only records data when players use nether portals and doesn't continuously consume server resources.
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
2. **Server Compatibility** - Ensure you're using Luminol or compatible server
3. **Mixin Parameter** - Ensure startup command includes `-Dleavesclip.enable.mixin=true`
4. **Plugin Version** - Ensure plugin version matches server version

If the issue persists, please submit an issue on [GitHub Issues](https://github.com/virgil698/Aki-Async-NetherPortalFix/issues) with complete error logs.
:::

## Usage Questions

::: details Q: How long are teleport records saved?
By default, teleport records are saved for 3600 seconds (1 hour). You can modify the `record-expire-time` parameter in the configuration file to adjust the save duration.

```yaml
# Teleport record expiry time (seconds)
record-expire-time: 3600
```
:::

::: details Q: Do teleport records persist after server restart?
Yes, teleport records are persisted and remain valid after server restart.
:::

::: details Q: Does it support multi-world plugins?
The plugin primarily targets teleportation between the Overworld and Nether. Compatibility with additional worlds created by multi-world plugins may vary. If you encounter issues, please submit an Issue.
:::

## Other Questions

::: details Q: How to get help?
- [GitHub Issues](https://github.com/virgil698/Aki-Async-NetherPortalFix/issues) - Submit bugs or feature requests
:::

::: details Q: How to contribute code?
Contributions via Issues or Pull Requests are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Submit a Pull Request
:::

## Related Links

- [Installation Guide](./install.md)
- [Back to Introduction](./README.md)
