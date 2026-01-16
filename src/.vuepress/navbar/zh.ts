import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/zh/",
  {
    text: "插件列表",
    icon: "puzzle-piece",
    children: [
      {
        text: "AkiAsync 异步优化",
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
  // 模组列表暂无内容，后续添加
]);
