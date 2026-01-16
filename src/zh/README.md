---
home: true
icon: house
title: 首页
heroImage: https://theme-hope-assets.vuejs.press/logo.svg
bgImage: https://theme-hope-assets.vuejs.press/bg/6-light.svg
bgImageDark: https://theme-hope-assets.vuejs.press/bg/6-dark.svg
bgImageStyle:
  background-attachment: fixed
heroText: Aki & Neko
tagline: Minecraft 服务端插件与模组文档中心
heroFullScreen: true
actions:
  - text: 快速开始
    icon: rocket
    link: ./guide.md
    type: primary

  - text: 项目列表
    icon: list
    link: ./projects.md

highlights:
  - header: 项目文档
    description: 选择你需要查阅的项目
    image: /assets/image/box.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/5-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/5-dark.svg
    bgImageStyle:
      background-repeat: no-repeat
      background-size: cover
      background-position: center
    features:
      - title: AkiAsync 异步优化插件
        icon: gauge-high
        details: 基于 Leaves Mixin 实现的异步优化插件，在不改变核心特性的前提下大幅提升服务端性能
        link: ./akiasync/

      - title: NetherPortalFix 地狱门修复
        icon: door-open
        details: 基于 Leaves Mixin 和 NetherPortalFix 模组，修复地狱门传送位置问题
        link: ./akiasync_netherportalfix/

      - title: 更多项目
        icon: ellipsis
        details: 更多精彩项目正在开发中，敬请期待...
        link: ./guide/

copyright: false
footer: 使用 <a href="https://theme-hope.vuejs.press/zh/" target="_blank">VuePress Theme Hope</a> 主题 | MIT 协议, 版权所有 © 2025-2026 virgil698 & AnkiSama
---
