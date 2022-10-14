<template>
  <div class="bg-white" ref="client">
    <img class="md:block w-screen sticky -top-1 hidden z-20" src="@/assets/wave.svg" />
    <div class="flex-1 z-[200] px-4 w-full md:hidden justify-end"></div>
    <div>
      <TransitionRoot as="template" :show="sidebarOpen">
        <Dialog as="div" class="relative z-[66] md:hidden" @close="sidebarOpen = false">
          <TransitionChild
            as="template"
            enter="transition-opacity ease-linear duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </TransitionChild>

          <div class="fixed inset-0 flex z-40">
            <TransitionChild
              as="template"
              enter="transition ease-in-out duration-300 transform"
              enter-from="-translate-x-full"
              enter-to="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leave-from="translate-x-0"
              leave-to="-translate-x-full"
            >
              <DialogPanel class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
                <TransitionChild
                  as="template"
                  enter="ease-in-out duration-300"
                  enter-from="opacity-0"
                  enter-to="opacity-100"
                  leave="ease-in-out duration-300"
                  leave-from="opacity-100"
                  leave-to="opacity-0"
                >
                  <div class="absolute right-0">
                    <button type="button" class="ml-1 flex items-center justify-center h-10 w-10 rounded-full" @click="sidebarOpen = false">
                      <span class="sr-only">Close sidebar</span>

                      <font-awesome-icon size="xl" class="text-black pt-2" icon="fa-solid fa-xmark" />
                    </button>
                  </div>
                </TransitionChild>
                <div class="flex-shrink-0 flex items-center px-4">
                  <!--                   <img class="h-8 w-auto" :src="logo" alt="Workflow" /> -->

                  <p
                    class="bg-clip-text align-middle m-0 p-0 hover:brightness-125 text-transparent transition-all duration-500 bg-gradient-to-r font-bold text-4xl from-cyan-500 via-pink-500 to-orange-200"
                  >
                    premoj
                  </p>
                </div>
                <div class="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav class="px-2 space-y-1">
                    <NuxtLink
                      @click.prevent="selectOption(item)"
                      v-for="item in navigation"
                      :key="item.name"
                      :to="item.path"
                      :class="[
                        item.current
                          ? 'bg-gradient-to-r  from-cyan-500 via-pink-500  to-orange-200 text-white  hover:brightness-125 transition-all duration-500'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group navigation flex items-center px-3 py-3 text-base font-medium rounded-lg',
                      ]"
                    >
                      <font-awesome-icon class="mr-2" :icon="item.icon" />
                      {{ $t(item.name) }}
                    </NuxtLink>
                  </nav>
                </div>
              </DialogPanel>
            </TransitionChild>
            <div class="flex-shrink-0 w-14" aria-hidden="true">
              <!-- Dummy element to force sidebar to shrink to fit close icon -->
            </div>
          </div>
        </Dialog>
      </TransitionRoot>

      <!-- Static sidebar for desktop -->
      <div class="hidden z-[200] md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div class="flex flex-col flex-grow my-shadow pt-5 bg-white overflow-y-auto">
          <div class="flex items-center flex-shrink-0 px-4">
            <h2
              class="bg-clip-text p-0 m-0 align-middle hover:brightness-125 text-transparent hover:scale-110 transition-all duration-500 bg-gradient-to-r font-bold text-4xl from-cyan-500 via-pink-500 to-orange-200"
            >
              premoj
            </h2>

            <!--  <img class="h-8 w-auto" :src="logo" alt="Workflow" /> -->
          </div>
          <div class="mt-5 flex-grow flex flex-col">
            <nav class="flex-1 px-2 pb-4 space-y-1">
              <NuxtLink
                :to="item.path"
                class="cursor-pointer"
                @click.prevent="selectOption(item)"
                v-for="item in navigation"
                :key="item.name"
                :class="[
                  item.current
                    ? 'bg-gradient-to-r   from-cyan-500 via-pink-500  to-orange-200 text-white hover:brightness-125 transition-all duration-500'
                    : 'text-gray-600 hover:bg-gradient-to-r hover:brightness-125 transition-all duration-500  from-cyan-500 via-pink-500  to-orange-200 hover:text-gray-900',
                  'group flex navigation items-center px-3 py-3 text-sm font-medium rounded-lg',
                ]"
              >
                <font-awesome-icon class="mr-2" :icon="item.icon" />

                {{ $t(item.name) }}
              </NuxtLink>
            </nav>
          </div>
        </div>
      </div>
      <div class="md:pl-64 flex flex-col flex-1">
        <div class="sticky top-0 flex-shrink-0 flex h-16 z-[20] bg-gradient-to-r md:bg-none justify-between md:bg-transparent my-shadow">
          <img class="w-screen md:hidden absolute z-[100] top-0" src="@/assets/wave.svg" />
          <button type="button" class="px-4 absolute top-3 ml-0 z-[100] border-gray-200 text-gray-500 md:hidden" @click.prevent="sidebarOpen = true">
            <span class="sr-only">Open sidebar</span>
            <font-awesome-icon size="xl" class="text-black z-[100]" icon="fa-solid  fa-bars" />
          </button>

          <!-- Profile dropdown -->
          <Menu as="div" class="ml-3 z-[100] left-4 -top-0.5 absolute md:relative">
            <div class="flex items-center">
              <AppLanguageSelector class="ml-2 z-[100]" />
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem @click.prevent="navigateUser(item)" v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                  <a :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm cursor-pointer text-gray-700']"> {{ $t(item.name) }}</a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>

        <main class="flex-1 p-5">
          <NuxtPage />
        </main>
        <div class="absolute bottom-0 w-full md:w-auto text-center px-4 md:px-0 md:right-6 py-3">
          <p class="text-xs text-gray-400 text-center md:text-left">Created by Přemysl Chovaneček | © All right reserved 2022</p>
        </div>
      </div>
    </div>
    <div v-if="banner" class="fixed bottom-0 left-0 z-50 bg-gray-100 nav print:hidden">
      <div class="z-50 flex justify-between w-screen h-auto p-4 lg:justify-between lg:flex" :class="cookie ? 'items-end' : 'items-center'">
        <div>
          <div class="text-left text-black md:mb-0 intro-font" :class="cookie ? 'lg:mb-2' : 'lg:mb-0'">Respektujeme vaše soukromí.</div>

          <div v-show="!cookie" @click.prevent="cookie = true" class="text-left hyperlink text-sm underline cursor-pointer md:hidden">Více o cookies.</div>
          <span v-show="!cookie" @click.prevent="cookie = true" class="hidden text-left text-sm hyperlink underline cursor-pointer md:block"
            >Více o cookies.</span
          >

          <!-- <p v-if="cookie" class="pb-2 text-sm cookie-more">
            Pro odebrání cookies klikněte
            <button class="cursor-pointer">zde.</button>
          </p> -->
        </div>

        <div class="flex justify-end">
          <AppButton
            @click.prevent="cookieAllow()"
            class="z-50 p-3 py-2 mr-2 text-black transition duration-500 ease-in-out transform shadow-sm outline-none cursor-pointer lobster intro-font hover:brightness-125"
          >
            Souhlasím
          </AppButton>

          <!-- <button
            @click.prevent="cookieDisable()"
            class="z-50 p-3 py-2 text-white transition duration-500 ease-in-out transform bg-gray-700 shadow-sm outline-none cursor-pointer intro-font hover:-translate-y-1 hover:scale-110"
          >
            Nesouhlasím
          </button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from "@/assets/logo.svg"
