---
title: config.yml 配置详解
icon: file-code
order: 1
category:
  - 插件文档
tag:
  - AkiAsync
  - 配置
---

# config.yml 配置详解

主配置文件，包含 AkiAsync 所有核心功能的开关和参数设置。

## 基础配置

```yaml
# 配置版本，请勿修改
version: 20
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `version` | 整数 | `20` | 配置文件版本号，用于插件内部版本管理，**请勿手动修改** |

---

## 统一线程池配置

```yaml
general-thread-pool:
  size: 0
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `size` | 整数 | `0` | 统一线程池大小。`0` = 自动分配（CPU核心数÷4，最小为2）；`>0` = 手动指定线程数量 |

::: tip 调优建议
- **推荐保持默认值 `0`**，让插件根据服务器硬件自动分配
- 如果服务器 CPU 核心数较少（如 2-4 核），可以手动设置为 `2`
- 如果服务器 CPU 核心数较多（如 16+ 核），可以适当增加到 `4-6`
- **更多线程 ≠ 更好性能**，过多线程会增加上下文切换开销
:::

---

## 实体系统优化

### 多线程实体追踪器 (entity-tracker)

```yaml
entity-tracker:
  enabled: true
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用多线程实体追踪器 |

::: info 功能说明
**多线程实体追踪器**将实体追踪计算分散到多个线程并行处理，而不是在主线程串行执行。

**性能提升**：可降低 MSPT 10-30%，尤其在实体密集的区域效果显著。

**工作原理**：
1. 收集需要追踪的实体列表
2. 将实体分批分配给工作线程
3. 各线程并行计算实体的可见性和追踪数据
4. 汇总结果并同步到主线程
:::

---

### 异步生物生成 (mob-spawning)

```yaml
mob-spawning:
  enabled: true
  spawner-optimization: true
  spawn-interval: 1
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用异步生物生成 |
| `spawner-optimization` | 布尔 | `true` | 是否优化刷怪笼性能，减少刷怪笼的计算开销 |
| `spawn-interval` | 整数 | `1` | 生成频率。`1` = 每 tick 检查生成；`2` = 每 2 tick 检查一次，以此类推 |

::: info 功能说明
**异步生物生成**将自然生成的逻辑计算移至异步线程，避免阻塞主线程。

**spawn-interval 参数详解**：
- `1`（默认）：每 tick 都检查生物生成，生成速度最快，但 CPU 占用较高
- `2`：每 2 tick 检查一次，生成速度降低约 50%，但 CPU 占用明显降低
- `3-5`：适合对生成速度要求不高的服务器，可大幅降低 CPU 占用

**spawner-optimization 参数详解**：
- 启用后，刷怪笼会使用优化的生成算法
- 减少不必要的碰撞检测和位置验证
- 对于大量刷怪笼的服务器效果显著
:::

---

### 实体密度控制 (density)

```yaml
density:
  enabled: true
  max-per-chunk: 80
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用实体密度控制 |
| `max-per-chunk` | 整数 | `80` | 单个区块内允许的最大实体数量 |

::: info 功能说明
**实体密度控制**限制单个区块内的实体数量，防止实体过多导致的卡顿。

**max-per-chunk 参数详解**：
- `80`（默认）：适合大多数服务器，平衡性能和游戏体验
- `50-60`：适合性能较差的服务器，更严格的限制
- `100-150`：适合高性能服务器，允许更多实体

**注意事项**：
- 此限制包括所有类型的实体（生物、掉落物、投射物等）
- 超过限制后，新实体可能无法在该区块生成
- 不会移除已存在的实体，只阻止新实体生成
:::

---

### AI 降频 (brain)

```yaml
brain:
  enabled: true
  throttle-interval: 10
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用 AI 降频 |
| `throttle-interval` | 整数 | `10` | 静止实体的 AI 更新间隔（tick） |

::: info 功能说明
**AI 降频**对静止不动的实体降低 AI 更新频率，节省 CPU 资源。

**throttle-interval 参数详解**：
- `10`（默认）：静止实体每 10 tick（0.5 秒）更新一次 AI
- `5`：更频繁的更新，AI 反应更灵敏，但 CPU 占用更高
- `20`：更低的更新频率，更省 CPU，但 AI 反应可能略迟钝

**工作原理**：
1. 检测实体是否处于静止状态（无移动、无目标）
2. 静止实体的 AI 更新频率降低到每 N tick 一次
3. 一旦实体开始移动或有新目标，立即恢复正常更新频率

**适用场景**：
- 大量动物聚集的农场
- 村民交易所
- 任何有大量静止生物的区域
:::

---

### 窒息优化 (suffocation-optimization)

```yaml
suffocation-optimization:
  enabled: true
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用窒息检测优化 |

::: info 功能说明
**窒息优化**仅在实体能够受到伤害时才进行窒息检测，减少不必要的计算。

**优化原理**：
- 原版每 tick 都会检测所有实体是否窒息
- 优化后，只有当实体处于可受伤状态时才检测
- 跳过无敌时间内的实体、创造模式玩家等

**性能提升**：减少约 5-10% 的实体 tick 计算量
:::

---

### 抛射物优化 (projectile)

```yaml
projectile:
  enabled: true
  max-loads-per-tick: 10
  max-loads-per-projectile: 10
```

| 配置项 | 类型 | 默认值 | 推荐范围 | 说明 |
|--------|------|--------|----------|------|
| `enabled` | 布尔 | `true` | - | 是否启用抛射物优化 |
| `max-loads-per-tick` | 整数 | `10` | 8-15 | 每 tick 所有抛射物最多加载的区块数 |
| `max-loads-per-projectile` | 整数 | `10` | 8-15 | 单个抛射物在其生命周期内最多加载的区块数 |

::: info 功能说明
**抛射物优化**限制抛射物（箭、三叉戟、末影珍珠等）加载区块的能力，防止抛射物导致的卡顿。

**问题背景**：
- 高速飞行的抛射物会触发大量区块加载
- 末影珍珠、三叉戟等可以飞行很远
- 大量抛射物同时飞行会导致严重卡顿

**参数调优**：
- `max-loads-per-tick`：控制每 tick 的总区块加载量
  - 值越小，服务器越稳定，但抛射物可能"卡住"
  - 值越大，抛射物飞行更流畅，但可能造成卡顿
- `max-loads-per-projectile`：控制单个抛射物的区块加载量
  - 限制单个抛射物的影响范围
  - 防止单个末影珍珠加载过多区块
:::

---

### 虚拟实体兼容性 (virtual-entity-compatibility)

```yaml
virtual-entity-compatibility:
  enabled: true
  bypass-packet-queue: true
  exclude-from-throttling: true
  
  plugins:
    fancynpcs:
      enabled: true
      use-api: true
      priority: 90
    znpcsplus:
      enabled: true
      use-api: false
      priority: 90
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用虚拟实体兼容 |
| `bypass-packet-queue` | 布尔 | `true` | 虚拟实体的数据包是否绕过队列直接发送 |
| `exclude-from-throttling` | 布尔 | `true` | 是否将虚拟实体从所有节流优化中排除 |

**plugins 子配置**：

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `fancynpcs.enabled` | 布尔 | `true` | 是否识别 FancyNpcs 插件的 NPC |
| `fancynpcs.use-api` | 布尔 | `true` | 是否使用 API 检测（更准确） |
| `fancynpcs.priority` | 整数 | `90` | 检测优先级（数值越高越优先） |
| `znpcsplus.enabled` | 布尔 | `true` | 是否识别 ZNPCsPlus 插件的 NPC |
| `znpcsplus.use-api` | 布尔 | `false` | 是否使用 API 检测（ZNPCsPlus 使用名称前缀检测） |
| `znpcsplus.priority` | 整数 | `90` | 检测优先级 |

::: warning 重要提示
**禁用此功能后**，虚拟实体插件（如 FancyNpcs、ZNPCsPlus、Citizens 等）可能无法正常显示 NPC。

**影响范围**：
- 实体包节流
- 掉落物优化
- 下落方块优化
- 其他实体相关优化

如果你使用了 NPC 插件但 NPC 不显示，请确保此功能已启用。
:::

---

## 实体碰撞优化 (collision-optimization)

```yaml
collision-optimization:
  enabled: true
  exclusion-list-file: "entities.yml"
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用实体碰撞优化 |
| `exclusion-list-file` | 字符串 | `"entities.yml"` | 排除列表配置文件路径 |

::: info 功能说明
**实体碰撞优化**针对密集实体环境提供高性能碰撞检测优化。

**性能提升**：40-60%，在实体密集区域效果尤为显著。

**排除列表**：某些需要精确物理的实体（如 TNT）可以添加到排除列表，详见 [entities.yml 配置](./entities.md)。
:::

### 原生碰撞检测 (native)

```yaml
  native:
    enabled: true
    fallback-enabled: true
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用原生碰撞检测 |
| `fallback-enabled` | 布尔 | `true` | 不支持时是否降级到普通逻辑 |

