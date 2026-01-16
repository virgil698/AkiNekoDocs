---
title: 快速开始
icon: rocket
---

# 快速开始

欢迎使用 Aki & Neko 系列插件！本指南将帮助你快速上手。

## 选择你的插件

```component VPCard
title: AkiAsync 异步优化插件
desc: 基于 Leaves Mixin 的高性能异步优化插件
logo: https://theme-hope-assets.vuejs.press/logo.svg
link: /zh/akiasync/
background: rgba(134, 239, 172, 0.15)
```

```component VPCard
title: NetherPortalFix 地狱门修复
desc: 修复地狱门传送位置问题
logo: https://theme-hope-assets.vuejs.press/logo.svg
link: /zh/akiasync_netherportalfix/
background: rgba(147, 197, 253, 0.15)
```

## 环境要求

::: warning 通用要求
所有 Aki & Neko 系列插件都需要以下环境：

- **JDK 21** 或更高版本
- 支持 **Leaves Mixin** 的服务端
- 启动参数需包含 `-Dleavesclip.enable.mixin=true`
:::

## 支持的服务端

| 服务端 | AkiAsync | NetherPortalFix |
|--------|----------|-----------------|
| Leaves | ✅ | ⚠️ 已内置 |
| Luminol | ✅ | ✅ 推荐 |
| LightingLuminol | ✅ | ✅ |
| Lophine | ✅ | ✅ |
| Mint | ✅ | ✅ |

## 快速安装步骤

::: tabs

@tab AkiAsync

1. 从 [GitHub Releases](https://github.com/virgil698/Aki-Async/releases) 下载最新版本
2. 将 `.jar` 文件放入 `plugins` 文件夹
3. 在启动脚本中添加 `-Dleavesclip.enable.mixin=true`
4. 重启服务器

[查看详细安装教程 →](/zh/akiasync/install.md)

@tab NetherPortalFix

1. 从 [GitHub Releases](https://github.com/virgil698/Aki-Async-NetherPortalFix/releases) 下载最新版本
2. 将 `.jar` 文件放入 `plugins` 文件夹
3. 在启动脚本中添加 `-Dleavesclip.enable.mixin=true`
4. 重启服务器

[查看详细安装教程 →](/zh/akiasync_netherportalfix/install.md)

:::

## 启动命令示例

```bash
java -Xms4G -Xmx4G -Dleavesclip.enable.mixin=true -jar server.jar nogui
```

## 下一步

- [AkiAsync 配置文件详解](/zh/akiasync/config/)
- [常见问题解答](/zh/akiasync/faq.md)

## 获取帮助

如果遇到问题，可以通过以下方式获取帮助：

- [AkiAsync GitHub Issues](https://github.com/virgil698/Aki-Async/issues)
- [NetherPortalFix GitHub Issues](https://github.com/virgil698/Aki-Async-NetherPortalFix/issues)
