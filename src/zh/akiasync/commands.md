---
title: 指令帮助
icon: terminal
order: 4
category:
  - 插件文档
tag:
  - AkiAsync
  - 指令
---

# AkiAsync 指令帮助

AkiAsync 提供了一些管理指令，用于重载配置和查看插件状态。

## 指令列表

| 指令 | 权限 | 说明 |
|------|------|------|
| `/aki-reload` | OP | 重载插件配置 |
| `/akiasync` | OP | 插件主指令 |

---

## /aki-reload

重载 AkiAsync 的所有配置文件。

```
/aki-reload
```

### 使用说明

::: warning 二次确认机制
为防止误操作，此指令需要**二次确认**：

1. 第一次执行：显示警告信息
2. 在 30 秒内再次执行：确认重载

超过 30 秒未确认，需要重新开始。
:::

### 示例

```
> /aki-reload
[AkiAsync] 警告：重载配置可能会导致短暂的性能波动。
[AkiAsync] 请在 30 秒内再次执行 /aki-reload 以确认。

> /aki-reload
[AkiAsync] 配置重载成功！
```

### 重载的配置文件

执行此指令会重载以下配置文件：

- `config.yml` - 主配置文件
- `entities.yml` - 实体列表配置
- `throttling.yml` - 实体节流配置

::: tip 提示
部分配置项可能需要重启服务器才能完全生效，例如：
- 线程池大小变更
- 种子加密设置
:::

---

## /akiasync

插件主指令，用于查看插件信息和状态。

```
/akiasync [子指令]
```

### 子指令

| 子指令 | 说明 |
|--------|------|
| `help` | 显示帮助信息 |
| `version` | 显示插件版本 |
| `status` | 显示插件运行状态 |
| `metrics` | 显示性能指标 |

### /akiasync help

显示所有可用指令的帮助信息。

```
> /akiasync help
[AkiAsync] 可用指令：
  /aki-reload - 重载配置
  /akiasync version - 查看版本
  /akiasync status - 查看状态
  /akiasync metrics - 查看性能指标
```

### /akiasync version

显示插件版本信息。

```
> /akiasync version
[AkiAsync] 版本: 1.0.0
[AkiAsync] 作者: virgil698
[AkiAsync] 服务端: Luminol 1.21.x
```

### /akiasync status

显示插件当前运行状态。

```
> /akiasync status
[AkiAsync] 插件状态: 运行中
[AkiAsync] 线程池大小: 4
[AkiAsync] 已启用模块:
  - 实体追踪器: ✓
  - 异步寻路: ✓
  - 碰撞优化: ✓
  - 掉落物优化: ✓
```

### /akiasync metrics

显示性能指标（需要在配置中启用 `enable-metrics: true`）。

```
> /akiasync metrics
[AkiAsync] 性能指标:
  - 异步任务队列: 12/500
  - 寻路缓存命中率: 87.3%
  - 实体追踪耗时: 2.3ms
  - 碰撞检测耗时: 1.1ms
```

---

## 权限节点

| 权限节点 | 默认 | 说明 |
|----------|------|------|
| `akiasync.reload` | OP | 允许使用 /aki-reload |
| `akiasync.admin` | OP | 允许使用所有管理指令 |
| `akiasync.metrics` | OP | 允许查看性能指标 |

---

## 控制台指令

所有指令也可以在服务器控制台中使用，无需权限验证。

```bash
> aki-reload
[AkiAsync] 配置重载成功！

> akiasync status
[AkiAsync] 插件状态: 运行中
...
```

---