::: info 功能说明
**原生碰撞检测**使用堆外内存和 AVX SIMD 向量化技术加速碰撞计算。

**技术要求**：
- JDK 17 或更高版本
- 需要添加 JVM 参数：`--add-modules jdk.incubator.vector`

**fallback-enabled 说明**：
- `true`：如果服务器不支持原生检测，自动降级到普通逻辑
- `false`：不支持时直接禁用此优化

**性能提升**：在支持的硬件上可提升 2-3 倍碰撞检测速度。
:::

### 基础碰撞优化

```yaml
  aggressive-mode: true
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `aggressive-mode` | 布尔 | `true` | 是否启用激进模式，跳过更多检查 |

::: info 功能说明
**激进模式**会跳过一些不太重要的碰撞检查，进一步提升性能。

**跳过的检查包括**：
- 静止实体的碰撞检测
- Paper 配置中已禁用的碰撞类型
- 某些边缘情况的检测

**注意**：极少数情况下可能导致碰撞行为与原版略有差异。
:::

### 方块缓存 (block-cache)

```yaml
  block-cache:
    enabled: true
    cache-size: 512
    expire-ticks: 600
```

| 配置项 | 类型 | 默认值 | 推荐范围 | 说明 |
|--------|------|--------|----------|------|
| `enabled` | 布尔 | `true` | - | 是否启用方块缓存 |
| `cache-size` | 整数 | `512` | 256-1024 | 缓存大小（条目数） |
| `expire-ticks` | 整数 | `600` | 400-1200 | 缓存过期时间（tick，600 = 30 秒） |

::: info 功能说明
**方块缓存**缓存碰撞检测中的方块状态查询结果，避免重复查询。

**性能提升**：10-15%

**参数调优**：
- `cache-size`：
  - 较小的值（256）：内存占用低，但缓存命中率可能较低
  - 较大的值（1024）：缓存命中率高，但内存占用增加
- `expire-ticks`：
  - 较短的时间（400）：缓存更新更及时，适合方块变化频繁的服务器
  - 较长的时间（1200）：缓存命中率更高，适合方块变化较少的服务器
:::

### Nitori/Lithium 实体优化 (nitori-entity-optimizations)

```yaml
  nitori-entity-optimizations:
    mob-sunburn-optimization:
      enabled: true
    entity-speed-optimization:
      enabled: true
    entity-fall-damage-optimization:
      enabled: true
    entity-section-storage-optimization:
      enabled: true
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `mob-sunburn-optimization.enabled` | 布尔 | `true` | 生物日光燃烧优化：缓存 BlockPos，提前检查亮度 |
| `entity-speed-optimization.enabled` | 布尔 | `true` | 实体速度优化：缓存方块速度因子 |
| `entity-fall-damage-optimization.enabled` | 布尔 | `true` | 实体掉落伤害优化：跳过简单实体的掉落伤害计算 |
| `entity-section-storage-optimization.enabled` | 布尔 | `true` | 实体区段快速检索优化：小区域使用直接哈希查找 |

::: info 功能说明
这些优化来源于 **Nitori** 和 **Lithium** Fabric 模组，经过移植和适配。

**各优化详解**：

1. **mob-sunburn-optimization**（生物日光燃烧优化）
   - 缓存 BlockPos 对象，减少对象创建
   - 提前检查亮度等级，跳过不必要的计算
   - 对于大量亡灵生物的服务器效果显著

2. **entity-speed-optimization**（实体速度优化）
   - 缓存方块的速度因子（如灵魂沙减速）
   - 避免每 tick 重复查询方块属性
   - 对于大量实体移动的场景效果显著

3. **entity-fall-damage-optimization**（实体掉落伤害优化）
   - 跳过不需要计算掉落伤害的实体（如鸡、猫等）
   - 减少不必要的伤害计算

4. **entity-section-storage-optimization**（实体区段快速检索优化）
   - 对于小区域的实体查询使用直接哈希查找
   - 避免遍历整个区段列表
   - 对于频繁的实体查询操作效果显著
:::

### 射线碰撞检测 (ray-collision)

```yaml
  ray-collision:
    enabled: true
    max-distance: 64.0
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用射线碰撞检测优化 |
| `max-distance` | 浮点 | `64.0` | 最大检测距离（方块） |

::: info 功能说明
**射线碰撞检测**使用 DDA（Digital Differential Analyzer）算法优化射线追踪。

**性能提升**：50-70%

**应用场景**：
- 实体视线检测
- 投射物碰撞检测
- 玩家交互射线检测

**max-distance 说明**：
- 超过此距离的射线检测将被截断
- 较小的值可以提升性能，但可能影响远距离检测
- 64 方块对于大多数场景已经足够
:::

### 形状优化 (shape-optimization)

```yaml
  shape-optimization:
    enabled: true
    precompute-arrays: true
    block-shape-cache: true
    cache-size: 512
```

| 配置项 | 类型 | 默认值 | 推荐范围 | 说明 |
|--------|------|--------|----------|------|
| `enabled` | 布尔 | `true` | - | 是否启用形状优化 |
| `precompute-arrays` | 布尔 | `true` | - | 是否预计算形状数组 |
| `block-shape-cache` | 布尔 | `true` | - | 是否启用方块形状缓存 |
| `cache-size` | 整数 | `512` | 512-2048 | 缓存大小 |

::: info 功能说明
**形状优化**预计算和缓存碰撞形状，减少对象分配和重复计算。

**性能提升**：方块形状缓存可提升 2-3 倍碰撞形状查询速度。

**各参数详解**：

1. **precompute-arrays**
   - 在服务器启动时预计算常用的形状数组
   - 减少运行时的计算开销
   - 会略微增加启动时间

2. **block-shape-cache**
   - 缓存方块的碰撞形状
   - 避免每次碰撞检测都重新计算形状
   - 对于复杂形状的方块（如楼梯、栅栏）效果显著

3. **cache-size**
   - 较小的值（512）：适合内存有限的服务器
   - 较大的值（2048）：适合方块种类繁多的模组服务器
:::

---

## 实体移动优化 (living-entity-travel-optimization)

```yaml
living-entity-travel-optimization:
  enabled: true
  skip-interval: 2
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用实体移动优化 |
| `skip-interval` | 整数 | `2` | 每 N 个 tick 处理一次移动计算 |

::: info 功能说明
**实体移动优化**降低实体移动计算的频率，减少 CPU 占用。

**skip-interval 参数详解**：
- `1`：每 tick 都计算移动（原版行为）
- `2`（默认）：每 2 tick 计算一次，性能提升约 50%
- `3-4`：更低的计算频率，但可能导致移动不够平滑

**注意事项**：
- 此优化主要影响生物的移动计算
- 玩家移动不受影响
- 过高的 skip-interval 可能导致生物移动看起来"卡顿"
:::

---

## 生物消失检查优化 (mob-despawn-optimization)

```yaml
mob-despawn-optimization:
  enabled: true
  check-interval: 20
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用生物消失检查优化 |
| `check-interval` | 整数 | `20` | 消失检查间隔（tick，20 = 1 秒） |

::: info 功能说明
**生物消失检查优化**降低生物消失检查的频率，减少不必要的计算。

**check-interval 参数详解**：
- `20`（默认）：每秒检查一次，平衡性能和响应速度
- `10`：每 0.5 秒检查一次，响应更快但 CPU 占用更高
- `40`：每 2 秒检查一次，更省 CPU 但消失响应较慢

**原版行为**：原版每 tick 都会检查生物是否应该消失，这是不必要的开销。
:::

---

## 并行实体 Tick (entity-tick-parallel)

```yaml
entity-tick-parallel:
  enabled: true
  min-entities: 50
  batch-size: 8
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用并行实体 Tick |
| `min-entities` | 整数 | `50` | 低于此实体数量时不启用并行处理 |
| `batch-size` | 整数 | `8` | 每批处理的实体数量 |

::: info 功能说明
**并行实体 Tick**使用多线程并行处理实体的 tick 更新，充分利用多核 CPU。

**参数详解**：

1. **min-entities**
   - 当区域内实体数量低于此值时，使用单线程处理
   - 避免小规模场景下多线程的额外开销
   - 推荐值：30-100

2. **batch-size**
   - 每个工作线程一次处理的实体数量
   - 较小的值（4-8）：负载更均衡，但调度开销更大
   - 较大的值（16-32）：调度开销小，但可能负载不均

