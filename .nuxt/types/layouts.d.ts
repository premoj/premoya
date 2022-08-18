import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "main"
declare module "/Users/premysl/Desktop/premoja/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}