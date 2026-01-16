---
title: config.yml Configuration
icon: file-code
order: 1
category:
  - Plugin Documentation
tag:
  - AkiAsync
  - Configuration
---

# config.yml Configuration

Main configuration file containing all core feature switches and parameters for AkiAsync.

## Basic Configuration

```yaml
# Configuration version, do not modify
version: 20
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `version` | Integer | `20` | Configuration file version for internal version management, **do not modify manually** |

---

## General Thread Pool

```yaml
general-thread-pool:
  size: 0
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `size` | Integer | `0` | Thread pool size. `0` = auto-allocate (CPU cores ÷ 4, minimum 2); `>0` = manual specification |

::: tip Tuning Advice
- **Recommended to keep default `0`**, letting the plugin auto-allocate based on hardware
- For servers with fewer CPU cores (2-4), manually set to `2`
- For servers with many CPU cores (16+), can increase to `4-6`
- **More threads ≠ better performance**, too many threads increase context switching overhead
:::

---

## Entity System Optimization

### Multi-threaded Entity Tracker (entity-tracker)

```yaml
entity-tracker:
  enabled: true
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable multi-threaded entity tracker |

::: info Feature Description
**Multi-threaded Entity Tracker** distributes entity tracking calculations across multiple threads for parallel processing.

**Performance Improvement**: Can reduce MSPT by 10-30%, especially effective in entity-dense areas.
:::

---

### Async Mob Spawning (mob-spawning)

```yaml
mob-spawning:
  enabled: true
  spawner-optimization: true
  spawn-interval: 1
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable async mob spawning |
| `spawner-optimization` | Boolean | `true` | Optimize spawner performance, reduce spawner calculation overhead |
| `spawn-interval` | Integer | `1` | Spawn frequency. `1` = check every tick; `2` = every 2 ticks |

::: info Feature Description
**Async Mob Spawning** moves natural spawn logic calculations to async threads, avoiding main thread blocking.

**spawn-interval Parameter**:
- `1` (default): Check mob spawning every tick, fastest spawn rate but higher CPU usage
- `2`: Check every 2 ticks, ~50% slower spawn rate but noticeably lower CPU usage
- `3-5`: Suitable for servers with lower spawn rate requirements, significantly reduces CPU usage
:::

---

### Entity Density Control (density)

```yaml
density:
  enabled: true
  max-per-chunk: 80
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable entity density control |
| `max-per-chunk` | Integer | `80` | Maximum entities allowed per chunk |

::: info Feature Description
**Entity Density Control** limits entity count per chunk, preventing lag from too many entities.

**max-per-chunk Parameter**:
- `80` (default): Suitable for most servers, balances performance and gameplay
- `50-60`: For lower-performance servers, stricter limits
- `100-150`: For high-performance servers, allows more entities
:::

---

### AI Throttling (brain)

```yaml
brain:
  enabled: true
  throttle-interval: 10
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable AI throttling |
| `throttle-interval` | Integer | `10` | AI update interval for stationary entities (ticks) |

::: info Feature Description
**AI Throttling** reduces AI update frequency for stationary entities, saving CPU resources.

**throttle-interval Parameter**:
- `10` (default): Stationary entities update AI every 10 ticks (0.5 seconds)
- `5`: More frequent updates, more responsive AI but higher CPU usage
- `20`: Lower update frequency, saves CPU but AI may be slightly less responsive
:::

---

### Suffocation Optimization (suffocation-optimization)

```yaml
suffocation-optimization:
  enabled: true
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable suffocation detection optimization |

::: info Feature Description
**Suffocation Optimization** only performs suffocation detection when entities can take damage, reducing unnecessary calculations.

**Performance Improvement**: Reduces ~5-10% of entity tick calculations.
:::

---

### Projectile Optimization (projectile)

```yaml
projectile:
  enabled: true
  max-loads-per-tick: 10
  max-loads-per-projectile: 10
```

| Option | Type | Default | Recommended | Description |
|--------|------|---------|-------------|-------------|
| `enabled` | Boolean | `true` | - | Enable projectile optimization |
| `max-loads-per-tick` | Integer | `10` | 8-15 | Max chunks loaded per tick by all projectiles |
| `max-loads-per-projectile` | Integer | `10` | 8-15 | Max chunks a single projectile can load in its lifetime |

::: info Feature Description
**Projectile Optimization** limits chunk loading ability of projectiles (arrows, tridents, ender pearls, etc.), preventing projectile-caused lag.
:::

---

### Virtual Entity Compatibility (virtual-entity-compatibility)

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

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable virtual entity compatibility |
| `bypass-packet-queue` | Boolean | `true` | Virtual entity packets bypass queue for direct sending |
| `exclude-from-throttling` | Boolean | `true` | Exclude virtual entities from all throttling optimizations |

::: warning Important
**When disabled**, virtual entity plugins (FancyNpcs, ZNPCsPlus, Citizens, etc.) may not display NPCs correctly.

If you use NPC plugins but NPCs don't show, ensure this feature is enabled.
:::

---

## Collision Optimization (collision-optimization)

```yaml
collision-optimization:
  enabled: true
  exclusion-list-file: "entities.yml"
  aggressive-mode: true
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable entity collision optimization |
| `exclusion-list-file` | String | `"entities.yml"` | Exclusion list config file path |
| `aggressive-mode` | Boolean | `true` | Enable aggressive mode, skip more checks |