**线程数**：由 `general-thread-pool.size` 统一控制。

**性能提升**：在实体密集区域可提升 30-50% 的实体处理性能。
:::

---

## 实体节流 (entity-throttling)

```yaml
entity-throttling:
  enabled: false
  config-file: "throttling.yml"
  check-interval: 100
  throttle-interval: 3
  removal-batch-size: 10
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `false` | 是否启用实体节流（默认关闭） |
| `config-file` | 字符串 | `"throttling.yml"` | 节流配置文件路径 |
| `check-interval` | 整数 | `100` | 检查间隔（每 N tick 检查一次） |
| `throttle-interval` | 整数 | `3` | 节流间隔（超限后每 N tick 更新一次） |
| `removal-batch-size` | 整数 | `10` | 每次检查最多移除的实体数量 |

::: caution 谨慎启用
此功能**默认关闭**，因为可能影响游戏机制。启用前请仔细阅读 [throttling.yml 配置](./throttling.md)。

**影响范围**：
- 刷怪塔效率可能降低
- 大型农场可能受限
- 某些红石机器可能受影响
:::

::: info 功能说明
**实体节流**根据配置文件对特定实体类型进行数量限制和节流。

**参数详解**：

1. **check-interval**
   - 每 100 tick（5 秒）检查一次实体数量
   - 较小的值：响应更快，但 CPU 占用更高
   - 较大的值：响应较慢，但更省 CPU

2. **throttle-interval**
   - 当实体数量超过限制时，这些实体每 3 tick 才更新一次
   - 降低超限实体的更新频率，减少性能影响

3. **removal-batch-size**
   - 每次检查最多移除 10 个超限实体
   - 避免一次性移除大量实体导致的卡顿
   - 移除优先级：最早生成的实体优先被移除
:::

---

## 异步 AI (async-ai)

### 异步寻路 (async-pathfinding)

```yaml
async-ai:
  async-pathfinding:
    enabled: true
    keep-alive-seconds: 60
    max-queue-size: 500
    timeout-ms: 100
    sync-fallback-enabled: true
```

| 配置项 | 类型 | 默认值 | 推荐范围 | 说明 |
|--------|------|--------|----------|------|
| `enabled` | 布尔 | `true` | - | 是否启用异步寻路 |
| `keep-alive-seconds` | 整数 | `60` | 30-120 | 线程存活时间（秒） |
| `max-queue-size` | 整数 | `500` | 500-1000 | 最大队列大小 |
| `timeout-ms` | 整数 | `100` | 50-200 | 寻路超时时间（毫秒） |
| `sync-fallback-enabled` | 布尔 | `true` | - | 异步失败时是否使用同步寻路 |

::: info 功能说明
**异步寻路**将寻路计算移至异步线程，避免阻塞主线程。

**参数详解**：

1. **keep-alive-seconds**
   - 工作线程在空闲多久后被回收
   - 较短的时间：节省内存，但频繁创建线程有开销
   - 较长的时间：线程复用率高，但占用更多内存

2. **max-queue-size**
   - 等待处理的寻路请求队列大小
   - 队列满时，新请求会被丢弃或降级到同步处理
   - 推荐值：500-1000

3. **timeout-ms**
   - 单次寻路计算的超时时间
   - 超时后会返回部分路径或失败
   - 较短的时间：响应更快，但可能找不到最优路径
   - 较长的时间：路径质量更好，但可能造成延迟

4. **sync-fallback-enabled**
   - 当异步寻路失败时，是否降级到同步寻路
   - 建议保持启用，确保生物总能找到路径
:::

### 增强寻路系统 (enhanced)

```yaml
    enhanced:
      enabled: true
      max-concurrent-requests: 30
      max-requests-per-tick: 15
      
      priority:
        high-distance: 16
        medium-distance: 48
      
      cache:
        hot-size: 150
        warm-size: 400
        cold-size: 800
        hot-expire-seconds: 10
        warm-expire-seconds: 30
        cold-expire-seconds: 60
        similarity-tolerance: 3
      
      prewarm:
        enabled: true
        radius: 32
        max-mobs-per-batch: 5
        max-pois-per-mob: 3
        batch-delay-ms: 100
        total-time-seconds: 5
```

**基础配置**：

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用增强寻路系统 |
| `max-concurrent-requests` | 整数 | `30` | 最大并发寻路请求数 |
| `max-requests-per-tick` | 整数 | `15` | 每 tick 最多处理的新请求数 |

**优先级配置 (priority)**：

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `high-distance` | 整数 | `16` | 高优先级距离阈值（方块） |
| `medium-distance` | 整数 | `48` | 中优先级距离阈值（方块） |

**多层缓存配置 (cache)**：

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `hot-size` | 整数 | `150` | 热缓存容量（最常用的路径） |
| `warm-size` | 整数 | `400` | 温缓存容量（较常用的路径） |
| `cold-size` | 整数 | `800` | 冷缓存容量（不常用的路径） |
| `hot-expire-seconds` | 整数 | `10` | 热缓存过期时间（秒） |
| `warm-expire-seconds` | 整数 | `30` | 温缓存过期时间（秒） |
| `cold-expire-seconds` | 整数 | `60` | 冷缓存过期时间（秒） |
| `similarity-tolerance` | 整数 | `3` | 路径相似度容差（方块） |

**预热配置 (prewarm)**：

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用路径预热 |
| `radius` | 整数 | `32` | 预热半径（方块） |
| `max-mobs-per-batch` | 整数 | `5` | 每批最多预热的生物数 |
| `max-pois-per-mob` | 整数 | `3` | 每个生物最多预热的 POI 数 |
| `batch-delay-ms` | 整数 | `100` | 批次延迟（毫秒） |
| `total-time-seconds` | 整数 | `5` | 总预热时间（秒） |

::: info 功能说明
**增强寻路系统**提供优先级队列、多层缓存和路径预热功能，全方位提升寻路性能。

**优先级系统**：
- 距离玩家 16 方块内的寻路请求：高优先级
- 距离玩家 16-48 方块的寻路请求：中优先级
- 距离玩家 48 方块以上的寻路请求：低优先级

**多层缓存**：
- 热缓存：存储最近使用的路径，过期时间短
- 温缓存：存储较常用的路径，过期时间中等
- 冷缓存：存储不常用的路径，过期时间长
- similarity-tolerance：如果起点和终点在容差范围内，可以复用缓存的路径

**路径预热**：
- 在服务器启动或区块加载时，预先计算常用路径
- 减少运行时的寻路计算量
:::

---

### AI 传感器优化 (sensor-optimization)

```yaml
  sensor-optimization:
    enabled: true
    sensing-refresh-interval: 5
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用 AI 传感器优化 |
| `sensing-refresh-interval` | 整数 | `5` | 视线缓存清空间隔（tick） |

::: info 功能说明
**AI 传感器优化**延长视线缓存的清空间隔，减少昂贵的射线追踪计算。

**sensing-refresh-interval 参数详解**：
- `5`（默认）：每 5 tick（0.25 秒）清空一次视线缓存
- `3`：更频繁的更新，AI 反应更灵敏
- `10`：更低的更新频率，更省 CPU

**工作原理**：
- 生物的视线检测结果会被缓存
- 在缓存有效期内，不会重复进行射线追踪
- 缓存过期后才会重新计算
:::

---

### 游戏事件系统优化 (game-event-optimization)

```yaml
  game-event-optimization:
    enabled: true
    early-filter: true
    throttle-low-priority: true
    throttle-interval-ms: 50
    distance-filter: true
    max-detection-distance: 64.0
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用游戏事件系统优化 |
| `early-filter` | 布尔 | `true` | 是否提前过滤不关心的事件 |
| `throttle-low-priority` | 布尔 | `true` | 是否节流低优先级事件 |
| `throttle-interval-ms` | 整数 | `50` | 节流间隔（毫秒） |
| `distance-filter` | 布尔 | `true` | 是否启用距离过滤 |
| `max-detection-distance` | 浮点 | `64.0` | 最大检测距离（方块） |

::: info 功能说明
**游戏事件系统优化**提前过滤不关心的事件，减少 Sculk Sensor 等方块的处理开销。

**各参数详解**：

1. **early-filter**
   - 在事件传播前就过滤掉不需要处理的事件
   - 减少事件处理的总量

2. **throttle-low-priority**
   - 对低优先级事件进行节流
   - 避免大量低优先级事件占用 CPU

3. **throttle-interval-ms**
   - 低优先级事件的最小处理间隔
   - 50ms 意味着同一类型的低优先级事件每 50ms 最多处理一次

4. **distance-filter**
   - 过滤超出检测距离的事件
   - 减少远距离事件的处理

5. **max-detection-distance**
   - 超过此距离的事件不会被处理
   - 64 方块对于大多数场景已经足够
:::

---

### 村民优化 (villager-optimization)

```yaml
  villager-optimization:
    fast-raytrace:
      enabled: true
      cache-size: 256
    breed-optimization:
      async-villager-breed: true
      age-throttle: true
      check-interval: 5
