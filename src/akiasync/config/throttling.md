---
title: throttling.yml Configuration
icon: gauge
order: 3
category:
  - Plugin Documentation
tag:
  - AkiAsync
  - Configuration
---

# throttling.yml Configuration

Entity throttling configuration file controlling entity limits and removal thresholds.

## File Location

```
plugins/AkiAsync/throttling.yml
```

::: warning Prerequisite
This configuration file requires `entity-throttling` to be enabled in `config.yml`:

```yaml
entity-throttling:
  enabled: true
  config-file: "throttling.yml"
```
:::

---

## Configuration Description

Each entity type can configure two parameters:

| Parameter | Description |
|-----------|-------------|
| `limit` | Entity count limit; entities exceeding this will only be updated every 3 ticks |
| `removal` | Entity removal limit; entities exceeding this will be gradually removed (oldest first) |

::: tip Configuration Tips
- `limit` should be less than `removal` (limit < removal)
- Set to `-1` to disable that limit
- Removal priority: Oldest spawned entities are removed first
:::

---

## Hostile Mobs

```yaml
minecraft:zombie:
  limit: 500      # Start throttling after 500 zombies
  removal: 1000   # Start removing after 1000 zombies

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
```

---

## Passive Mobs

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

minecraft:villager:
  limit: 500      # Villagers are important, more lenient limits
  removal: 1000
```

::: tip Villager Protection
Villager limits are more lenient because villagers are important for trading systems. If your server has large trading halls, consider increasing these values.
:::

---

## Items and Experience Orbs

```yaml
minecraft:item:
  limit: 2000     # Item limits are more lenient
  removal: 5000

minecraft:experience_orb:
  limit: 1000
  removal: 3000
```

::: tip Item Optimization
Item limits are more lenient because AkiAsync already has dedicated item entity optimization features (smart merge, age optimization, etc.).
:::

---

## Special Entities

```yaml
minecraft:iron_golem:
  limit: 50
  removal: 100

minecraft:wither:
  limit: 5       # Boss entities strictly limited
  removal: 10

minecraft:ender_dragon:
  limit: 1
  removal: 2
```

::: caution Boss Entities
Boss entity (Wither, Ender Dragon) limits are very strict to prevent malicious boss spawning attacks.
:::

---

## Custom Configuration Examples

### Survival Server (Lenient)

```yaml
minecraft:zombie:
  limit: 800
  removal: 1500

minecraft:villager:
  limit: 1000
  removal: 2000
```

### Minigame Server (Strict)

```yaml
minecraft:zombie:
  limit: 200
  removal: 400

minecraft:villager:
  limit: 100
  removal: 200
```

### Disable Specific Entity Limits

```yaml
minecraft:villager:
  limit: -1      # No villager count limit
  removal: -1    # Don't remove villagers
```

---

## Important Notes

::: warning Game Mechanic Impact
Enabling entity throttling may affect the following game mechanics:

1. **Mob Farm Efficiency** - Monster count limits may reduce farm output
2. **Villager Trading** - Villager limits may affect large trading halls
3. **Animal Farms** - Animal limits may affect breeding farms
4. **Redstone Machines** - Some machines relying on many entities may be affected
:::

::: tip Tuning Suggestions
1. Run with default configuration for a while first
2. Observe server performance and player feedback
3. Gradually adjust limits based on actual needs
4. For important entities (like villagers), set higher limits
:::
