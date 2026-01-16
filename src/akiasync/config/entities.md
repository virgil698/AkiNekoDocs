---
title: entities.yml Configuration
icon: cube
order: 2
category:
  - Plugin Documentation
tag:
  - AkiAsync
  - Configuration
---

# entities.yml Configuration

Entity list configuration file defining zero-delay factory entities and collision optimization exclusion list.

## File Location

```
plugins/AkiAsync/entities.yml
```

## Entity ID Format

All entity IDs use Minecraft namespace format:

```
minecraft:entity_name
```

---

## Zero-Delay Factory Entity List

These block entities use zero-delay factory mode optimization, reducing tick delay to 0 for improved factory efficiency.

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

### Supported Block Entities

| Entity ID | Name | Description |
|-----------|------|-------------|
| `minecraft:hopper` | Hopper | Item transfer core |
| `minecraft:furnace` | Furnace | Basic smelting |
| `minecraft:blast_furnace` | Blast Furnace | Ore smelting |
| `minecraft:smoker` | Smoker | Food cooking |
| `minecraft:brewing_stand` | Brewing Stand | Potion brewing |
| `minecraft:beacon` | Beacon | Effect emitter |
| `minecraft:chest` | Chest | Item storage |
| `minecraft:trapped_chest` | Trapped Chest | Redstone trigger |
| `minecraft:barrel` | Barrel | Item storage |
| `minecraft:shulker_box` | Shulker Box | Portable storage |
| `minecraft:ender_chest` | Ender Chest | Cross-dimension storage |
| `minecraft:dropper` | Dropper | Item dropping |
| `minecraft:dispenser` | Dispenser | Item dispensing |

::: tip Custom Addition
If you use modded block entities, you can add their IDs to the list for optimization.
:::

---

## Collision Optimization Exclusion List

These entities will not be affected by collision optimization, maintaining vanilla physics behavior.

```yaml
collision-optimization-excluded-entities:
  - "minecraft:tnt"
  - "minecraft:tnt_minecart"
```

### Default Excluded Entities

| Entity ID | Name | Exclusion Reason |
|-----------|------|------------------|
| `minecraft:tnt` | TNT Entity | TNT duplicators require precise physics |
| `minecraft:tnt_minecart` | TNT Minecart | Precision redstone machines need it |

### When to Add Exclusions

::: warning Precision Redstone Machines
If your server has the following types of machines, you may need to add related entities to the exclusion list:

- **TNT Duplicators** - Require precise TNT physics timing
- **Falling Block Machines** - Require precise gravity physics
- **Entity Transport Machines** - Require precise collision detection
:::

### Adding Custom Exclusions

```yaml
collision-optimization-excluded-entities:
  - "minecraft:tnt"
  - "minecraft:tnt_minecart"
  - "minecraft:falling_block"  # Add falling block
  - "minecraft:sand"  # Add sand (if needed)
```

::: caution Performance Impact
Excluding entities will slightly reduce performance, but is necessary for precision machines. Only add entities that truly need it.
:::

---

## Complete Configuration Example

```yaml
# ==========================================
# AkiAsync Entity List Configuration
# ==========================================

# Entity ID format: minecraft:entity_name

# ==========================================
# Zero-Delay Factory Entity List
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
# Collision Optimization Exclusion List
# ==========================================
collision-optimization-excluded-entities:
  - "minecraft:tnt"
  - "minecraft:tnt_minecart"
```