```

**快速射线追踪 (fast-raytrace)**：

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用快速射线追踪 |
| `cache-size` | 整数 | `256` | 缓存大小 |

**繁殖优化 (breed-optimization)**：

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `async-villager-breed` | 布尔 | `true` | 是否异步处理村民繁殖 |
| `age-throttle` | 布尔 | `true` | 是否启用年龄节流 |
| `check-interval` | 整数 | `5` | 检查间隔（tick） |

::: info 功能说明
**村民优化**针对村民的特殊行为进行优化。

**fast-raytrace**：
- 缓存村民的视线检测结果
- 减少村民之间的射线追踪计算
- 对于大型村民交易所效果显著

**breed-optimization**：
- 异步处理村民繁殖逻辑
- 年龄节流：降低幼年村民的更新频率
- 减少村民繁殖时的 CPU 占用
:::

---

## VMP 优化套件 (vmp-optimizations)

```yaml
vmp-optimizations:
  chunk-loading:
    enabled: true
    max-concurrent-per-player: 5
  
  entity-tracking:
    enabled: true
    range-multiplier: 0.8
```

**区块加载优化 (chunk-loading)**：

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用区块加载优化 |
| `max-concurrent-per-player` | 整数 | `5` | 每玩家最大并发区块加载数 |

**实体追踪优化 (entity-tracking)**：

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用实体追踪优化 |
| `range-multiplier` | 浮点 | `0.8` | 追踪范围倍数（0.8 = 原版的 80%） |

::: info 功能说明
**VMP 优化套件**来源于 VMP（Very Many Players）模组。

**chunk-loading**：
- 限制每个玩家同时加载的区块数量
- 防止大量玩家同时传送导致的卡顿
- 推荐值：3-8

**entity-tracking**：
- 减少实体追踪范围以降低网络和 CPU 开销
- 0.8 意味着追踪范围是原版的 80%
- 推荐值：0.6-1.0
:::

---

## 掉落物优化 (item-entity-optimizations)

### 智能合并 (smart-merge)

```yaml
item-entity-optimizations:
  smart-merge:
    enabled: true
    cancel-vanilla-merge: true
    merge-interval: 5
    min-nearby-items: 3
    merge-range: 1.5
```

| 配置项 | 类型 | 默认值 | 推荐范围 | 说明 |
|--------|------|--------|----------|------|
| `enabled` | 布尔 | `true` | - | 是否启用智能合并 |
| `cancel-vanilla-merge` | 布尔 | `true` | - | 是否取消原版合并逻辑 |
| `merge-interval` | 整数 | `5` | 5-10 | 合并检查间隔（tick） |
| `min-nearby-items` | 整数 | `3` | 3-5 | 触发合并的最少附近物品数 |
| `merge-range` | 浮点 | `1.5` | 1.5-2.5 | 合并范围（方块） |

::: info 功能说明
**智能合并**智能合并附近的掉落物，减少实体数量。

**性能提升**：60-80%，降低 2-4ms MSPT。

**参数详解**：

1. **cancel-vanilla-merge**
   - 取消原版的合并逻辑，避免重复处理
   - 建议保持启用

2. **merge-interval**
   - 每 N tick 检查一次是否需要合并
   - 较小的值：合并更及时，但 CPU 占用更高
   - 较大的值：合并延迟增加，但更省 CPU

3. **min-nearby-items**
   - 只有当附近物品数量达到此值时才触发合并
   - 避免对少量物品进行不必要的合并检查

4. **merge-range**
   - 在此范围内的相同物品会被合并
   - 较大的范围：合并更积极，但可能影响物品分布
:::

### 年龄优化 (age-optimization)

```yaml
  age-optimization:
    enabled: true
    age-interval: 10
    player-detection-range: 8.0
```

| 配置项 | 类型 | 默认值 | 推荐范围 | 说明 |
|--------|------|--------|----------|------|
| `enabled` | 布尔 | `true` | - | 是否启用年龄优化 |
| `age-interval` | 整数 | `10` | 10-20 | 年龄更新间隔（tick） |
| `player-detection-range` | 浮点 | `8.0` | 8.0-16.0 | 玩家检测范围（方块） |

::: info 功能说明
**年龄优化**对静止的掉落物降低 tick 频率，大幅节省性能。

**性能提升**：80-90%，降低 3-5ms MSPT。

**参数详解**：

1. **age-interval**
   - 静止物品每 N tick 更新一次年龄
   - 原版每 tick 都更新，这是不必要的

2. **player-detection-range**
   - 在此范围内有玩家时，物品恢复正常更新频率
   - 确保玩家附近的物品行为正常
:::

### Inactive Tick 优化 (inactive-tick)

```yaml
  inactive-tick:
    enabled: true
    inactive-range: 32.0
    merge-interval: 100
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用 Inactive Tick 优化 |
| `inactive-range` | 浮点 | `32.0` | 不活跃范围（方块） |
| `merge-interval` | 整数 | `100` | 简化 tick 中的合并间隔 |

::: info 功能说明
**Inactive Tick 优化**对远离玩家的掉落物使用简化的 tick 逻辑。

**性能提升**：30-50%

**参数详解**：

1. **inactive-range**
   - 超过此距离的掉落物使用简化 tick
   - 简化 tick 只处理必要的逻辑（如年龄增长）

2. **merge-interval**
   - 简化 tick 中的合并检查间隔
   - 100 tick = 5 秒检查一次
:::

---

## 经验球优化 (experience-orb-optimizations)

```yaml
experience-orb-optimizations:
  inactive-tick:
    enabled: true
    inactive-range: 32.0
    merge-interval: 100
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用经验球优化 |
| `inactive-range` | 浮点 | `32.0` | 不活跃范围（方块） |
| `merge-interval` | 整数 | `100` | 合并间隔（tick） |

::: info 功能说明
与掉落物优化类似，对远离玩家的经验球使用简化 tick，节省性能。
:::

---

## 方块实体优化 (block-entity-optimizations)

### 零延迟工厂优化 (zero-delay-factory-optimization)

```yaml
block-entity-optimizations:
  zero-delay-factory-optimization:
    enabled: true
    entities-config-file: "entities.yml"
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用零延迟工厂优化 |
| `entities-config-file` | 字符串 | `"entities.yml"` | 实体配置文件路径 |

::: info 功能说明
**零延迟工厂优化**将方块实体的 tick 延迟降至 0，提升工厂效率。

**支持的方块实体**（在 entities.yml 中配置）：
- 漏斗、熔炉、高炉、烟熏炉
- 酿造台、信标
- 箱子、陷阱箱、木桶、潜影盒
- 末影箱、投掷器、发射器

**效果**：
- 漏斗传输速度提升
- 熔炉冶炼更流畅
- 整体工厂效率提升
:::

### 并行 Tick (parallel-tick)

```yaml
  parallel-tick:
    enabled: true
    min-block-entities: 50
    batch-size: 16
    protect-containers: true
    timeout-ms: 50
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用并行方块实体 Tick |
| `min-block-entities` | 整数 | `50` | 低于此数量时不启用并行 |
| `batch-size` | 整数 | `16` | 每批处理的方块实体数量 |
| `protect-containers` | 布尔 | `true` | 是否保护容器（主线程执行防物品丢失） |
| `timeout-ms` | 整数 | `50` | 超时时间（毫秒），超时后降级到同步 |

::: info 功能说明
**并行 Tick**使用多线程并行处理方块实体的 tick 更新。

**参数详解**：

1. **min-block-entities**
   - 当方块实体数量低于此值时，使用单线程处理
   - 避免小规模场景下多线程的额外开销

2. **batch-size**
   - 每个工作线程一次处理的方块实体数量
   - 推荐值：8-32

3. **protect-containers**
   - 启用后，容器类方块实体在主线程执行
   - 防止多线程操作导致的物品丢失
   - **强烈建议保持启用**

4. **timeout-ms**
   - 并行处理超时后自动降级到同步处理
   - 防止死锁或长时间阻塞

**注意**：Folia 环境下自动禁用此功能。
:::

### 漏斗优化 (hopper-optimization)

```yaml
  hopper-optimization:
    enabled: true
    cache-expire-time: 100
    container-cache: true
    skip-failed-transfers: true
    fast-empty-full-check: true
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用漏斗优化 |
| `cache-expire-time` | 整数 | `100` | 缓存过期时间（毫秒） |
| `container-cache` | 布尔 | `true` | 是否启用容器缓存 |
| `skip-failed-transfers` | 布尔 | `true` | 是否跳过失败的传输尝试 |
| `fast-empty-full-check` | 布尔 | `true` | 是否启用快速空满检测 |

