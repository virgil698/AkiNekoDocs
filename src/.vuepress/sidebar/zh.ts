import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/": [
    "",
    {
      text: "快速开始",
      icon: "rocket",
      link: "/zh/guide.md",
    },
    {
      text: "插件列表",
      icon: "puzzle-piece",
      children: [
        {
          text: "AkiAsync 异步优化插件",
          icon: "gauge-high",
          link: "/zh/akiasync/",
        },
        {
          text: "NetherPortalFix 地狱门修复",
          icon: "door-open",
          link: "/zh/akiasync_netherportalfix/",
        },
      ],
    },
  ],
  "/zh/akiasync/": [
    {
      text: "插件介绍",
      icon: "house",
      link: "README.md",
    },
    {
      text: "安装教程",
      icon: "download",
      link: "install.md",
    },
    {
      text: "指令帮助",
      icon: "terminal",
      link: "commands.md",
    },
    {
      text: "常见问题",
      icon: "circle-question",
      link: "faq.md",
    },
    {
      text: "配置文件",
      icon: "gear",
      prefix: "config/",
      children: [
        {
          text: "配置说明",
          icon: "book",
          link: "README.md",
        },
        {
          text: "config.yml",
          icon: "file-code",
          link: "config.md",
        },
        {
          text: "entities.yml",
          icon: "cube",
          link: "entities.md",
        },
        {
          text: "throttling.yml",
          icon: "gauge",
          link: "throttling.md",
        },
      ],
    },
  ],
  "/zh/akiasync_netherportalfix/": [
    {
      text: "插件介绍",
      icon: "house",
      link: "README.md",
    },
    {
      text: "安装教程",
      icon: "download",
      link: "install.md",
    },
    {
      text: "常见问题",
      icon: "circle-question",
      link: "faq.md",
    },
  ],
});
