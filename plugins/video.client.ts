import Vue3VideoPlayer from "@cloudgeek/vue3-video-player"
import "@cloudgeek/vue3-video-player/dist/vue3-video-player.css"
import { defineNuxtPlugin } from "#app"

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp
    .use(Vue3VideoPlayer, {
      lang: "en",
    })
    .mount("#app")
})
