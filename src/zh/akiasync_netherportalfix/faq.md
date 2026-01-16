---
title: 常见问题
icon: circle-question
order: 2
category:
  - 插件文档
tag:
  - NetherPortalFix
  - FAQ
---

# NetherPortalFix 常见问题

## 基础问题

::: details Q: 这个插件解决什么问题？
在原版 Minecraft 中，当玩家通过地狱门传送时，可能会遇到以下问题：

1. 从地狱返回主世界时，出现在错误的地狱门
2. 多个地狱门距离较近时，传送位置混乱
3. 新建地狱门后，原有传送关系被打乱

本插件通过记录玩家的传送历史，确保玩家始终能返回正确的地狱门。
:::

::: details Q: 可以用于哪些服务端？
| 服务端 | 支持状态 | 备注 |
|--------|----------|------|
| Luminol | ✅ 推荐 | 完全支持 |
| Leaves | ⚠️ 不需要 | 已内置修复功能 |
| 其他 Luminol 分支 | ✅ 支持 | 需测试 |

::: warning 注意
如果你使用的是 Leaves 服务端，无需安装此插件，因为 Leaves 已经内置了地狱门修复功能。
:::

::: details Q: 插件会影响性能吗？
插件对性能的影响非常小。它只在玩家使用地狱门传送时记录数据，不会持续占用服务器资源。
:::

## 安装问题

::: details Q: 为什么 Mixin 不起作用？
Leavesclip 默认禁用了 Mixin 功能。你需要在服务器启动脚本中加入 JVM 参数：

```bash
-Dleavesclip.enable.mixin=true
```

完整启动命令示例：
```bash
java -Xms4G -Xmx4G -Dleavesclip.enable.mixin=true -jar server.jar nogui
```
:::

::: details Q: 插件加载失败怎么办？
请检查以下几点：

1. **JDK 版本** - 确保使用 JDK 21 或更高版本
2. **服务端兼容性** - 确保使用 Luminol 或兼容的服务端
3. **Mixin 参数** - 确保启动命令中包含 `-Dleavesclip.enable.mixin=true`
4. **插件版本** - 确保插件版本与服务端版本匹配

如果问题仍然存在，请在 [GitHub Issues](https://github.com/virgil698/Aki-Async-NetherPortalFix/issues) 提交问题并附上完整的错误日志。
:::

## 使用问题

::: details Q: 传送记录会保存多久？
默认情况下，传送记录会保存 3600 秒（1 小时）。你可以在配置文件中修改 `record-expire-time` 参数来调整保存时间。

```yaml
# 传送记录保存时间（秒）
record-expire-time: 3600
```
:::

::: details Q: 服务器重启后传送记录还在吗？
是的，传送记录会持久化保存，服务器重启后依然有效。
:::

::: details Q: 支持多世界插件吗？
插件主要针对主世界和地狱之间的传送。对于多世界插件创建的额外世界，兼容性可能因插件而异。如果遇到问题，请提交 Issue。
:::

## 其他问题

::: details Q: 如何获取帮助？
- [GitHub Issues](https://github.com/virgil698/Aki-Async-NetherPortalFix/issues) - 提交 Bug 或功能建议
:::

::: details Q: 如何贡献代码？
欢迎通过 Issue 或 Pull Request 提交你的建议或改进！

1. Fork 仓库
2. 创建功能分支
3. 提交更改
4. 发起 Pull Request
:::

## 相关链接

- [安装教程](./install.md)
- [返回插件介绍](./README.md)
