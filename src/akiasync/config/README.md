---
title: Configuration Overview
icon: gear
order: 3
category:
  - Plugin Documentation
tag:
  - AkiAsync
  - Configuration
---

# AkiAsync Configuration Overview

AkiAsync uses multiple configuration files to manage different functional modules.

## Configuration Files

```component VPCard
title: config.yml
desc: Main configuration file containing all core feature switches and parameters
logo: https://theme-hope-assets.vuejs.press/logo.svg
link: ./config.md
background: rgba(134, 239, 172, 0.15)
```

```component VPCard
title: entities.yml
desc: Entity list configuration defining zero-delay factory entities and collision optimization exclusion list
logo: https://theme-hope-assets.vuejs.press/logo.svg
link: ./entities.md
background: rgba(147, 197, 253, 0.15)
```

```component VPCard
title: throttling.yml
desc: Entity throttling configuration controlling entity limits and removal thresholds
logo: https://theme-hope-assets.vuejs.press/logo.svg
link: ./throttling.md
background: rgba(253, 230, 138, 0.15)
```

## File Location

All configuration files are located in `plugins/AkiAsync/` directory:

```
plugins/AkiAsync/
├── config.yml          # Main configuration
├── entities.yml        # Entity list configuration
└── throttling.yml      # Entity throttling configuration
```

## Reload Configuration

After modifying configuration, use the following command to reload:

```bash
/aki-reload
```

::: warning Note
First execution will show a warning, you need to execute again within 30 seconds to confirm reload.
:::