::: info 功能说明
**漏斗优化**缓存容器查询结果，减少重复查询。

**参数详解**：

1. **cache-expire-time**
   - 容器查询结果的缓存时间
   - 100ms 内对同一容器的查询会使用缓存

2. **container-cache**
   - 缓存漏斗上方/下方的容器引用
   - 避免每次传输都重新查找容器

3. **skip-failed-transfers**
   - 如果上次传输失败，短时间内跳过重试
   - 减少对满容器的无效传输尝试

4. **fast-empty-full-check**
   - 使用优化的算法检测容器是否为空/满
   - 避免遍历所有槽位
:::

### 矿车优化 (minecart-optimization)

```yaml
  minecart-optimization:
    enabled: true
    tick-interval: 2
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用矿车优化 |
| `tick-interval` | 整数 | `2` | 矿车 tick 间隔 |

::: info 功能说明
**矿车优化**降低矿车的 tick 频率，节省性能。

**tick-interval 参数**：
- `1`：每 tick 更新（原版行为）
- `2`（默认）：每 2 tick 更新一次
- `3-4`：更低的更新频率，但矿车移动可能不够平滑
:::


---

## 配方优化 (recipe-optimization)

### 熔炉配方缓存 (furnace-recipe-cache)

```yaml
recipe-optimization:
  furnace-recipe-cache:
    enabled: true
    cache-size: 100
    apply-to-blast-furnace: true
    apply-to-smoker: true
    fix-burn-time-bug: true
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用熔炉配方缓存 |
| `cache-size` | 整数 | `100` | 每个熔炉的缓存配方数 |
| `apply-to-blast-furnace` | 布尔 | `true` | 是否应用于高炉 |
| `apply-to-smoker` | 布尔 | `true` | 是否应用于烟熏炉 |
| `fix-burn-time-bug` | 布尔 | `true` | 是否修复 >32767 燃烧时间的 bug |

::: info 功能说明
**熔炉配方缓存**（FastFurnace）缓存熔炉配方，避免重复查找。

**效果**：
- 对于自定义配方较多的服务器效果显著
- 减少配方查找的 CPU 开销

**fix-burn-time-bug**：
- 修复原版中燃烧时间超过 32767 tick 时的溢出 bug
- 某些模组可能添加超长燃烧时间的燃料
:::

### C2ME NBT 优化 (c2me-nbt-optimization)

```yaml
  c2me-nbt-optimization:
    enabled: true
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用 C2ME NBT 优化 |

::: info 功能说明
**C2ME NBT 优化**来源于 C2ME Fabric 模组。

**优化内容**：
- ListTag 使用 fastutil 高性能集合
- 减少 NBT 操作的内存分配
- Paper 已优化 CompoundTag，此优化主要针对 ListTag
:::

### 工作台缓存 (crafting-recipe-cache)

```yaml
  crafting-recipe-cache:
    enabled: false
    cache-size: 200
    optimize-batch-crafting: true
    reduce-network-traffic: true
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `false` | 是否启用工作台缓存（默认关闭） |
| `cache-size` | 整数 | `200` | 缓存大小 |
| `optimize-batch-crafting` | 布尔 | `true` | 是否优化批量合成 |
| `reduce-network-traffic` | 布尔 | `true` | 是否减少网络流量 |

::: warning 实验性功能
此功能**默认关闭**，可能与某些插件冲突。

**optimize-batch-crafting**：
- 优化 Shift+点击批量合成
- 将 O(i×s) 复杂度降低到 O(1)

**reduce-network-traffic**：
- 减少配方同步的网络流量
:::

---

## 杂项优化 (misc-optimizations)

```yaml
misc-optimizations:
  minecart-cauldron-destruction:
    enabled: true
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `minecart-cauldron-destruction.enabled` | 布尔 | `true` | 是否启用矿车炼药锅销毁 |

::: info 功能说明
支持漏斗矿车和箱子矿车被炼药锅销毁的机制。
:::

---

## 智能滞后补偿 (smart-lag-compensation)

```yaml
smart-lag-compensation:
  enabled: true
  tps-threshold: 18.0
  
  item-pickup-delay:
    enabled: true
  
  potion-effects:
    enabled: false
  
  time-acceleration:
    enabled: false
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用智能滞后补偿 |
| `tps-threshold` | 浮点 | `18.0` | TPS 阈值，低于此值时启用补偿 |

**子功能配置**：

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `item-pickup-delay.enabled` | 布尔 | `true` | 掉落物拾取延迟补偿 |
| `potion-effects.enabled` | 布尔 | `false` | 药水效果补偿（默认关闭） |
| `time-acceleration.enabled` | 布尔 | `false` | 时间加速（默认关闭） |

::: info 功能说明
**智能滞后补偿**在低 TPS 时自动补偿，保持游戏体验一致。

**item-pickup-delay**：
- 在低 TPS 时减少掉落物拾取延迟
- 保持玩家拾取物品的体验一致

**potion-effects**（默认关闭）：
- 在低 TPS 时额外 tick 药水效果
- ⚠️ 可能改变游戏平衡：药水效果消耗更快

**time-acceleration**（默认关闭）：
- 在低 TPS 时加速游戏时间流逝
- ⚠️ 可能影响依赖时间的机制
:::

---

## TNT 爆炸优化 (tnt-explosion-optimization)

```yaml
tnt-explosion-optimization:
  enabled: true
  
  vanilla-compatibility:
    enabled: true
    use-vanilla-power: true
    use-vanilla-fire-logic: true
    use-vanilla-damage-calculation: true
    use-full-raycast: false
    use-vanilla-block-destruction: true
    use-vanilla-drops: true
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用 TNT 爆炸优化 |

**原版兼容性配置 (vanilla-compatibility)**：

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用原版兼容模式 |
| `use-vanilla-power` | 布尔 | `true` | 使用原版爆炸威力 |
| `use-vanilla-fire-logic` | 布尔 | `true` | 使用原版火焰逻辑 |
| `use-vanilla-damage-calculation` | 布尔 | `true` | 使用原版伤害计算（⚠️ 重要） |
| `use-full-raycast` | 布尔 | `false` | 使用完整射线追踪（更精确但性能开销大） |
| `use-vanilla-block-destruction` | 布尔 | `true` | 使用原版方块破坏逻辑 |
| `use-vanilla-drops` | 布尔 | `true` | 使用原版掉落物逻辑 |

::: info 功能说明
**TNT 爆炸优化**使用多线程并行处理 TNT 爆炸计算，大幅提升性能。

**原版兼容性说明**：
- 启用所有原版兼容选项可确保 TNT 行为与原版一致
- 如果你的服务器有 TNT 大炮等机制，建议保持所有选项启用
:::

### 爆炸缓存 (cache)

```yaml
  cache:
    enabled: true
    cache-expiry-ticks: 600
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用爆炸缓存 |
| `cache-expiry-ticks` | 整数 | `600` | 缓存过期时间（tick，600 = 30 秒） |

### 爆炸密度缓存 (density-cache)

```yaml
  density-cache:
    enabled: true
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用爆炸密度缓存（使用空间索引加速实体查询） |

### 向量化 AABB 检测 (vectorized-aabb)

```yaml
  vectorized-aabb:
    enabled: true
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用 SIMD 向量化加速实体碰撞检测 |

### 统一爆炸引擎 (unified-engine)

```yaml
  unified-engine:
    enabled: true
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用统一爆炸引擎（推荐，4x 吞吐量） |

### TNT 实体合并 (entity-merge)

```yaml
  entity-merge:
    enabled: false
    radius: 1.5
    max-fuse-difference: 5
    power-multiplier: 0.5
    max-power: 12.0
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `false` | 是否启用 TNT 实体合并（默认关闭） |
| `radius` | 浮点 | `1.5` | 合并半径（方块） |
| `max-fuse-difference` | 整数 | `5` | 最大引信时间差（tick） |
| `power-multiplier` | 浮点 | `0.5` | 威力增益系数 |
| `max-power` | 浮点 | `12.0` | 最大爆炸威力 |

::: warning 注意
TNT 实体合并**默认关闭**，适用于大炮服务器。启用后会改变 TNT 的爆炸行为。
:::


---

## 下落方块优化 (falling-block-optimization)

```yaml
falling-block-optimization:
  enabled: true
  min-falling-blocks: 20
  batch-size: 10
```