::: info Feature Description
**Entity Collision Optimization** provides high-performance collision detection for dense entity environments.

**Performance Improvement**: 40-60%, especially significant in entity-dense areas.
:::

### Native Collision Detection (native)

```yaml
  native:
    enabled: true
    fallback-enabled: true
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable native collision detection |
| `fallback-enabled` | Boolean | `true` | Fallback to normal logic when unsupported |

::: info Technical Requirements
- JDK 17 or higher
- Requires JVM parameter: `--add-modules jdk.incubator.vector`

**Performance Improvement**: 2-3x collision detection speed on supported hardware.
:::

### Block Cache (block-cache)

```yaml
  block-cache:
    enabled: true
    cache-size: 512
    expire-ticks: 600
```

| Option | Type | Default | Recommended | Description |
|--------|------|---------|-------------|-------------|
| `enabled` | Boolean | `true` | - | Enable block cache |
| `cache-size` | Integer | `512` | 256-1024 | Cache size (entries) |
| `expire-ticks` | Integer | `600` | 400-1200 | Cache expiry time (ticks, 600 = 30 seconds) |

---

### Nitori/Lithium Entity Optimizations (nitori-entity-optimizations)

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

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `mob-sunburn-optimization.enabled` | Boolean | `true` | Mob sunburn optimization: cache BlockPos, early brightness check |
| `entity-speed-optimization.enabled` | Boolean | `true` | Entity speed optimization: cache block speed factors |
| `entity-fall-damage-optimization.enabled` | Boolean | `true` | Entity fall damage optimization: skip simple entity fall damage calculations |
| `entity-section-storage-optimization.enabled` | Boolean | `true` | Entity section storage optimization: direct hash lookup for small areas |

::: info Feature Description
These optimizations are ported from **Nitori** and **Lithium** Fabric mods.
:::

### Ray Collision Detection (ray-collision)

```yaml
  ray-collision:
    enabled: true
    max-distance: 64.0
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable ray collision detection optimization |
| `max-distance` | Float | `64.0` | Maximum detection distance (blocks) |

::: info Feature Description
**Ray Collision Detection** uses DDA (Digital Differential Analyzer) algorithm to optimize ray tracing.

**Performance Improvement**: 50-70%
:::

### Shape Optimization (shape-optimization)

```yaml
  shape-optimization:
    enabled: true
    precompute-arrays: true
    block-shape-cache: true
    cache-size: 512
```

| Option | Type | Default | Recommended | Description |
|--------|------|---------|-------------|-------------|
| `enabled` | Boolean | `true` | - | Enable shape optimization |
| `precompute-arrays` | Boolean | `true` | - | Precompute shape arrays |
| `block-shape-cache` | Boolean | `true` | - | Enable block shape cache |
| `cache-size` | Integer | `512` | 512-2048 | Cache size |

---

## Living Entity Travel Optimization (living-entity-travel-optimization)

```yaml
living-entity-travel-optimization:
  enabled: true
  skip-interval: 2
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable entity movement optimization |
| `skip-interval` | Integer | `2` | Process movement calculation every N ticks |

---

## Mob Despawn Optimization (mob-despawn-optimization)

```yaml
mob-despawn-optimization:
  enabled: true
  check-interval: 20
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable mob despawn check optimization |
| `check-interval` | Integer | `20` | Despawn check interval (ticks, 20 = 1 second) |

---

## Parallel Entity Tick (entity-tick-parallel)

