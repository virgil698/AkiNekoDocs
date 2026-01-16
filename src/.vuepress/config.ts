import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/AkiNekoDocs/",

  locales: {
    "/": {
      lang: "en-US",
      title: "Aki & Neko Docs",
      description: "Documentation for Aki & Neko Minecraft server plugins and mods",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "Aki & Neko 文档",
      description: "Aki & Neko 系列 Minecraft 服务端插件与模组文档",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
