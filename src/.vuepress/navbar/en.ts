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
  // Mods list - to be added later
]);
