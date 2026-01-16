---
title: 安装教程
icon: download
order: 1
category:
  - 插件文档
tag:
  - NetherPortalFix
  - 安装
---

# NetherPortalFix 安装教程

## 环境要求

::: warning 前置条件
- JDK 21 或更高版本
- 推荐使用 Luminol 服务端
- Leaves 服务端已内置此功能，无需安装
:::

## 安装方式

::: tabs

@tab 快速安装

### 步骤一：下载插件

前往 [GitHub Releases](https://github.com/virgil698/Aki-Async-NetherPortalFix/releases) 下载最新版本的 `.jar` 文件。

### 步骤二：放置插件

将下载的 `.jar` 文件放入服务端的 `plugins` 文件夹中。

```
服务端根目录/
├── plugins/
│   └── AkiAsyncNetherPortalFix-x.x.x.jar  <-- 放在这里
├── server.jar
└── ...
```

### 步骤三：启用 Mixin

在服务器启动脚本中添加以下 JVM 参数：

```bash
-Dleavesclip.enable.mixin=true
```

完整启动命令示例：

```bash
java -Xms4G -Xmx4G -Dleavesclip.enable.mixin=true -jar server.jar nogui
```

### 步骤四：重启服务器

重启服务器，插件将自动加载并生成配置文件。

@tab 从源码构建

### 步骤一：克隆仓库

```bash
git clone https://github.com/virgil698/Aki-Async-NetherPortalFix.git
cd Aki-Async-NetherPortalFix
```

### 步骤二：构建项目

::: code-tabs

@tab Linux/macOS

```bash
./gradlew build
```

@tab Windows

```cmd
gradlew.bat build
```

:::

### 步骤三：获取构建产物

构建成功后，插件 JAR 文件会生成在 `build/libs` 目录下。

### 步骤四：部署插件

将生成的 `.jar` 文件放入服务器的 `plugins` 文件夹，并按照快速安装的步骤启用 Mixin 后重启服务器。

:::

## 验证安装

服务器启动后，可以通过以下方式验证插件是否正常加载：

1. 查看控制台日志，确认没有报错
2. 执行命令 `/plugins` 查看插件列表
3. 检查 `plugins/AkiAsyncNetherPortalFix/` 目录下是否生成了配置文件

## 配置文件

插件首次加载后会在 `plugins/AkiAsyncNetherPortalFix/` 目录下生成配置文件：

```yaml
# 是否启用插件
enabled: true
# 传送记录保存时间（秒）
record-expire-time: 3600
```

## 下一步

- [查看常见问题](./faq.md)
- [返回插件介绍](./README.md)
