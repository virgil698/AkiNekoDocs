import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/",
  {
    text: "Plugins",
    icon: "puzzle-piece",
    children: [
      {
        text: "AkiAsync Optimization",
        icon: "gauge-high",
        link: "/akiasync/",
      },
      {
        text: "NetherPortalFix",
        icon: "door-open",
        link: "/akiasync_netherportalfix/",
      },
    ],
  },
  {
    text: "Mods",
    icon: "lightbulb",
    prefix: "/guide/",
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
