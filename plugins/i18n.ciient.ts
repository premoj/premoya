import { createI18n } from "vue-i18n"
import { defineNuxtPlugin } from "#app"
import en from "../locales/en.json"
import cs from "../locales/cs.json"

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: localStorage.getItem("lang") || "en",
    fallbackLocale: "en",
    messages: {
      en,
      cs,
    },
  })

  vueApp.use(i18n)
})
