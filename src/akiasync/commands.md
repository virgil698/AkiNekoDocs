---
title: Commands
icon: terminal
order: 4
category:
  - Plugin Documentation
tag:
  - AkiAsync
  - Commands
---

# AkiAsync Commands

AkiAsync provides management commands for reloading configuration and viewing plugin status.

## Command List

| Command | Permission | Description |
|---------|------------|-------------|
| `/aki-reload` | OP | Reload plugin configuration |
| `/akiasync` | OP | Main plugin command |

---

## /aki-reload

Reload all AkiAsync configuration files.

```
/aki-reload
```

### Usage Notes

::: warning Confirmation Required
To prevent accidental operations, this command requires **double confirmation**:

1. First execution: Shows warning message
2. Execute again within 30 seconds: Confirms reload

If not confirmed within 30 seconds, you need to start over.
:::

### Example

```
> /aki-reload
[AkiAsync] Warning: Reloading configuration may cause brief performance fluctuations.
[AkiAsync] Please execute /aki-reload again within 30 seconds to confirm.

> /aki-reload
[AkiAsync] Configuration reloaded successfully!
```

### Reloaded Configuration Files

This command reloads the following configuration files:

- `config.yml` - Main configuration file
- `entities.yml` - Entity list configuration
- `throttling.yml` - Entity throttling configuration

::: tip Note
Some configuration options may require a server restart to take full effect, such as:
- Thread pool size changes
- Seed encryption settings
:::

---

## /akiasync

Main plugin command for viewing plugin information and status.

```
/akiasync [subcommand]
```

### Subcommands

| Subcommand | Description |
|------------|-------------|
| `help` | Show help information |
| `version` | Show plugin version |
| `status` | Show plugin running status |
| `metrics` | Show performance metrics |

### /akiasync help

Show help information for all available commands.

```
> /akiasync help
[AkiAsync] Available commands:
  /aki-reload - Reload configuration
  /akiasync version - View version
  /akiasync status - View status
  /akiasync metrics - View performance metrics
```

### /akiasync version

Show plugin version information.

```
> /akiasync version
[AkiAsync] Version: 1.0.0
[AkiAsync] Author: virgil698
[AkiAsync] Server: Luminol 1.21.x
```

### /akiasync status

Show current plugin running status.

```
> /akiasync status
[AkiAsync] Plugin Status: Running
[AkiAsync] Thread Pool Size: 4
[AkiAsync] Enabled Modules:
  - Entity Tracker: ✓
  - Async Pathfinding: ✓
  - Collision Optimization: ✓
  - Item Entity Optimization: ✓
```

### /akiasync metrics

Show performance metrics (requires `enable-metrics: true` in configuration).

```
> /akiasync metrics
[AkiAsync] Performance Metrics:
  - Async Task Queue: 12/500
  - Pathfinding Cache Hit Rate: 87.3%
  - Entity Tracking Time: 2.3ms
  - Collision Detection Time: 1.1ms
```

---

## Permission Nodes

| Permission Node | Default | Description |
|-----------------|---------|-------------|
| `akiasync.reload` | OP | Allow using /aki-reload |
| `akiasync.admin` | OP | Allow using all admin commands |
| `akiasync.metrics` | OP | Allow viewing performance metrics |

---

## Console Commands

All commands can also be used in the server console without permission verification.

```bash
> aki-reload
[AkiAsync] Configuration reloaded successfully!

> akiasync status
[AkiAsync] Plugin Status: Running
...
```

---