| 配置项 | 类型 | 默认值 | 推荐范围 | 说明 |
|--------|------|--------|----------|------|
| `enabled` | 布尔 | `true` | - | 是否启用下落方块优化 |
| `min-falling-blocks` | 整数 | `20` | 20-50 | 最少下落方块数（低于此值不并行） |
| `batch-size` | 整数 | `10` | 10-20 | 批量大小 |

::: info 功能说明
**下落方块优化**使用多线程并行处理下落方块，适用于重力方块和大规模下落场景。
:::

---

## 区块系统优化 (chunk-system)

```yaml
chunk-system:
  enabled: true
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用区块系统优化（主开关） |

### 区块生成优化 (generation)

```yaml
  generation:
    noise-optimization:
      enabled: true
    jigsaw-optimization:
      enabled: true
    chunk-pos-optimization:
      enabled: true
    perlin-noise-optimization:
      enabled: true
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `noise-optimization.enabled` | 布尔 | `true` | 噪声采样优化，提升地形生成速度 |
| `jigsaw-optimization.enabled` | 布尔 | `true` | Jigsaw 结构生成优化，提升村庄等结构生成速度 |
| `chunk-pos-optimization.enabled` | 布尔 | `true` | ChunkPos equals 优化，避免不必要的对象创建（来源：C2ME） |
| `perlin-noise-optimization.enabled` | 布尔 | `true` | Perlin 噪声优化，优化噪声采样算法（来源：C2ME） |

### 区块加载优化 (loading)

```yaml
  loading:
    async-loading:
      enabled: true
      cache-size: 256
    mid-tick-tasks:
      enabled: true
      interval-ns: 1000000
    async-blending:
      enabled: true
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `async-loading.enabled` | 布尔 | `true` | 异步区块加载，减少主线程阻塞 |
| `async-loading.cache-size` | 整数 | `256` | 读取缓存大小 |
| `mid-tick-tasks.enabled` | 布尔 | `true` | Mid-Tick 区块任务，在 tick 中间执行区块任务减少延迟 |
| `mid-tick-tasks.interval-ns` | 整数 | `1000000` | 执行间隔（纳秒，1000000 = 1ms） |
| `async-blending.enabled` | 布尔 | `true` | 异步 Blending 状态计算，减少世界升级卡顿 |

### 区块保存优化 (saving)

```yaml
  saving:
    async-serialization:
      enabled: true
    unload-queue-optimization:
      enabled: true
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `async-serialization.enabled` | 布尔 | `true` | 异步区块序列化，将序列化移到后台线程 |
| `unload-queue-optimization.enabled` | 布尔 | `true` | 区块卸载队列优化，避免 O(n) 的 size() 调用 |

### 磁盘 IO 优化 (io)

```yaml
  io:
    async-disk-write:
      enabled: true
    storage-io-worker:
      enabled: true
    nbt-cache-limit:
      enabled: true
      max-size: 256
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `async-disk-write.enabled` | 布尔 | `true` | 异步磁盘写入，禁用 dsync 提升 IO 性能 |
| `storage-io-worker.enabled` | 布尔 | `true` | 存储 IO 工作线程优化 |
| `nbt-cache-limit.enabled` | 布尔 | `true` | NBT 缓存限制，防止内存泄漏 |
| `nbt-cache-limit.max-size` | 整数 | `256` | 最大缓存条目数 |

::: tip 提示
使用 `-Dakiasync.chunk.forceDsync=true` JVM 参数可强制启用同步写入。
:::

### 方块 Tick 优化 (block-tick)

```yaml
  block-tick:
    async:
      enabled: false
      timeout-us: 200
      batch-size: 16
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `async.enabled` | 布尔 | `false` | 是否启用方块 Tick 异步化（默认关闭） |
| `async.timeout-us` | 整数 | `200` | 超时时间（微秒） |
| `async.batch-size` | 整数 | `16` | 批量大小 |

::: warning 注意
方块 Tick 异步化**默认关闭**，Folia 环境下自动禁用。
:::

---

## 结构查找异步化 (structure-location-async)

```yaml
structure-location-async:
  enabled: true
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用结构查找异步化 |

### /locate 命令优化 (locate-command)

```yaml
  locate-command:
    enabled: true
    search-radius: 100
    skip-known-structures: false
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否异步处理 /locate 命令 |
| `search-radius` | 整数 | `100` | 搜索半径（区块） |
| `skip-known-structures` | 布尔 | `false` | 是否跳过已知结构（加速搜索） |

### 村民交易地图优化 (villager-trade-maps)

```yaml
  villager-trade-maps:
    enabled: true
    search-radius: 100
    skip-known-structures: false
    trade-types:
      - "minecraft:ocean_monument_map"
      - "minecraft:woodland_mansion_map"
      - "minecraft:buried_treasure_map"
    generation-timeout-seconds: 30
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否异步生成村民交易地图 |
| `search-radius` | 整数 | `100` | 搜索半径（区块） |
| `skip-known-structures` | 布尔 | `false` | 是否跳过已知结构 |
| `trade-types` | 列表 | 见上 | 支持的地图类型 |
| `generation-timeout-seconds` | 整数 | `30` | 生成超时时间（秒） |

### 海豚寻宝优化 (dolphin-treasure-hunt)

```yaml
  dolphin-treasure-hunt:
    enabled: true
    search-radius: 50
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否异步处理海豚寻宝 |
| `search-radius` | 整数 | `50` | 搜索半径（方块） |

### 箱子探险地图生成 (chest-exploration-maps)

```yaml
  chest-exploration-maps:
    enabled: true
    loot-tables:
      - "minecraft:chests/shipwreck_map"
      - "minecraft:chests/underwater_ruin_big"
      - "minecraft:chests/underwater_ruin_small"
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否异步生成箱子中的探险地图 |
| `loot-tables` | 列表 | 见上 | 包含地图的战利品表 |

### 算法优化 (algorithm-optimization)

```yaml
  algorithm-optimization:
    enabled: true
    search-pattern: "hybrid"
    caching:
      enabled: true
      max-size: 1000
      expiration-minutes: 30
    biome-aware-search:
      enabled: true
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用算法优化 |
| `search-pattern` | 字符串 | `"hybrid"` | 搜索模式：spiral（螺旋）、layered（分层）、hybrid（混合） |
| `caching.enabled` | 布尔 | `true` | 是否启用结构缓存 |
| `caching.max-size` | 整数 | `1000` | 最大缓存条目数 |
| `caching.expiration-minutes` | 整数 | `30` | 缓存过期时间（分钟） |
| `biome-aware-search.enabled` | 布尔 | `true` | 是否启用基于生物群系的智能搜索 |


---

## 光照优化 (lighting-optimizations)

```yaml
lighting-optimizations:
  enabled: true
  update-interval-ms: 10
  
  light-batching:
    enabled: true
```

| 配置项 | 类型 | 默认值 | 推荐范围 | 说明 |
|--------|------|--------|----------|------|
| `enabled` | 布尔 | `true` | - | 是否启用光照优化 |
| `update-interval-ms` | 整数 | `10` | 5-20 | 光照更新间隔（毫秒） |
| `light-batching.enabled` | 布尔 | `true` | - | 是否启用光照更新批处理 |

::: info 功能说明
**光照优化**参考 ScalableLux，使用时间窗口控制更新频率。

**update-interval-ms 参数**：
- `5`：更新更快，但 CPU 占用更高
- `10`（默认）：平衡性能和响应速度
- `20`：更省 CPU，但光照更新可能有延迟
:::

---

## Bug 修复与特殊功能

### 出生区块移除 (spawn-chunk-removal)

```yaml
spawn-chunk-removal:
  enabled: true
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否移除出生区块以加速世界加载 |

::: warning 版本限制
仅对 **1.21.8** 有效。1.21.10+ 版本已默认移除出生区块。
:::

### 蜜蜂修复 (bee-fix)

```yaml
bee-fix:
  enabled: true
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用蜜蜂修复 |

::: info 修复的 Bug
修复 7 个 MC bug：MC-168329、MC-190042、MC-206401、MC-229321、MC-234364、MC-248332、MC-255743
:::

### 潜影贝子弹自伤修复 (shulker-bullet-self-hit-fix)

```yaml
shulker-bullet-self-hit-fix:
  enabled: true
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 防止潜影贝子弹击中发射它的潜影贝自己 |

### End 维度地形修复 (end-island-density-fix)

```yaml
end-island-density-fix:
  enabled: true
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 修复 End 维度地形环形缺失（MC-159283） |

### 首领僵尸血量修复 (leader-zombie-health-fix)

