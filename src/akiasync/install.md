---
title: Installation Guide
icon: download
order: 1
category:
  - Plugin Documentation
tag:
  - AkiAsync
  - Installation
---

# AkiAsync Installation Guide

## Requirements

::: warning Prerequisites
- JDK 21 or higher
- Server supporting Leaves Mixin (Leaves/Luminol/LightingLuminol/Lophine/Mint)
:::

## Installation Methods

::: tabs

@tab Quick Install

### Step 1: Download Plugin

Go to [GitHub Releases](https://github.com/virgil698/Aki-Async/releases) to download the latest `.jar` file.

### Step 2: Place Plugin

Put the downloaded `.jar` file into the server's `plugins` folder.

```
server_root/
├── plugins/
│   └── AkiAsync-x.x.x.jar  <-- Place here
├── server.jar
└── ...
```

### Step 3: Enable Mixin

Add the following JVM parameter to your server startup script:

```bash
-Dleavesclip.enable.mixin=true
```

Complete startup command example:

```bash
java -Xms4G -Xmx4G -Dleavesclip.enable.mixin=true -jar server.jar nogui
```

### Step 4: Restart Server

Restart the server, and the plugin will automatically load and generate configuration files.

@tab Build from Source

### Step 1: Clone Repository

```bash
git clone https://github.com/virgil698/Aki-Async.git
cd Aki-Async
```

### Step 2: Build Project

::: code-tabs

@tab Linux/macOS

```bash
./gradlew build
```

@tab Windows

```cmd
gradlew.bat build
```

:::

### Step 3: Get Build Output

After successful build, the plugin JAR file will be generated in the `build/libs` directory.

### Step 4: Deploy Plugin

Place the generated `.jar` file into the server's `plugins` folder, enable Mixin following the quick install steps, and restart the server.

## Verify Installation

After server startup, you can verify the plugin is loaded correctly by:

1. Check console logs for any errors
2. Run `/plugins` command to view plugin list
3. Check if configuration files are generated in `plugins/AkiAsync/` directory

## Configuration Files

After first load, the plugin will generate configuration files in `plugins/AkiAsync/` directory:

```yaml
# AkiAsync Configuration
enabled: true
```
