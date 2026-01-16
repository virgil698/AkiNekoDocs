---
title: 配置文件说明
icon: gear
order: 3
category:
  - 插件文档
tag:
  - AkiAsync
  - 配置
---

# AkiAsync 配置文件说明

AkiAsync 使用多个配置文件来管理不同的功能模块。

## 配置文件列表

```component VPCard
title: config.yml
desc: 主配置文件，包含所有核心功能开关和参数
logo: https://theme-hope-assets.vuejs.press/logo.svg
link: ./config.md
background: rgba(134, 239, 172, 0.15)
```

```component VPCard
title: entities.yml
desc: 实体列表配置，定义零延迟工厂实体和碰撞优化排除列表
logo: https://theme-hope-assets.vuejs.press/logo.svg
link: ./entities.md
background: rgba(147, 197, 253, 0.15)
```

```component VPCard
title: throttling.yml
desc: 实体节流配置，控制各类实体的数量限制和移除阈值
logo: https://theme-hope-assets.vuejs.press/logo.svg
link: ./throttling.md
background: rgba(253, 230, 138, 0.15)
```

## 配置文件位置

所有配置文件位于 `plugins/AkiAsync/` 目录下：

```
plugins/AkiAsync/
├── config.yml          # 主配置文件
├── entities.yml        # 实体列表配置
└── throttling.yml      # 实体节流配置
```

## 重载配置

修改配置后，可以使用以下命令重载：

```bash
/aki-reload
```

::: warning 注意
首次执行会显示警告，需要在 30 秒内再次执行以确认重载。
:::