```yaml
leader-zombie-health-fix:
  enabled: true
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 修复首领僵尸生成时血量错误的问题（MC-219981） |

### 传送门窒息检查 (portal-suffocation-check)

```yaml
portal-suffocation-check:
  disabled: false
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `disabled` | 布尔 | `false` | `false` = 保持原版行为；`true` = 禁用检查提升性能 |

::: info 功能说明
Mojang 在 1.19.3 添加了实体传送后的窒息检查算法。禁用此检查可大幅提升传送门性能，但极少数情况下大型生物可能卡在方块内。
:::

### 末影人方块搬运限制 (enderman-block-carry-limiter)

```yaml
enderman-block-carry-limiter:
  enabled: true
  max-carrying-endermen: 50
  count-towards-mob-cap: true
  prevent-pickup-when-limit-reached: true
```

| 配置项 | 类型 | 默认值 | 推荐范围 | 说明 |
|--------|------|--------|----------|------|
| `enabled` | 布尔 | `true` | - | 是否启用末影人方块搬运限制 |
| `max-carrying-endermen` | 整数 | `50` | 30-100 | 最大手持方块末影人数量 |
| `count-towards-mob-cap` | 布尔 | `true` | - | 是否强制计入刷怪上限（修复原版 bug） |
| `prevent-pickup-when-limit-reached` | 布尔 | `true` | - | 达到限制时是否阻止拾取 |

::: info 功能说明
修复 Mojang 的 bug：手持方块的末影人不占刷怪上限导致无限堆积。

**注意**：如果启用了 `entity-throttling`，建议将此功能设为 `false`。
:::

---

## 数据包优化 (datapack-optimization)

```yaml
datapack-optimization:
  enabled: true
  batch-size: 100
  cache-expiration-minutes: 30
  max-file-cache-size: 1000
  max-filesystem-cache-size: 50
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用数据包优化 |
| `batch-size` | 整数 | `100` | 批量大小 |
| `cache-expiration-minutes` | 整数 | `30` | 缓存过期时间（分钟） |
| `max-file-cache-size` | 整数 | `1000` | 文件缓存上限（防止内存泄漏） |
| `max-filesystem-cache-size` | 整数 | `50` | 文件系统缓存上限 |

### Execute 命令跳过不活跃实体 (execute-inactive-skip)

```yaml
  execute-inactive-skip:
    enabled: false
    skip-level: 2
    simulation-distance-multiplier: 1.0
    cache-duration-ms: 1000
    whitelist-types:
      - "minecraft:player"
      - "minecraft:armor_stand"
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `false` | 是否启用（默认关闭） |
| `skip-level` | 整数 | `2` | 跳过级别：0=禁用，1=未加载区块，2=模拟距离外，3=所有不活跃 |
| `simulation-distance-multiplier` | 浮点 | `1.0` | 模拟距离倍数 |
| `cache-duration-ms` | 整数 | `1000` | 缓存持续时间（毫秒） |
| `whitelist-types` | 列表 | 见上 | 白名单实体类型（永不跳过） |

### 函数命令去重 (command-deduplication)

```yaml
  command-deduplication:
    enabled: true
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否去重数据包函数中的重复命令对象，减少内存使用 |

---

## 数学优化 (math-optimization)

```yaml
math-optimization:
  enabled: true
  compact-sine-lut: true
  
  c2me-optimizations:
    bitset-pooling:
      enabled: true
    completable-future-optimization:
      enabled: true
    blockpos-cache: true
    optimized-collections: true
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用数学优化 |
| `compact-sine-lut` | 布尔 | `true` | 紧凑型正弦查找表（节省 75% 内存） |

**C2ME 优化**：

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `bitset-pooling.enabled` | 布尔 | `true` | BitSet 对象池（ThreadLocal 缓存） |
| `completable-future-optimization.enabled` | 布尔 | `true` | CompletableFuture 优化（优化异步任务组合） |
| `blockpos-cache` | 布尔 | `true` | BlockPos 缓存（预计算减少开销） |
| `optimized-collections` | 布尔 | `true` | 优化集合类（高性能集合） |

---

## 种子加密 (seed-encryption)

```yaml
seed-encryption:
  enabled: false
  scheme: "quantum"
  
  protect-structures: true
  protect-ores: true
  protect-slimes: true
  
  legacy:
    seed-bits: 1024
  
  quantum:
    encryption-level: 2
    private-key-file: "quantum-seed.key"
    enable-time-decay: false
    cache-size: 10000
  
  restrict-seed-command: true
  seed-command-deny-message: "&c你没有权限使用此命令。"
  
  anti-plugin-theft:
    enabled: true
    return-fake-seed: true
    fake-seed-value: 0
    log-suspicious-access: true
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `false` | 是否启用种子加密（默认关闭） |
| `scheme` | 字符串 | `"quantum"` | 加密方案：legacy（传统）、quantum（量子推荐） |
| `protect-structures` | 布尔 | `true` | 保护结构（村庄/要塞/遗迹） |
| `protect-ores` | 布尔 | `true` | 保护矿石（钻石/金矿等） |
| `protect-slimes` | 布尔 | `true` | 保护史莱姆区块 |

**Legacy 方案配置**：

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `seed-bits` | 整数 | `1024` | 种子位数（1024/2048/4096，推荐 1024 平衡性能） |

**Quantum 方案配置**：

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `encryption-level` | 整数 | `2` | 加密强度：1=基础，2=标准推荐，3=最强 |
| `private-key-file` | 字符串 | `"quantum-seed.key"` | 服务器私钥文件（⚠️ 自动生成，请备份！） |
| `enable-time-decay` | 布尔 | `false` | 时间衰减（防时间攻击，可能影响重生成） |
| `cache-size` | 整数 | `10000` | 缓存大小（推荐 5000-20000） |

**命令权限控制**：

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `restrict-seed-command` | 布尔 | `true` | 限制 /seed 命令仅 OP 可用 |
| `seed-command-deny-message` | 字符串 | 见上 | 拒绝消息 |

**防插件窃取种子**：

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `anti-plugin-theft.enabled` | 布尔 | `true` | 是否启用防插件窃取 |
| `return-fake-seed` | 布尔 | `true` | 给可疑调用者返回假种子 |
| `fake-seed-value` | 整数 | `0` | 假种子值（0 = 随机） |
| `log-suspicious-access` | 布尔 | `true` | 记录可疑访问 |

::: danger 重要警告
**启用后不可关闭！** 关闭会导致：
- 区块错乱
- 结构消失
- 矿石改变
- 史莱姆区块变化

如需关闭必须删除世界。
:::


---

## 网络优化 (network-optimization)

### 区块可见性过滤 (chunk-visibility-filter)

```yaml
network-optimization:
  chunk-visibility-filter:
    enabled: true
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 遮挡剔除：只发送玩家视野内的表层区块 |

### 高速移动区块预加载 (fast-movement-chunk-load)

```yaml
  fast-movement-chunk-load:
    enabled: true
    speed-threshold: 0.5
    preload-distance: 8
    max-concurrent-loads: 4
    prediction-ticks: 40
    
    center-offset:
      enabled: true
      min-speed: 3.0
      max-speed: 9.0
      max-offset-ratio: 0.75
    
    async-loading:
      batch-size: 2
      batch-delay-ms: 20
    
    player-join-warmup:
      enabled: true
      warmup-duration-ms: 3000
      initial-rate: 0.5
    
    map-rendering:
      enabled: false
```

**基础配置**：

| 配置项 | 类型 | 默认值 | 推荐范围 | 说明 |
|--------|------|--------|----------|------|
| `enabled` | 布尔 | `true` | - | 是否启用高速移动区块预加载 |
| `speed-threshold` | 浮点 | `0.5` | 0.3-0.8 | 触发速度（b/t） |
| `preload-distance` | 整数 | `8` | 6-10 | 预加载距离 |
| `max-concurrent-loads` | 整数 | `4` | 2-6 | 最大并发加载 |
| `prediction-ticks` | 整数 | `40` | 30-50 | 预测 tick 数 |

**智能偏移加载中心 (center-offset)**：

| 配置项 | 类型 | 默认值 | 推荐范围 | 说明 |
|--------|------|--------|----------|------|
| `enabled` | 布尔 | `true` | - | 是否启用智能偏移 |
| `min-speed` | 浮点 | `3.0` | 2.0-4.0 | 最小触发速度（b/t） |
| `max-speed` | 浮点 | `9.0` | 7.0-12.0 | 最大触发速度（⚠️ 过高可能卸载玩家） |
| `max-offset-ratio` | 浮点 | `0.75` | 0.5-0.9 | 最大偏移比例 |

**异步加载批量控制 (async-loading)**：

