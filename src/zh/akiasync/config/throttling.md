---
title: throttling.yml 配置详解
icon: gauge
order: 3
category:
  - 插件文档
tag:
  - AkiAsync
  - 配置
---

# throttling.yml 配置详解

实体节流配置文件，控制各类实体的数量限制和移除阈值。

## 文件位置

```
plugins/AkiAsync/throttling.yml
```

::: warning 启用前提
此配置文件需要在 `config.yml` 中启用 `entity-throttling` 才会生效：

```yaml
entity-throttling:
  enabled: true
  config-file: "throttling.yml"
```
:::

---

## 配置说明

每个实体类型可以配置两个参数：

| 参数 | 说明 |
|------|------|
| `limit` | 实体数量限制，超过该数量后实体每 3 tick 才会被更新一次 |
| `removal` | 实体移除限制，超过该数量后最先生成的实体会被逐步移除 |

::: tip 配置建议
- `limit` 应该小于 `removal`（limit < removal）
- 设置为 `-1` 表示不限制该项
- 移除优先级：最早生成的实体优先被移除
:::

---

## 攻击型生物

```yaml
minecraft:zombie:
  limit: 500      # 超过500只僵尸后开始节流
  removal: 1000   # 超过1000只僵尸后开始移除

minecraft:skeleton:
  limit: 400
  removal: 800

minecraft:creeper:
  limit: 300
  removal: 600

minecraft:spider:
  limit: 300
  removal: 600

minecraft:enderman:
  limit: 200
  removal: 400

minecraft:phantom:
  limit: 100
  removal: 200

minecraft:drowned:
  limit: 200
  removal: 400

minecraft:husk:
  limit: 200
  removal: 400

minecraft:stray:
  limit: 200
  removal: 400

minecraft:zombie_villager:
  limit: 100
  removal: 200

minecraft:witch:
  limit: 50
  removal: 100

minecraft:blaze:
  limit: 100
  removal: 200

minecraft:ghast:
  limit: 50
  removal: 100

minecraft:magma_cube:
  limit: 200
  removal: 400

minecraft:slime:
  limit: 200
  removal: 400

minecraft:silverfish:
  limit: 100
  removal: 200

minecraft:endermite:
  limit: 50
  removal: 100

minecraft:shulker:
  limit: 100
  removal: 200

minecraft:hoglin:
  limit: 150
  removal: 300

minecraft:zoglin:
  limit: 100
  removal: 200

minecraft:piglin:
  limit: 200
  removal: 400

minecraft:piglin_brute:
  limit: 50
  removal: 100

minecraft:wither_skeleton:
  limit: 100
  removal: 200
```

---

## 被动型生物

```yaml
minecraft:pig:
  limit: 300
  removal: 600

minecraft:cow:
  limit: 300
  removal: 600

minecraft:sheep:
  limit: 300
  removal: 600

minecraft:chicken:
  limit: 400
  removal: 800

minecraft:rabbit:
  limit: 200
  removal: 400

minecraft:horse:
  limit: 100
  removal: 200

minecraft:donkey:
  limit: 50
  removal: 100

minecraft:mule:
  limit: 50
  removal: 100

minecraft:llama:
  limit: 100
  removal: 200

minecraft:fox:
  limit: 100
  removal: 200

minecraft:wolf:
  limit: 100
  removal: 200

minecraft:cat:
  limit: 100
  removal: 200

minecraft:ocelot:
  limit: 50
  removal: 100

minecraft:panda:
  limit: 50
  removal: 100

minecraft:polar_bear:
  limit: 50
  removal: 100

minecraft:bee:
  limit: 200
  removal: 400

minecraft:bat:
  limit: 100
  removal: 200

minecraft:parrot:
  limit: 100
  removal: 200

minecraft:turtle:
  limit: 100
  removal: 200

minecraft:strider:
  limit: 100
  removal: 200

minecraft:goat:
  limit: 100
  removal: 200

minecraft:axolotl:
  limit: 100
  removal: 200

minecraft:frog:
  limit: 100
  removal: 200

minecraft:camel:
  limit: 50
  removal: 100
```

---

## 村民相关

