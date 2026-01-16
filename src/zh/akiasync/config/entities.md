---
title: entities.yml 配置详解
icon: cube
order: 2
category:
  - 插件文档
tag:
  - AkiAsync
  - 配置
---

# entities.yml 配置详解

实体列表配置文件，定义零延迟工厂实体和碰撞优化排除列表。

## 文件位置

```
plugins/AkiAsync/entities.yml
```

## 实体 ID 格式

所有实体 ID 使用 Minecraft 命名空间格式：

```
minecraft:entity_name
```

---

## 零延迟工厂实体列表

这些方块实体使用零延迟工厂模式优化，将 tick 延迟降至 0，提升工厂效率。

```yaml
zero-delay-factory-entities:
  - "minecraft:hopper"
  - "minecraft:furnace"
  - "minecraft:blast_furnace"
  - "minecraft:smoker"
  - "minecraft:brewing_stand"
  - "minecraft:beacon"
  - "minecraft:chest"
  - "minecraft:trapped_chest"
  - "minecraft:barrel"
  - "minecraft:shulker_box"
  - "minecraft:ender_chest"
  - "minecraft:dropper"
  - "minecraft:dispenser"
```

### 支持的方块实体

| 实体 ID | 中文名称 | 说明 |
|---------|----------|------|
| `minecraft:hopper` | 漏斗 | 物品传输核心 |
| `minecraft:furnace` | 熔炉 | 基础冶炼 |
| `minecraft:blast_furnace` | 高炉 | 矿物冶炼 |
| `minecraft:smoker` | 烟熏炉 | 食物烹饪 |
| `minecraft:brewing_stand` | 酿造台 | 药水酿造 |
| `minecraft:beacon` | 信标 | 效果发射 |
| `minecraft:chest` | 箱子 | 物品存储 |
| `minecraft:trapped_chest` | 陷阱箱 | 红石触发 |
| `minecraft:barrel` | 木桶 | 物品存储 |
| `minecraft:shulker_box` | 潜影盒 | 便携存储 |
| `minecraft:ender_chest` | 末影箱 | 跨维度存储 |
| `minecraft:dropper` | 投掷器 | 物品投放 |
| `minecraft:dispenser` | 发射器 | 物品发射 |

::: tip 自定义添加
如果你使用了模组添加的方块实体，可以将其 ID 添加到列表中以获得优化。
:::

---

## 碰撞优化排除列表

这些实体将不受碰撞优化影响，保持原版物理行为。

```yaml
collision-optimization-excluded-entities:
  - "minecraft:tnt"
  - "minecraft:tnt_minecart"
```

### 默认排除实体

| 实体 ID | 中文名称 | 排除原因 |
|---------|----------|----------|
| `minecraft:tnt` | TNT 实体 | TNT 复制机必需精确物理 |
| `minecraft:tnt_minecart` | TNT 矿车 | 精密红石机器需要 |

### 何时需要添加排除

::: warning 精密红石机器
如果你的服务器有以下类型的机器，可能需要将相关实体添加到排除列表：

- **TNT 复制机** - 需要精确的 TNT 物理时序
- **下落方块机器** - 需要精确的重力物理
- **实体传输机** - 需要精确的碰撞检测
:::

### 添加自定义排除

```yaml
collision-optimization-excluded-entities:
  - "minecraft:tnt"
  - "minecraft:tnt_minecart"
  - "minecraft:falling_block"  # 添加下落方块
  - "minecraft:sand"  # 添加沙子（如果需要）
```

::: caution 性能影响
排除实体会略微降低性能，但对于精密机器是必需的。只添加真正需要的实体。
:::

---

## 完整配置示例

```yaml
# ==========================================
# AkiAsync 实体列表配置 / Entity List Configuration
# ==========================================

# 实体ID格式：minecraft:entity_name

# ==========================================
# 零延迟工厂实体列表 / Zero-Delay Factory Entity List
# ==========================================
zero-delay-factory-entities:
  - "minecraft:hopper"
  - "minecraft:furnace"
  - "minecraft:blast_furnace"
  - "minecraft:smoker"
  - "minecraft:brewing_stand"
  - "minecraft:beacon"
  - "minecraft:chest"
  - "minecraft:trapped_chest"
  - "minecraft:barrel"
  - "minecraft:shulker_box"
  - "minecraft:ender_chest"
  - "minecraft:dropper"
  - "minecraft:dispenser"

# ==========================================
# 碰撞优化排除列表 / Collision Optimization Exclusion List
# ==========================================
collision-optimization-excluded-entities:
  - "minecraft:tnt"
  - "minecraft:tnt_minecart"
```
