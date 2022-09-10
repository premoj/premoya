import { defineNuxtConfig } from "nuxt"

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  buildModules: ["@pinia/nuxt", "@nuxtjs/color-mode"],

  modules: ["@nuxtjs/tailwindcss", "@formkit/nuxt"],

  css: ["@/styles/swv.css", "@/styles/form.css", "@/styles/style.css", "@/styles/oruga.css", "@fortawesome/fontawesome-svg-core/styles.css"],
  colorMode: {
    preference: "system", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "-mode",
    storageKey: "nuxt-color-mode",
  },

  meta: {
    title: "Premoja",
    link: [
      { rel: "icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Raleway:wght@400;600&family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap",
      },
    ],
    charset: "UTF-8",
  },

  vue: {
    config: {
      devtools: true,
    },
  },

  vite: {},

  ssr: false,
})