```yaml
entity-tick-parallel:
  enabled: true
  min-entities: 50
  batch-size: 8
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable parallel entity tick |
| `min-entities` | Integer | `50` | Don't enable parallel processing below this entity count |
| `batch-size` | Integer | `8` | Entities processed per batch |

::: info Feature Description
**Parallel Entity Tick** uses multi-threading to process entity tick updates in parallel, fully utilizing multi-core CPUs.

**Performance Improvement**: 30-50% entity processing performance in entity-dense areas.
:::

---

## Entity Throttling (entity-throttling)

```yaml
entity-throttling:
  enabled: false
  config-file: "throttling.yml"
  check-interval: 100
  throttle-interval: 3
  removal-batch-size: 10
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `false` | Enable entity throttling (disabled by default) |
| `config-file` | String | `"throttling.yml"` | Throttling config file path |
| `check-interval` | Integer | `100` | Check interval (ticks) |
| `throttle-interval` | Integer | `3` | Throttle interval (update every N ticks when over limit) |
| `removal-batch-size` | Integer | `10` | Max entities removed per check |

::: caution Enable with Caution
This feature is **disabled by default** as it may affect game mechanics. Read [throttling.yml configuration](./throttling.md) carefully before enabling.
:::

---

## Async AI (async-ai)

### Async Pathfinding (async-pathfinding)

```yaml
async-ai:
  async-pathfinding:
    enabled: true
    keep-alive-seconds: 60
    max-queue-size: 500
    timeout-ms: 100
    sync-fallback-enabled: true
```

| Option | Type | Default | Recommended | Description |
|--------|------|---------|-------------|-------------|
| `enabled` | Boolean | `true` | - | Enable async pathfinding |
| `keep-alive-seconds` | Integer | `60` | 30-120 | Thread keep-alive time (seconds) |
| `max-queue-size` | Integer | `500` | 500-1000 | Maximum queue size |
| `timeout-ms` | Integer | `100` | 50-200 | Pathfinding timeout (milliseconds) |
| `sync-fallback-enabled` | Boolean | `true` | - | Use sync pathfinding when async fails |

### Enhanced Pathfinding System (enhanced)

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

::: info Feature Description
**Enhanced Pathfinding System** provides priority queues, multi-layer caching, and path prewarming for comprehensive pathfinding performance improvement.

**Priority System**:
- Within 16 blocks of player: High priority
- 16-48 blocks from player: Medium priority
- Beyond 48 blocks: Low priority

**Multi-layer Cache**:
- Hot cache: Most recently used paths, short expiry
- Warm cache: Frequently used paths, medium expiry
- Cold cache: Infrequently used paths, long expiry
:::

### AI Sensor Optimization (sensor-optimization)

```yaml
  sensor-optimization:
    enabled: true
    sensing-refresh-interval: 5
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable AI sensor optimization |
| `sensing-refresh-interval` | Integer | `5` | Line-of-sight cache clear interval (ticks) |

### Game Event Optimization (game-event-optimization)

```yaml
  game-event-optimization:
    enabled: true
    early-filter: true
    throttle-low-priority: true
    throttle-interval-ms: 50
    distance-filter: true
    max-detection-distance: 64.0
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable game event system optimization |
| `early-filter` | Boolean | `true` | Early filter unneeded events |
| `throttle-low-priority` | Boolean | `true` | Throttle low priority events |
| `throttle-interval-ms` | Integer | `50` | Throttle interval (milliseconds) |
| `distance-filter` | Boolean | `true` | Enable distance filtering |
| `max-detection-distance` | Float | `64.0` | Maximum detection distance (blocks) |

### Villager Optimization (villager-optimization)

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

---

## VMP Optimizations (vmp-optimizations)

```yaml
vmp-optimizations:
  chunk-loading:
    enabled: true
    max-concurrent-per-player: 5
  
  entity-tracking:
    enabled: true
    range-multiplier: 0.8
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `chunk-loading.enabled` | Boolean | `true` | Enable chunk loading optimization |
| `chunk-loading.max-concurrent-per-player` | Integer | `5` | Max concurrent chunk loads per player |
| `entity-tracking.enabled` | Boolean | `true` | Enable entity tracking optimization |
| `entity-tracking.range-multiplier` | Float | `0.8` | Tracking range multiplier (0.8 = 80% of vanilla) |

---

## Item Entity Optimizations (item-entity-optimizations)

### Smart Merge (smart-merge)

```yaml
item-entity-optimizations:
  smart-merge:
    enabled: true
    cancel-vanilla-merge: true
    merge-interval: 5
    min-nearby-items: 3
    merge-range: 1.5
```

| Option | Type | Default | Recommended | Description |
|--------|------|---------|-------------|-------------|
| `enabled` | Boolean | `true` | - | Enable smart merge |
| `cancel-vanilla-merge` | Boolean | `true` | - | Cancel vanilla merge logic |
| `merge-interval` | Integer | `5` | 5-10 | Merge check interval (ticks) |
| `min-nearby-items` | Integer | `3` | 3-5 | Minimum nearby items to trigger merge |
| `merge-range` | Float | `1.5` | 1.5-2.5 | Merge range (blocks) |

::: info Performance Improvement
60-80%, reduces 2-4ms MSPT.
:::

### Age Optimization (age-optimization)

```yaml
  age-optimization:
    enabled: true
    age-interval: 10
    player-detection-range: 8.0
