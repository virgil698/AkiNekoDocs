---
title: 常见问题
icon: circle-question
order: 2
category:
  - 插件文档
tag:
  - AkiAsync
  - FAQ
---

# AkiAsync 常见问题

## 基础问题

::: details Q: 插件会影响游戏特性吗？
**不会。** AkiAsync 仅优化性能，不改变任何原版特性。所有游戏机制保持与原版一致。
:::

::: details Q: 支持哪些 Minecraft 版本？
请查看 [GitHub Releases](https://github.com/virgil698/Aki-Async/releases) 获取支持的版本列表。每个版本的发布说明中会标注支持的 MC 版本。
:::

::: details Q: 支持哪些服务端？
目前支持以下服务端：
- ✅ Leaves
- ✅ Luminol
- ✅ LightingLuminol
- ✅ Lophine
- ✅ Mint
- ✅ 以上服务端的分支
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
2. **服务端兼容性** - 确保使用支持 Leaves Mixin 的服务端
3. **Mixin 参数** - 确保启动命令中包含 `-Dleavesclip.enable.mixin=true`
4. **插件版本** - 确保插件版本与服务端版本匹配

如果问题仍然存在，请在 [GitHub Issues](https://github.com/virgil698/Aki-Async/issues) 提交问题并附上完整的错误日志。
:::

::: details Q: 如何更新插件？
1. 停止服务器
2. 删除旧版本的插件 JAR 文件
3. 下载并放入新版本的插件 JAR 文件
4. 重启服务器

::: warning 注意
更新前建议备份配置文件，虽然通常配置文件是向后兼容的。
:::

## 性能问题

::: details Q: 插件能提升多少性能？
性能提升取决于服务器的具体情况，包括：
- 在线玩家数量
- 世界复杂度
- 其他插件数量

一般情况下，可以观察到 TPS 稳定性的明显提升。
:::

::: details Q: 插件会增加内存占用吗？
异步处理会略微增加内存占用，但通常在可接受范围内。如果服务器内存紧张，建议适当增加分配的内存。
:::

## 兼容性问题

::: details Q: 与其他插件冲突怎么办？
如果遇到与其他插件的兼容性问题：

1. 确认是否真的是插件冲突（禁用 AkiAsync 后问题是否消失）
2. 在 [GitHub Issues](https://github.com/virgil698/Aki-Async/issues) 提交问题
3. 提供完整的插件列表和错误日志
:::

## 其他问题

::: details Q: 如何获取帮助？
- [GitHub Issues](https://github.com/virgil698/Aki-Async/issues) - 提交 Bug 或功能建议
- [GitHub Discussions](https://github.com/virgil698/Aki-Async/discussions) - 社区讨论
:::