import { onMounted, ref, reactive, watch } from "vue"
import { Notification, Variant } from "~/types/Notification.types"
import { NotificationManager } from "@/types/NotificationManager.types"
import { useRoute, useRouter } from "#app"

import { Dialog, DialogPanel, Menu, MenuButton, MenuItem, MenuItems, TransitionChild, TransitionRoot } from "@headlessui/vue"

const selectOption = item => {
  navigation.forEach(item => {
    item.current = false
  })
  sidebarOpen.value = false
  item.current = true
}
const navigation = reactive([
  { name: "Home", icon: "igloo", path: "/", current: true },
  { name: "Bali", icon: "fa-earth-oceania", path: "/bali", current: false },
  { name: "India", icon: "fa-earth-asia", path: "/india", current: false },
  { name: "Santiago", icon: "fa-earth-europe", path: "/santiago", current: false },
  { name: "Projects", icon: "fa-laptop-code", path: "/projects", current: false },

  /*  { name: "Projects", icon: ["fa-solid", "fa-xmark"], path: "/projects", current: false }, */
  { name: "About", icon: ["fa-solid", "fa-user"], path: "/about", current: false },
  /*  { name: "Blog", icon: ["fa-solid", "copy"], path: "/blog", current: false }, */
])

const router = useRouter()

const sidebarOpen = ref(false)

const loggedIn = computed(() => {
  return true
})

const navigateUser = item => {
  if (item.name === "Sign out") {
  }

  router.push(item.path)
}

const currentRoute = useRoute()

const banner = ref(true)
const cookie = ref(false)

const client = ref(null)
const NM = NotificationManager.getInstance()

onMounted(() => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      })
    })
  })

  //NM.create({ message: "test", variant: Variant.SUCCESS, title: "Ahoj", closable: true })

  if (localStorage.consentCookies) {
    banner.value = false
  } else {
    localStorage.clear()
  }
})

const cookieAllow = () => {
  localStorage.setItem("consentCookies", "true")
  banner.value = false
}
</script>

<style lang="css">
#app {
  @apply min-h-screen font-sans;
}

.navigation {
  font-family: "Raleway";
  font-weight: 600;
}

body {
  background: white;
}
</style>