```

| Option | Type | Default | Recommended | Description |
|--------|------|---------|-------------|-------------|
| `enabled` | Boolean | `true` | - | Enable age optimization |
| `age-interval` | Integer | `10` | 10-20 | Age update interval (ticks) |
| `player-detection-range` | Float | `8.0` | 8.0-16.0 | Player detection range (blocks) |

::: info Performance Improvement
80-90%, reduces 3-5ms MSPT.
:::

### Inactive Tick (inactive-tick)

```yaml
  inactive-tick:
    enabled: true
    inactive-range: 32.0
    merge-interval: 100
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable inactive tick optimization |
| `inactive-range` | Float | `32.0` | Inactive range (blocks) |
| `merge-interval` | Integer | `100` | Merge interval in simplified tick |

---

## Experience Orb Optimizations (experience-orb-optimizations)

```yaml
experience-orb-optimizations:
  inactive-tick:
    enabled: true
    inactive-range: 32.0
    merge-interval: 100
```

Similar to item entity optimization, uses simplified tick for experience orbs far from players.

---

## Block Entity Optimizations (block-entity-optimizations)

### Zero-Delay Factory Optimization (zero-delay-factory-optimization)

```yaml
block-entity-optimizations:
  zero-delay-factory-optimization:
    enabled: true
    entities-config-file: "entities.yml"
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable zero-delay factory optimization |
| `entities-config-file` | String | `"entities.yml"` | Entity config file path |

::: info Feature Description
**Zero-Delay Factory Optimization** reduces block entity tick delay to 0, improving factory efficiency.

**Supported Block Entities** (configured in entities.yml):
- Hoppers, Furnaces, Blast Furnaces, Smokers
- Brewing Stands, Beacons
- Chests, Trapped Chests, Barrels, Shulker Boxes
- Ender Chests, Droppers, Dispensers
:::

### Parallel Tick (parallel-tick)

```yaml
  parallel-tick:
    enabled: true
    min-block-entities: 50
    batch-size: 16
    protect-containers: true
    timeout-ms: 50
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable parallel block entity tick |
| `min-block-entities` | Integer | `50` | Don't enable parallel below this count |
| `batch-size` | Integer | `16` | Block entities processed per batch |
| `protect-containers` | Boolean | `true` | Protect containers (execute on main thread to prevent item loss) |
| `timeout-ms` | Integer | `50` | Timeout (ms), fallback to sync after timeout |

::: warning Note
**Strongly recommended to keep `protect-containers` enabled** to prevent item loss from multi-threaded operations.

Automatically disabled in Folia environment.
:::

### Hopper Optimization (hopper-optimization)

```yaml
  hopper-optimization:
    enabled: true
    cache-expire-time: 100
    container-cache: true
    skip-failed-transfers: true
    fast-empty-full-check: true
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable hopper optimization |
| `cache-expire-time` | Integer | `100` | Cache expiry time (ms) |
| `container-cache` | Boolean | `true` | Enable container cache |
| `skip-failed-transfers` | Boolean | `true` | Skip failed transfer attempts |
| `fast-empty-full-check` | Boolean | `true` | Enable fast empty/full detection |

### Minecart Optimization (minecart-optimization)

```yaml
  minecart-optimization:
    enabled: true
    tick-interval: 2
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable minecart optimization |
| `tick-interval` | Integer | `2` | Minecart tick interval |

---

## Recipe Optimization (recipe-optimization)

### Furnace Recipe Cache (furnace-recipe-cache)

```yaml
recipe-optimization:
  furnace-recipe-cache:
    enabled: true
    cache-size: 100
    apply-to-blast-furnace: true
    apply-to-smoker: true
    fix-burn-time-bug: true
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable furnace recipe cache |
| `cache-size` | Integer | `100` | Cached recipes per furnace |
| `apply-to-blast-furnace` | Boolean | `true` | Apply to blast furnace |
| `apply-to-smoker` | Boolean | `true` | Apply to smoker |
| `fix-burn-time-bug` | Boolean | `true` | Fix >32767 burn time bug |

### C2ME NBT Optimization (c2me-nbt-optimization)

```yaml
  c2me-nbt-optimization:
    enabled: true
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable C2ME NBT optimization |

### Crafting Recipe Cache (crafting-recipe-cache)

