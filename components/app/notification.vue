<template>
  <div
    aria-live="assertive"
    ref="reference"
    class="notification drop-shadow-xl z-50 inset-0 opacity-0 flex items-end px-4 md:pr-7 md:pl-0 py-1 pointer-events-none md:py-1.5 sm:items-start"
  >
    <div class="w-full relative flex flex-col items-center space-y-4 sm:items-end">
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="show"
          :class="[
            props.notification.variant === Variant.SUCCESS && 'bg-black',
            props.notification.variant === Variant.ERROR && 'bg-gradient-to-r to-red-900 from-red-600',
            props.notification.variant === Variant.LOADING && 'bg-black',
          ]"
          class="max-w-sm w-full shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
        >
          <div class="p-4">
            <div class="flex items-start relative">
              <div class="mt-0.5 flex-shrink-0">
                <slot v-if="$slots.icon" name="icon" />
                <div v-else-if="props.notification.variant === Variant.SUCCESS">
                  <FontAwesomeIcon
                    icon="circle-check"
                    class="flex text-white mr-2.5 items-center justify-center h-4 w-4 pt-0.5 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-950"
                  />
                </div>
                <div v-else-if="props.notification.variant === Variant.ERROR">
                  <FontAwesomeIcon
                    icon="circle-x"
                    class="flex text-white mr-2.5 items-center justify-center h-4 w-4 pt-0.5 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-950"
                  />
                </div>
                <div v-else>
                  <AppSpinner class="mr-3" />
                </div>
                <div v-if="notification.minimizable && hidden && notification.variant === Variant.LOADING" class="flex-shrink-0 ml-0.5 flex">
                  <button
                    type="button"
                    @click="maximize()"
                    class="rounded-lg absolute left-0 bottom-0 inline-flex text-white transition ease-in-out hover:text-gray-500"
                  >
                    <span class="sr-only">Show</span>
                    <FontAwesomeIcon
                      icon="chevron-left"
                      class="flex items-center pt-0.5 justify-center h-4 w-4 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-950"
                    />
                  </button>
                </div>
              </div>
              <div class="w-0 flex-1 pt-0.5">
                <div class="flex space-x-3 items-center">
                  <p class="text-sm font-medium text-white">{{ notification.title }}</p>

                  <slot v-if="$slots.link" name="link" />

                  <NuxtLink v-else-if="notification.link" :to="notification.link.href" target="_blank" class="text-xs text-gray-200">
                    <img :src="solscanLogo" alt="Solscan" class="mr-1 mb-0.5 h-3 w-3 inline-block" />
                    <span class="hyperlink"> {{ notification.link.name }}</span>
                  </NuxtLink>
                </div>

                <div v-if="notification.message" class="mt-1.5 text-xs text-gray-200">
                  <p v-if="typeof notification.message === 'string'">
                    {{ notification.message }}
                  </p>
                  <component v-else :is="notification.message.component" :data="notification.message.data" />
                </div>

                <div v-else>
                  <br />
                </div>

                <component
                  class="mt-3"
                  v-if="notification.transactionFlow && notification.variant !== Variant.ERROR"
                  :is="notification.transactionFlow.component"
                  :data="notification.transactionFlow.data"
                />
              </div>
              <div v-if="notification.minimizable && !hidden && notification.variant === Variant.LOADING" class="flex-shrink-0 flex">
                <button
                  type="button"
                  @click="minimize()"
                  :class="notification.closable ? 'right-8' : 'right-0'"
                  class="rounded-lg absolute top-0.5 inline-flex text-white transition ease-in-out hover:text-gray-500"
                >
                  <span class="sr-only">Hide</span>
                  <FontAwesomeIcon
                    icon="chevron-right"
                    class="flex items-center mt-0.5 justify-center h-4 w-4 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-950"
                  />
                </button>
              </div>
              <div v-if="notification.closable" class="ml-4 flex-shrink-0 flex">
                <button type="button" @click="close()" class="rounded-lg inline-flex text-white transition ease-in-out hover:text-gray-500">
                  <span class="sr-only">Close</span>
                  <font-awesome-icon
                    icon="fa-regular fa-xmark"
                    class="ml-1 flex items-center text-white justify-center h-5 w-5 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-950"
                  />
                </button>
              </div>
            </div>
          </div>
          <div v-if="!notification.indefinite" :style="bar" class="bg-neutral-300 bar h-2 absolute bottom-0"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import gsap from "gsap"

import solscanLogo from "@/assets/logo/solscan.png"
import { Notification, Variant } from "~/types/Notification.types"
import { NotificationManager } from "@/types/NotificationManager.types"

const barWidth = ref(100)
const bar = ref(null)
const hidden = ref(false)
const reference = ref(null)
const NM = NotificationManager.getInstance()

const props = defineProps<{
  notification: Notification
  width: number
}>()

const show = ref(false)

const tl1 = gsap.timeline({})

onMounted(async () => {
  open()

  tl1.from(reference.value, {
    x: 300,
    duration: 0.3,
    ease: "linear",
    opacity: 0,
  })

  tl1.to(reference.value, {
    x: -350,
    ease: "linear",
    opacity: 1,
  })
})

watch(props.notification, () => {
  if (props.notification.close === true) {
    close()
  } else {
    open()
  }
  if (!props.notification.minimizable) {
    maximize()
  }
})

const open = () => {
  show.value = true
  if (!props.notification.indefinite && props.notification.variant != Variant.LOADING) {
    setTimeout(() => {
      const interval = setInterval(() => {
        if (barWidth.value === 0) {
          close()
          barWidth.value = 100
          clearInterval(interval)
        } else {
          animate()
        }
      }, props.notification.duration / 100)
    }, 0)
  }
}

const close = async () => {
  await tl1.to(reference.value, {
    x: 300,
    opacity: 0,
    ease: "linear",
    duration: 0.4,
  })

  show.value = false
  NM.remove(props.notification.id)
}

const maximize = () => {
  hidden.value = false
  tl1.to(reference.value, {
    x: -350,
    ease: "linear",
    duration: 0.4,
  })
}

const minimize = () => {
  hidden.value = true
  tl1.to(reference.value, {
    x: props.width <= 375 ? -35 : props.width <= 390 ? -20 : -40,

    ease: "linear",
    duration: 0.4,
  })
}

const animate = () => {
  barWidth.value--
  bar.value = ` width:${barWidth.value}%;
        }`
}
</script>

<style scoped>
.bar {
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transition: width 0.04s linear;
}
</style>
