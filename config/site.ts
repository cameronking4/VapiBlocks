export const siteConfig = {
  name: "Vapi Blocks",
  url: "https://vapiblocks.vercel.app",
  description: "Vapi Blocks is a UI Library built with React and TailwindCSS to drop-in Voice AI components into your application with ease.",
  author: "cameronking4",
  links: {
    twitter: "https://x.com/cameronyking4",
    github: "https://github.com/cameronking4/VapiBlocks/tree/master",
    portfolio: "https://www.linkedin.com/in/cameronyking",
  },
  docs: [
    {
      title: "Introduction",
      path: "/docs",
      new: false,
    },
    // {
    //   title: "Installation",
    //   path: "/docs/creating-a-new-project",
    //   new: false,
    // },
    {
      title: "Changelog",
      path: "/docs/changelog",
      new: false,
    },
  ],
  components: [
    {
      title: "Minimal",
      path: "/components/minimal-component",
      new: false,
    },
    {
      title: "Classic",
      path: "/components/visualizer",
      new: false,
    },
    // {
    //   title: "Pulser",
    //   path: "/components/waveform",
    //   new: false,
    // },
    {
      title: "Orb",
      path: "/components/3d-orb",
      new: true,
    },
    {
      title: "Radial",
      path: "/components/circlewaveform",
      new: true,
    },
    {
      title: "Siri",
      path: "/components/siri",
      new: true,
    },
    {
      title: "Floaty",
      path: "/components/floaty",
      new: false,
    },
    {
      title: "Transcriber",
      path: "/components/hero",
      new: false,
    },
  ],
  sections: [
    {
      title: "Outbound Call",
      path: "/components/hero",
      new: true,
    }
  ],
};

export type SiteConfig = typeof siteConfig;