```yaml
  crafting-recipe-cache:
    enabled: false
    cache-size: 200
    optimize-batch-crafting: true
    reduce-network-traffic: true
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `false` | Enable crafting cache (disabled by default) |
| `cache-size` | Integer | `200` | Cache size |
| `optimize-batch-crafting` | Boolean | `true` | Optimize batch crafting |
| `reduce-network-traffic` | Boolean | `true` | Reduce network traffic |

::: warning Experimental Feature
This feature is **disabled by default**, may conflict with some plugins.
:::

---

## Smart Lag Compensation (smart-lag-compensation)

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

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable smart lag compensation |
| `tps-threshold` | Float | `18.0` | TPS threshold, compensation activates below this |
| `item-pickup-delay.enabled` | Boolean | `true` | Item pickup delay compensation |
| `potion-effects.enabled` | Boolean | `false` | Potion effects compensation (disabled by default) |
| `time-acceleration.enabled` | Boolean | `false` | Time acceleration (disabled by default) |

::: info Feature Description
**Smart Lag Compensation** automatically compensates during low TPS to maintain consistent gameplay experience.
:::

---

## TNT Explosion Optimization (tnt-explosion-optimization)

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
  
  cache:
    enabled: true
    cache-expiry-ticks: 600
  
  density-cache:
    enabled: true
  
  vectorized-aabb:
    enabled: true
  
  unified-engine:
    enabled: true
  
  entity-merge:
    enabled: false
    radius: 1.5
    max-fuse-difference: 5
    power-multiplier: 0.5
    max-power: 12.0
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable TNT explosion optimization |
| `vanilla-compatibility.enabled` | Boolean | `true` | Enable vanilla compatibility mode |
| `cache.enabled` | Boolean | `true` | Enable explosion cache |
| `density-cache.enabled` | Boolean | `true` | Enable explosion density cache |
| `vectorized-aabb.enabled` | Boolean | `true` | Enable SIMD vectorized entity collision detection |
| `unified-engine.enabled` | Boolean | `true` | Enable unified explosion engine (recommended, 4x throughput) |
| `entity-merge.enabled` | Boolean | `false` | Enable TNT entity merge (disabled by default) |

::: warning Note
TNT entity merge is **disabled by default**, suitable for cannon servers. Enabling will change TNT explosion behavior.
:::

---

## Falling Block Optimization (falling-block-optimization)

```yaml
falling-block-optimization:
  enabled: true
  min-falling-blocks: 20
  batch-size: 10
```

| Option | Type | Default | Recommended | Description |
|--------|------|---------|-------------|-------------|
| `enabled` | Boolean | `true` | - | Enable falling block optimization |
| `min-falling-blocks` | Integer | `20` | 20-50 | Minimum falling blocks (no parallel below this) |
| `batch-size` | Integer | `10` | 10-20 | Batch size |

---

## Chunk System (chunk-system)

```yaml
chunk-system:
  enabled: true
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable chunk system optimization (main switch) |

### Chunk Generation (generation)

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

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `noise-optimization.enabled` | Boolean | `true` | Noise sampling optimization, improves terrain generation speed |
| `jigsaw-optimization.enabled` | Boolean | `true` | Jigsaw structure generation optimization, improves village generation speed |
| `chunk-pos-optimization.enabled` | Boolean | `true` | ChunkPos equals optimization (from C2ME) |
| `perlin-noise-optimization.enabled` | Boolean | `true` | Perlin noise optimization (from C2ME) |

### Chunk Loading (loading)

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

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `async-loading.enabled` | Boolean | `true` | Async chunk loading, reduces main thread blocking |
| `async-loading.cache-size` | Integer | `256` | Read cache size |
| `mid-tick-tasks.enabled` | Boolean | `true` | Mid-tick chunk tasks, execute chunk tasks during tick to reduce latency |
| `mid-tick-tasks.interval-ns` | Integer | `1000000` | Execution interval (nanoseconds, 1000000 = 1ms) |
| `async-blending.enabled` | Boolean | `true` | Async blending state calculation, reduces world upgrade lag |

### Chunk Saving (saving)

```yaml
  saving:
    async-serialization:
      enabled: true
    unload-queue-optimization:
      enabled: true
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `async-serialization.enabled` | Boolean | `true` | Async chunk serialization, moves serialization to background thread |
| `unload-queue-optimization.enabled` | Boolean | `true` | Chunk unload queue optimization, avoids O(n) size() calls |

### Disk IO (io)

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

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `async-disk-write.enabled` | Boolean | `true` | Async disk write, disables dsync for improved IO performance |
| `storage-io-worker.enabled` | Boolean | `true` | Storage IO worker optimization |
| `nbt-cache-limit.enabled` | Boolean | `true` | NBT cache limit, prevents memory leaks |
| `nbt-cache-limit.max-size` | Integer | `256` | Maximum cache entries |

### Block Tick (block-tick)

```yaml
  block-tick:
    async:
      enabled: false
      timeout-us: 200
      batch-size: 16
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `async.enabled` | Boolean | `false` | Enable block tick async (disabled by default) |
| `async.timeout-us` | Integer | `200` | Timeout (microseconds) |
| `async.batch-size` | Integer | `16` | Batch size |

