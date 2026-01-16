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
  {
    text: "模组列表",
    icon: "lightbulb",
    prefix: "/zh/guide/",
    children: [
      {
        text: "Bar",
        icon: "lightbulb",
        prefix: "bar/",
        children: ["baz", { text: "...", icon: "ellipsis", link: "" }],
      },
      {
        text: "Foo",
        icon: "lightbulb",
        prefix: "foo/",
        children: ["ray", { text: "...", icon: "ellipsis", link: "" }],
      },
    ],
  },
]);
