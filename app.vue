<template>
  <div ref="client">
    <div class="z-50 bottom-10 fixed -right-[350px] w-full md:w-auto md:min-w-[350px]">
      <transition-group name="list-complete">
        <div class="list-complete-item" v-for="notification in NM.notifications" :key="notification.id">
          <AppNotification :width="client.clientWidth" :notification="notification" />
        </div>
      </transition-group>
    </div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import { Notification, Variant } from "~/types/Notification.types"
import { NotificationManager } from "@/types/NotificationManager.types"
import { useRoute, useRouter } from "#app"

const currentRoute = useRoute()
const router = useRouter()

const client = ref(null)
const NM = NotificationManager.getInstance()

onMounted(() => {
  NM.create({ message: "test", variant: Variant.SUCCESS, title: "Ahoj" })
})
</script>

<style lang="css">
#app {
  @apply min-h-screen font-sans;
}
</style>