| 配置项 | 类型 | 默认值 | 推荐范围 | 说明 |
|--------|------|--------|----------|------|
| `batch-size` | 整数 | `2` | 2-4 | 每批区块数 |
| `batch-delay-ms` | 整数 | `20` | 10-20 | 批次延迟（毫秒） |

**玩家加入热身期 (player-join-warmup)**：

| 配置项 | 类型 | 默认值 | 推荐范围 | 说明 |
|--------|------|--------|----------|------|
| `enabled` | 布尔 | `true` | - | 是否启用热身期 |
| `warmup-duration-ms` | 整数 | `3000` | 2000-5000 | 热身期时长（毫秒） |
| `initial-rate` | 浮点 | `0.5` | 0.3-0.7 | 初始加载速率（0.0-1.0） |

**地图渲染 (map-rendering)**：

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `false` | 高速移动时优化地图渲染（⚠️ 实验性功能） |

::: info 功能说明
**高速移动区块预加载**在鞘翅/疾跑/创造飞行时预加载区块，避免卡顿。

**智能偏移加载中心**根据速度方向偏移加载中心，实现类远视距效果。
:::

### 高级网络优化 (advanced)

```yaml
  advanced:
    enabled: true
    
    fast-varint:
      enabled: true
    
    eventloop-affinity:
      enabled: true
      strict-checking: false
    
    bytebuf-optimizer:
      enabled: true
      pooled-allocator: true
      prefer-direct: true
    
    skip-zero-movement-packets:
      enabled: true
      strict-mode: false
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用高级网络优化 |
| `fast-varint.enabled` | 布尔 | `true` | 快速 VarInt 编码（1 字节路径提升 50%，2 字节路径提升 30%） |
| `eventloop-affinity.enabled` | 布尔 | `true` | EventLoop 亲和性检查（减少跨线程调度开销 10-20%） |
| `eventloop-affinity.strict-checking` | 布尔 | `false` | 严格检查模式（启用后会记录违规警告） |
| `bytebuf-optimizer.enabled` | 布尔 | `true` | ByteBuf 优化器（减少 GC 压力 40-60%） |
| `bytebuf-optimizer.pooled-allocator` | 布尔 | `true` | 使用池化分配器 |
| `bytebuf-optimizer.prefer-direct` | 布尔 | `true` | 优先使用直接内存 |
| `skip-zero-movement-packets.enabled` | 布尔 | `true` | 零移动包过滤（减少 10-15% 实体包） |
| `skip-zero-movement-packets.strict-mode` | 布尔 | `false` | 严格模式（true=位置和旋转都为零才过滤） |

### AFK 玩家网络包节流 (afk-packet-throttle)

```yaml
  afk-packet-throttle:
    enabled: true
    afk-duration-ms: 120000
    particle-max-distance: 0.0
    sound-max-distance: 64.0
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用 AFK 玩家包节流 |
| `afk-duration-ms` | 整数 | `120000` | AFK 判定时间（毫秒，120000 = 2 分钟） |
| `particle-max-distance` | 浮点 | `0.0` | 粒子最大距离（0 = 完全过滤） |
| `sound-max-distance` | 浮点 | `64.0` | 声音最大距离 |

::: info 功能说明
参考 ESU 的 AfkEfficiency 功能，对 AFK 玩家限制粒子、声音等非关键包的发送。

**性能提升**：减少 20-40% 网络流量（针对 AFK 玩家）。
:::

### 动态区块发送速率 (dynamic-chunk-send-rate)

```yaml
  dynamic-chunk-send-rate:
    enabled: true
    limit-upload-bandwidth: 10240
    guaranteed-bandwidth: 512
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用动态区块发送速率 |
| `limit-upload-bandwidth` | 整数 | `10240` | 限制上传带宽（KB/s） |
| `guaranteed-bandwidth` | 整数 | `512` | 每玩家保证带宽（KB/s） |

### 包压缩优化 (packet-compression)

```yaml
  packet-compression:
    enabled: true
    adaptive-threshold: true
    skip-small-packets: true
    skip-threshold: 32
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用包压缩优化 |
| `adaptive-threshold` | 布尔 | `true` | 自适应压缩阈值 |
| `skip-small-packets` | 布尔 | `true` | 跳过小包压缩 |
| `skip-threshold` | 整数 | `32` | 跳过阈值（字节） |

### 区块批量优化 (chunk-batch)

```yaml
  chunk-batch:
    enabled: true
    min-chunks: 2.0
    max-chunks: 32.0
    max-unacked-batches: 8
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用区块批量优化 |
| `min-chunks` | 浮点 | `2.0` | 每 tick 最小区块数 |
| `max-chunks` | 浮点 | `32.0` | 每 tick 最大区块数 |
| `max-unacked-batches` | 整数 | `8` | 最大未确认批次 |

### 包优先级队列 (packet-priority)

```yaml
  packet-priority:
    enabled: true
    prioritize-player-packets: true
    prioritize-chunk-packets: true
    deprioritize-particles: true
    deprioritize-sounds: true
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | 布尔 | `true` | 是否启用包优先级队列 |
| `prioritize-player-packets` | 布尔 | `true` | 优先玩家包 |
| `prioritize-chunk-packets` | 布尔 | `true` | 优先区块包 |
| `deprioritize-particles` | 布尔 | `true` | 降低粒子优先级 |
| `deprioritize-sounds` | 布尔 | `true` | 降低声音优先级 |

---

## 高级优化 (advanced-optimizations)

```yaml
advanced-optimizations:
  virtual-threads: true
  work-stealing: true
  multi-netty-event-loop: true
  paletted-container-lock-removal: true
  type-filterable-list: true
  entity-tracker-linked-hashmap: true
  spawn-density-array: true
  biome-access-optimization: true
  entity-move-zero-velocity: true
  entity-tracker-distance-cache: true
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `virtual-threads` | 布尔 | `true` | Java 21 虚拟线程（旧版自动降级） |
| `work-stealing` | 布尔 | `true` | 工作窃取调度 |
| `multi-netty-event-loop` | 布尔 | `true` | 分离 Login/Play 网络 IO，减少竞争 |
| `paletted-container-lock-removal` | 布尔 | `true` | 移除 PalettedContainer 锁（Paper/Folia 已在更高层级同步） |
| `type-filterable-list` | 布尔 | `true` | 实体类型过滤（+20-40%） |
| `entity-tracker-linked-hashmap` | 布尔 | `true` | 实体追踪器优化 |
| `spawn-density-array` | 布尔 | `true` | 生成密度检查（+3-5x） |
| `biome-access-optimization` | 布尔 | `true` | 内联生物群系采样（-10-20% 开销） |
| `entity-move-zero-velocity` | 布尔 | `true` | 跳过零速度移动计算 |
| `entity-tracker-distance-cache` | 布尔 | `true` | 缓存实体追踪距离 |

::: info 功能说明
这些优化来自多个高性能模组：VMP、Nitori、Lithium。
:::

---

## 性能监控与调试 (performance)

```yaml
performance:
  debug-logging:
    enabled: false
    modules:
      tnt: false
      collision: false
      lighting: false
      pathfinding: false
      entity: false
      chunk: false
      hopper: false
      math: false
      shapes: false
      datapack: false
      execute-command: false
      command-deduplication: false
      smart-lag-compensation: false
      log-missed-ticks: false
      log-compensation: false
  
  enable-metrics: true
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `debug-logging.enabled` | 布尔 | `false` | 是否启用调试日志（仅用于调试，生产环境建议关闭） |
| `enable-metrics` | 布尔 | `true` | 是否启用性能指标收集 |

**调试模块**：

| 模块 | 说明 |
|------|------|
| `tnt` | TNT 爆炸调试 |
| `collision` | 碰撞检测调试 |
| `lighting` | 光照计算调试 |
| `pathfinding` | 寻路调试 |
| `entity` | 实体系统调试 |
| `chunk` | 区块系统调试 |
| `hopper` | 漏斗系统调试 |
| `math` | 数学优化调试 |
| `shapes` | 形状优化调试 |
| `datapack` | 数据包优化调试 |
| `execute-command` | Execute 命令优化调试 |
| `command-deduplication` | 命令去重调试 |
| `smart-lag-compensation` | 智能滞后补偿调试 |
| `log-missed-ticks` | 记录丢失的 tick |
| `log-compensation` | 记录补偿操作 |

---

## 指令配置 (commands)

```yaml
commands:
  reload:
    require-confirmation: true
    confirmation-timeout: 30
```

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `require-confirmation` | 布尔 | `true` | 是否需要二次确认（首次警告需再次执行） |
| `confirmation-timeout` | 整数 | `30` | 确认超时时间（秒） |

---