::: warning Note
Block tick async is **disabled by default**, automatically disabled in Folia environment.
:::

---

## Structure Location Async (structure-location-async)

```yaml
structure-location-async:
  enabled: true
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable structure location async |

### /locate Command Optimization (locate-command)

```yaml
  locate-command:
    enabled: true
    search-radius: 100
    skip-known-structures: false
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Async process /locate command |
| `search-radius` | Integer | `100` | Search radius (chunks) |
| `skip-known-structures` | Boolean | `false` | Skip known structures (speeds up search) |

### Villager Trade Maps (villager-trade-maps)

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

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Async generate villager trade maps |
| `search-radius` | Integer | `100` | Search radius (chunks) |
| `generation-timeout-seconds` | Integer | `30` | Generation timeout (seconds) |

### Dolphin Treasure Hunt (dolphin-treasure-hunt)

```yaml
  dolphin-treasure-hunt:
    enabled: true
    search-radius: 50
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Async process dolphin treasure hunt |
| `search-radius` | Integer | `50` | Search radius (blocks) |

### Algorithm Optimization (algorithm-optimization)

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

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable algorithm optimization |
| `search-pattern` | String | `"hybrid"` | Search pattern: spiral, layered, hybrid |
| `caching.enabled` | Boolean | `true` | Enable structure caching |
| `biome-aware-search.enabled` | Boolean | `true` | Enable biome-aware intelligent search |

---

## Lighting Optimizations (lighting-optimizations)

```yaml
lighting-optimizations:
  enabled: true
  update-interval-ms: 10
  
  light-batching:
    enabled: true
```

| Option | Type | Default | Recommended | Description |
|--------|------|---------|-------------|-------------|
| `enabled` | Boolean | `true` | - | Enable lighting optimization |
| `update-interval-ms` | Integer | `10` | 5-20 | Light update interval (milliseconds) |
| `light-batching.enabled` | Boolean | `true` | - | Enable light update batching |

::: info Feature Description
**Lighting Optimization** references ScalableLux, using time windows to control update frequency.
:::

---

## Bug Fixes & Special Features

### Spawn Chunk Removal (spawn-chunk-removal)

```yaml
spawn-chunk-removal:
  enabled: true
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Remove spawn chunks to speed up world loading |

::: warning Version Limitation
Only effective for **1.21.8**. Version 1.21.10+ has spawn chunks removed by default.
:::

### Bee Fix (bee-fix)

```yaml
bee-fix:
  enabled: true
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable bee fix |

::: info Fixed Bugs
Fixes 7 MC bugs: MC-168329, MC-190042, MC-206401, MC-229321, MC-234364, MC-248332, MC-255743
:::

### Shulker Bullet Self-Hit Fix (shulker-bullet-self-hit-fix)

```yaml
shulker-bullet-self-hit-fix:
  enabled: true
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Prevent shulker bullets from hitting the shulker that fired them |

### End Island Density Fix (end-island-density-fix)

```yaml
end-island-density-fix:
  enabled: true
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Fix End dimension terrain ring gaps (MC-159283) |

### Leader Zombie Health Fix (leader-zombie-health-fix)

```yaml
leader-zombie-health-fix:
  enabled: true
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Fix leader zombie incorrect health on spawn (MC-219981) |

### Portal Suffocation Check (portal-suffocation-check)

```yaml
portal-suffocation-check:
  disabled: false
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `disabled` | Boolean | `false` | `false` = keep vanilla behavior; `true` = disable check for performance |

### Enderman Block Carry Limiter (enderman-block-carry-limiter)

```yaml
enderman-block-carry-limiter:
  enabled: true
  max-carrying-endermen: 50
  count-towards-mob-cap: true
  prevent-pickup-when-limit-reached: true
