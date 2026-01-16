import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/": [
    "",
    {
      text: "Get Started",
      icon: "rocket",
      link: "/guide.md",
    },
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
  ],
  "/akiasync/": [
    {
      text: "Introduction",
      icon: "house",
      link: "README.md",
    },
    {
      text: "Installation Guide",
      icon: "download",
      link: "install.md",
    },
    {
      text: "Commands",
      icon: "terminal",
      link: "commands.md",
    },
    {
      text: "FAQ",
      icon: "circle-question",
      link: "faq.md",
    },
    {
      text: "Configuration",
      icon: "gear",
      prefix: "config/",
      children: [
        {
          text: "Overview",
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
  "/akiasync_netherportalfix/": [
    {
      text: "Introduction",
      icon: "house",
      link: "README.md",
    },
    {
      text: "Installation Guide",
      icon: "download",
      link: "install.md",
    },
    {
      text: "FAQ",
      icon: "circle-question",
      link: "faq.md",
    },
  ],
});