```yaml
minecraft:villager:
  limit: 500      # 村民较重要，限制较宽松
  removal: 1000

minecraft:wandering_trader:
  limit: 10
  removal: 20

minecraft:trader_llama:
  limit: 20
  removal: 40
```

::: tip 村民保护
村民的限制设置较为宽松，因为村民对于交易系统非常重要。如果你的服务器有大型村民交易所，可以适当提高这些值。
:::

---

## 水生生物

```yaml
minecraft:squid:
  limit: 200
  removal: 400

minecraft:glow_squid:
  limit: 100
  removal: 200

minecraft:dolphin:
  limit: 50
  removal: 100

minecraft:cod:
  limit: 300
  removal: 600

minecraft:salmon:
  limit: 300
  removal: 600

minecraft:tropical_fish:
  limit: 300
  removal: 600

minecraft:pufferfish:
  limit: 100
  removal: 200

minecraft:guardian:
  limit: 100
  removal: 200

minecraft:elder_guardian:
  limit: 10
  removal: 20
```

---

## 特殊实体

```yaml
minecraft:iron_golem:
  limit: 50
  removal: 100

minecraft:snow_golem:
  limit: 50
  removal: 100

minecraft:wither:
  limit: 5       # Boss实体严格限制
  removal: 10

minecraft:ender_dragon:
  limit: 1
  removal: 2
```

::: caution Boss 实体
Boss 实体（凋灵、末影龙）的限制非常严格，以防止服务器被恶意刷 Boss 攻击。
:::

---

## 掉落物和经验球

```yaml
minecraft:item:
  limit: 2000     # 掉落物限制较宽松
  removal: 5000

minecraft:experience_orb:
  limit: 1000
  removal: 3000
```

::: tip 掉落物优化
掉落物的限制较为宽松，因为 AkiAsync 已经有专门的掉落物优化功能（智能合并、年龄优化等）。
:::

---

## 投射物

```yaml
minecraft:arrow:
  limit: 500
  removal: 1000

minecraft:spectral_arrow:
  limit: 200
  removal: 400

minecraft:trident:
  limit: 100
  removal: 200

minecraft:fireball:
  limit: 100
  removal: 200

minecraft:small_fireball:
  limit: 200
  removal: 400

minecraft:dragon_fireball:
  limit: 50
  removal: 100

minecraft:wither_skull:
  limit: 100
  removal: 200
```

---

## 载具

```yaml
minecraft:minecart:
  limit: 200
  removal: 400

minecraft:chest_minecart:
  limit: 100
  removal: 200

minecraft:furnace_minecart:
  limit: 50
  removal: 100

minecraft:hopper_minecart:
  limit: 100
  removal: 200

minecraft:tnt_minecart:
  limit: 50
  removal: 100

minecraft:boat:
  limit: 200
  removal: 400

minecraft:chest_boat:
  limit: 100
  removal: 200
```

---

## 自定义配置示例

### 生存服务器（宽松配置）

```yaml
minecraft:zombie:
  limit: 800
  removal: 1500

minecraft:villager:
  limit: 1000
  removal: 2000

minecraft:item:
  limit: 5000
  removal: 10000
```

### 小游戏服务器（严格配置）

```yaml
minecraft:zombie:
  limit: 200
  removal: 400

minecraft:villager:
  limit: 100
  removal: 200

minecraft:item:
  limit: 500
  removal: 1000
```

### 禁用特定实体限制

```yaml
minecraft:villager:
  limit: -1      # 不限制村民数量
  removal: -1    # 不移除村民
```

---

## 注意事项

::: warning 游戏机制影响
启用实体节流可能会影响以下游戏机制：

1. **刷怪塔效率** - 怪物数量限制可能降低刷怪塔产出
2. **村民交易** - 村民数量限制可能影响大型交易所
3. **农场效率** - 动物数量限制可能影响养殖场
4. **红石机器** - 某些依赖大量实体的机器可能受影响
:::

::: tip 调优建议
1. 先使用默认配置运行一段时间
2. 观察服务器性能和玩家反馈
3. 根据实际情况逐步调整限制值
4. 对于重要实体（如村民），可以设置较高的限制
:::