```

| Option | Type | Default | Recommended | Description |
|--------|------|---------|-------------|-------------|
| `enabled` | Boolean | `true` | - | Enable enderman block carry limiter |
| `max-carrying-endermen` | Integer | `50` | 30-100 | Max block-carrying endermen |
| `count-towards-mob-cap` | Boolean | `true` | - | Force count towards mob cap (fixes vanilla bug) |
| `prevent-pickup-when-limit-reached` | Boolean | `true` | - | Prevent pickup when limit reached |

::: info Feature Description
Fixes Mojang bug: Block-carrying endermen don't count towards mob cap, causing infinite accumulation.

**Note**: If `entity-throttling` is enabled, consider setting this to `false`.
:::

---

## Datapack Optimization (datapack-optimization)

```yaml
datapack-optimization:
  enabled: true
  batch-size: 100
  cache-expiration-minutes: 30
  max-file-cache-size: 1000
  max-filesystem-cache-size: 50
  
  execute-inactive-skip:
    enabled: false
    skip-level: 2
  
  command-deduplication:
    enabled: true
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable datapack optimization |
| `batch-size` | Integer | `100` | Batch size |
| `cache-expiration-minutes` | Integer | `30` | Cache expiration (minutes) |
| `execute-inactive-skip.enabled` | Boolean | `false` | Skip inactive entities in execute command (disabled by default) |
| `command-deduplication.enabled` | Boolean | `true` | Deduplicate duplicate command objects in datapack functions |

---

## Math Optimization (math-optimization)

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

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable math optimization |
| `compact-sine-lut` | Boolean | `true` | Compact sine lookup table (saves 75% memory) |
| `bitset-pooling.enabled` | Boolean | `true` | BitSet object pool (ThreadLocal cache) |
| `completable-future-optimization.enabled` | Boolean | `true` | CompletableFuture optimization |
| `blockpos-cache` | Boolean | `true` | BlockPos cache (precompute to reduce overhead) |
| `optimized-collections` | Boolean | `true` | Optimized collections (high-performance collections) |

---

## Seed Encryption (seed-encryption)

```yaml
seed-encryption:
  enabled: false
  scheme: "quantum"
  
  protect-structures: true
  protect-ores: true
  protect-slimes: true
  
  quantum:
    encryption-level: 2
    private-key-file: "quantum-seed.key"
    enable-time-decay: false
    cache-size: 10000
  
  restrict-seed-command: true
  seed-command-deny-message: "&cYou don't have permission to use this command."
  
  anti-plugin-theft:
    enabled: true
    return-fake-seed: true
    fake-seed-value: 0
    log-suspicious-access: true
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `false` | Enable seed encryption (disabled by default) |
| `scheme` | String | `"quantum"` | Encryption scheme: legacy, quantum (recommended) |
| `protect-structures` | Boolean | `true` | Protect structures (villages/strongholds/ruins) |
| `protect-ores` | Boolean | `true` | Protect ores (diamonds/gold, etc.) |
| `protect-slimes` | Boolean | `true` | Protect slime chunks |
| `restrict-seed-command` | Boolean | `true` | Restrict /seed command to OP only |
| `anti-plugin-theft.enabled` | Boolean | `true` | Enable anti-plugin seed theft |

::: danger Important Warning
**Cannot be disabled after enabling!** Disabling will cause:
- Chunk corruption
- Structures disappearing
- Ore changes
- Slime chunk changes

Must delete world if you need to disable.
:::

---

## Network Optimization (network-optimization)

### Chunk Visibility Filter (chunk-visibility-filter)

```yaml
network-optimization:
  chunk-visibility-filter:
    enabled: true
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Occlusion culling: only send surface chunks in player's view |

### Fast Movement Chunk Load (fast-movement-chunk-load)

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
```

| Option | Type | Default | Recommended | Description |
|--------|------|---------|-------------|-------------|
| `enabled` | Boolean | `true` | - | Enable fast movement chunk preload |
| `speed-threshold` | Float | `0.5` | 0.3-0.8 | Trigger speed (b/t) |
| `preload-distance` | Integer | `8` | 6-10 | Preload distance |
| `max-concurrent-loads` | Integer | `4` | 2-6 | Max concurrent loads |
| `prediction-ticks` | Integer | `40` | 30-50 | Prediction ticks |

::: info Feature Description
**Fast Movement Chunk Preload** preloads chunks during elytra/sprint/creative flight to avoid lag.

**Smart Center Offset** offsets loading center based on speed direction for far-view-distance-like effect.
:::

### Advanced Network Optimization (advanced)

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

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `fast-varint.enabled` | Boolean | `true` | Fast VarInt encoding (50% improvement for 1-byte path) |
| `eventloop-affinity.enabled` | Boolean | `true` | EventLoop affinity check (10-20% reduction in cross-thread scheduling) |
| `bytebuf-optimizer.enabled` | Boolean | `true` | ByteBuf optimizer (40-60% GC pressure reduction) |
| `skip-zero-movement-packets.enabled` | Boolean | `true` | Zero movement packet filter (10-15% entity packet reduction) |

### AFK Packet Throttle (afk-packet-throttle)

```yaml
  afk-packet-throttle:
    enabled: true
    afk-duration-ms: 120000
    particle-max-distance: 0.0
    sound-max-distance: 64.0
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable AFK player packet throttle |
| `afk-duration-ms` | Integer | `120000` | AFK detection time (ms, 120000 = 2 minutes) |
| `particle-max-distance` | Float | `0.0` | Particle max distance (0 = fully filtered) |
| `sound-max-distance` | Float | `64.0` | Sound max distance |

::: info Performance Improvement
20-40% network traffic reduction (for AFK players).
:::

### Dynamic Chunk Send Rate (dynamic-chunk-send-rate)

```yaml
  dynamic-chunk-send-rate:
    enabled: true
    limit-upload-bandwidth: 10240
    guaranteed-bandwidth: 512
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable dynamic chunk send rate |
| `limit-upload-bandwidth` | Integer | `10240` | Limit upload bandwidth (KB/s) |
| `guaranteed-bandwidth` | Integer | `512` | Guaranteed bandwidth per player (KB/s) |

### Packet Compression (packet-compression)

```yaml
  packet-compression:
    enabled: true
    adaptive-threshold: true
    skip-small-packets: true
    skip-threshold: 32
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable packet compression optimization |
| `adaptive-threshold` | Boolean | `true` | Adaptive compression threshold |
| `skip-small-packets` | Boolean | `true` | Skip small packet compression |
| `skip-threshold` | Integer | `32` | Skip threshold (bytes) |

### Chunk Batch (chunk-batch)

```yaml
  chunk-batch:
    enabled: true
    min-chunks: 2.0
    max-chunks: 32.0
    max-unacked-batches: 8
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable chunk batch optimization |
| `min-chunks` | Float | `2.0` | Min chunks per tick |
| `max-chunks` | Float | `32.0` | Max chunks per tick |
| `max-unacked-batches` | Integer | `8` | Max unacknowledged batches |

### Packet Priority (packet-priority)

```yaml
  packet-priority:
    enabled: true
    prioritize-player-packets: true
    prioritize-chunk-packets: true
    deprioritize-particles: true
    deprioritize-sounds: true
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | Boolean | `true` | Enable packet priority queue |
| `prioritize-player-packets` | Boolean | `true` | Prioritize player packets |
| `prioritize-chunk-packets` | Boolean | `true` | Prioritize chunk packets |
| `deprioritize-particles` | Boolean | `true` | Deprioritize particles |
| `deprioritize-sounds` | Boolean | `true` | Deprioritize sounds |

---

## Advanced Optimizations (advanced-optimizations)

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

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `virtual-threads` | Boolean | `true` | Java 21 virtual threads (auto-fallback for older versions) |
| `work-stealing` | Boolean | `true` | Work-stealing scheduling |
| `multi-netty-event-loop` | Boolean | `true` | Separate Login/Play network IO, reduce contention |
| `paletted-container-lock-removal` | Boolean | `true` | Remove PalettedContainer lock (Paper/Folia already syncs at higher level) |
| `type-filterable-list` | Boolean | `true` | Entity type filtering (+20-40%) |
| `entity-tracker-linked-hashmap` | Boolean | `true` | Entity tracker optimization |
| `spawn-density-array` | Boolean | `true` | Spawn density check (+3-5x) |
| `biome-access-optimization` | Boolean | `true` | Inline biome sampling (-10-20% overhead) |
| `entity-move-zero-velocity` | Boolean | `true` | Skip zero velocity movement calculations |
| `entity-tracker-distance-cache` | Boolean | `true` | Cache entity tracking distance |

::: info Feature Description
These optimizations come from multiple high-performance mods: VMP, Nitori, Lithium.
:::

---

## Performance Monitoring & Debug (performance)

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

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `debug-logging.enabled` | Boolean | `false` | Enable debug logging (for debugging only, recommend off in production) |
| `enable-metrics` | Boolean | `true` | Enable performance metrics collection |

**Debug Modules**:

| Module | Description |
|--------|-------------|
| `tnt` | TNT explosion debug |
| `collision` | Collision detection debug |
| `lighting` | Lighting calculation debug |
| `pathfinding` | Pathfinding debug |
| `entity` | Entity system debug |
| `chunk` | Chunk system debug |
| `hopper` | Hopper system debug |
| `math` | Math optimization debug |
| `shapes` | Shape optimization debug |
| `datapack` | Datapack optimization debug |

---

## Command Configuration (commands)

```yaml
commands:
  reload:
    require-confirmation: true
    confirmation-timeout: 30
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `require-confirmation` | Boolean | `true` | Require double confirmation (first warning, then execute again) |
| `confirmation-timeout` | Integer | `30` | Confirmation timeout (seconds) |

---
